import express = require('express');
import type { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { connectMongo } from './lib/db';
import { configureCloudinary } from './lib/cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import { upload } from './lib/multer';
import User from './model/user.model';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Odoo Hackathon Backend!');
});

// Signup 
app.post('/api/signup', async (req: Request, res: Response) => {
  const { img, fullName, email , password, confirmPassword} = req.body;

  if (!img || !fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // MongoDB user creation logic
  try {
    const newUser = new User({
      img,
      role: "Customer",
      fullName,
      email,
      password,
      createdAt: new Date()
    })
  } catch {

  }

  res.status(201).json({ message: 'User registered successfully' });
});



// Upload endpoint: expects form-data with field "image"
app.post('/api/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const cloudinary = configureCloudinary(
      process.env.CLOUDINARY_CLOUD_NAME || '',
      process.env.CLOUDINARY_API_KEY || '',
      process.env.CLOUDINARY_API_SECRET || ''
    );

    const result = await new Promise<UploadApiResponse> ((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'uploads' }, (error: Error, uploaded: UploadApiResponse) => {
        if (error || !uploaded) return reject(error || new Error('Upload failed'));
        return resolve(uploaded);
      });
      stream.end(req.file!.buffer);
    });

    return res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

const port = process.env.PORT || 3000;

// Connect DB then listen
(async () => {
  const mongoUri = process.env.MONGODB_URI || '';
  if (mongoUri) {
    try {
      await connectMongo(mongoUri);
    } catch (e) {
      console.error('Mongo connection failed:', e);
    }
  }
  app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
  });
})();
