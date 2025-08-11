import express = require("express");
import type { Request, Response } from "express";
import * as dotenv from "dotenv";
import { connectMongo } from "./lib/db";
import { configureCloudinary } from "./lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { upload } from "./lib/multer";
import User from "./model/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sendOtpToUser } from "./lib/otp";

dotenv.config();

// Configure Cloudinary once at startup
const cloudinary = configureCloudinary(
  process.env.CLOUDINARY_CLOUD_NAME || "",
  process.env.CLOUDINARY_API_KEY || "",
  process.env.CLOUDINARY_API_SECRET || ""
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Odoo Hackathon Backend!");
});

// Signup with Multer handling form-data (field name: 'avatar')
app.post("/api/signup", upload.single("avatar"), async (req: Request, res: Response) => {
    const { role, fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .json({ error: "Profile image (avatar) is required" });
    }

    // Check email uniqueness
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    let imgUrl: string | null = null;
    let avatarPublicId: string | undefined;

    try {
      // Upload buffer to Cloudinary using upload_stream
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "odoo-hackathon",
              resource_type: "image",
            },
            (error: any, result: UploadApiResponse) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(req.file!.buffer);
        }
      );

      if (!uploadResult.secure_url) {
        return res.status(500).json({ error: "Image upload failed" });
      }

      imgUrl = uploadResult.secure_url;
      avatarPublicId = uploadResult.public_id;
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Image upload failed", details: error });
    }

    // MongoDB user creation logic and check if the user already exists or not
    try {
      const user = await User.findById(req.body.id);
      if (!user) {
        const newUser = new User({
          img: imgUrl,
          avatarPublicId,
          role,
          fullName,
          email,
          password: passwordHash,
          createdAt: new Date(),
        });
        await newUser.save();
      } else {
        return res.status(409).json({ error: "User already exists" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "User registration failed", details: error });
    }

    res.status(201).json({ message: "User registered successfully" });
  }
);

// Update profile image route
app.put("/api/users/:id/avatar", upload.single("avatar"), async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .json({ error: "Profile image (avatar) is required" });
    }

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Delete previous image if exists
      if ((user as any).avatarPublicId) {
        try {
          await cloudinary.uploader.destroy((user as any).avatarPublicId);
        } catch (e) {
          // Log and continue; don't fail the whole request for a missing old asset
          console.warn("Failed to delete old Cloudinary image:", e);
        }
      }

      // Upload new image
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "odoo-hackathon",
              resource_type: "image",
            },
            (error: any, result: UploadApiResponse) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(req.file!.buffer);
        }
      );

      if (!uploadResult.secure_url) {
        return res.status(500).json({ error: "Image upload failed" });
      }

      (user as any).img = uploadResult.secure_url;
      (user as any).avatarPublicId = uploadResult.public_id;
      await user.save();

      return res.status(200).json({
        message: "Profile image updated",
        img: (user as any).img,
        avatarPublicId: (user as any).avatarPublicId,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to update profile image", details: error });
    }
  }
);

// Update profile details
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { fullName, email, role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.fullName = fullName;
    user.email = email;
    user.role = role;
    await user.save();

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update profile", details: error });
  }
});

// Login logic
app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password, User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password, Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "10d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Login failed", details: error });
  }
});

// Send OTP to user and expire after 5 min
app.post("/api/send-otp", async (req: Request, res: Response) => {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    await sendOtpToUser(email);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send OTP", details: error });
  }
});

const port = process.env.PORT || 3000;

// Connect DB then listen
(async () => {
  const mongoUri = process.env.MONGODB_URI || "";
  if (mongoUri) {
    try {
      await connectMongo(mongoUri);
    } catch (e) {
      console.error("Mongo connection failed:", e);
    }
  }
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();