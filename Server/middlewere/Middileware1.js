import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js'; // Adjust path as needed
import Admin from '../models/Admin.js'; // Adjust path as needed

const secretKey = 'AJR'; // Replace with your actual secret key

// Middleware to authenticate and set user role
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            console.log('Failed to authenticate token:', err);
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        const user = await Employee.findByPk(decoded.id) || await Admin.findByPk(decoded.id);
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        req.userRole = user instanceof Employee ? 'employee' : 'admin';
        next();
    });
};

// Middleware to restrict access to employees only
const employeeOnly = (req, res, next) => {
    if (req.userRole !== 'employee') {
        console.log('Access denied. Employees only.');
        return res.status(403).json({ message: 'Access denied. Employees only.' });
    }
    next();
};

// Middleware to restrict access to admins only
const adminOnly = (req, res, next) => {
    if (req.userRole !== 'admin') {
        console.log('Access denied. Admins only.');
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

export { employeeOnly, adminOnly, authenticate };
