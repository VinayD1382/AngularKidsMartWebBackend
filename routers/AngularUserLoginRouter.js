import express from "express";
import AngularUserModel from "../model/AngularUserModel.js"; 

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await AngularUserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new AngularUserModel({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "✅ User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await AngularUserModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "✅ Login successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to login" });
  }
});

export default router;
