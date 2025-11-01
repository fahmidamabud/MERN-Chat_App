import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';

/**
 * Sign up a new user
 */
export const signup = async (req, res) => {

  const { fullName, email, password, bio } = req.body;

  try {
     console.log("===== SIGNUP REQUEST RECEIVED =====");
    console.log("Body received from frontend:", req.body);
    // Validate fields
    if (!fullName || !email || !password || !bio) {
      console.log("❌ Missing one or more required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already exists:", email);
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio
    });

    // Generate token
    const token = generateToken(newUser._id);
    console.log("✅ New user created:", newUser._id);
    res.status(201).json({userData: newUser, token, message: "User created successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Login a user
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(userData._id);

    res.json({ success: true, userData, token, message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

/**
 * Check if user is authenticated
 */
export const checkAuth = async (req, res) => {
  res.json({ success: true, user: req.user });
};

/**
 * Update user profile
 */
export const updateUser = async (req, res) => {
  try {
    const { fullName, bio, profilePic } = req.body;
    const userId = req.user._id;

    let updatedFields = { fullName, bio };

    // If profile picture is provided, upload to Cloudinary
    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedFields.profilePic = upload.secure_url;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
