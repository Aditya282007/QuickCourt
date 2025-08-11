// making user model

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
       img: { type: String, required: true },
       role: { type: String, required: true, enum: ["Customer", "Owner", "Admin"] },
       fullName: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema);

export default User;