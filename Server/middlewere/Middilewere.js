// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const SECRET_KEY = "AJR"; // Change this to your actual secret key

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

const authenticateAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.admin = decoded;
        const admin = await Admin.findById(decoded.adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export { authenticateUser, authenticateAdmin };
