import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const userModel = new User();

const SECRET_KEY = "AJR"; // Change this to a secure secret key
const SECRET_CODE = "A1"; // Change this to a secure secret code

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;
        
        // Check if passwords match
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Prepare user data
        const userData = {
            username,
            email,
            password,
            confirm_password,
            role: 'user' // Default role is 'user'
        };

        // Register user
        const result = await userModel.registerUser(userData);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Login user
        const user = await userModel.loginUser(email, password);
        
        // Check if user exists
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Authenticate user
        if (user[0].password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ userId: user[0].id }, SECRET_KEY, { expiresIn: '1h' });

        // Return successful login message along with token
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Admin Registration
router.post('/admin/register', async (req, res) => {
    try {
        const { username, email, password, confirm_password, secretCode } = req.body;
        
        // Check if secret code matches
        if (secretCode !== SECRET_CODE) {
            return res.status(401).json({ message: "Unauthorized: Invalid secret code" });
        }

        // Check if passwords match
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Prepare admin data
        const adminData = {
            username,
            email,
            password,
            confirm_password,
            role: 'admin'
        };

        // Register admin
        const result = await userModel.registerUser(adminData);
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
