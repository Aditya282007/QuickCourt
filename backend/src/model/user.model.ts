// making user model

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
       img: { type: String, required: true },
       avatarPublicId: { type: String, required: false },
       role: { type: String, required: true, enum: ["Customer", "Owner", "Admin"] },
       fullName: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       otp: { type: String, required: false },
       otpExpires: { type: Date, required: false },
       createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema);

export default User;