const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// ✅ SIGN UP Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "✅ Signup successful!" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ SIGN IN Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "✅ Login successful!", token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
