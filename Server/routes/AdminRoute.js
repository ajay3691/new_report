import express from 'express';
import Employee from '../models/Employee.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();
const secretKey = 'AJR'; // Use environment variables in production
const correctSecretCode = "JAI"; // The correct secret code

// Register Admin
/* router.post('/register', async (req, res) => {
  const { username, password, secretCode } = req.body;

  // Check if the provided secret code is correct
  if (secretCode !== correctSecretCode) {
    return res.status(401).json({ message: 'Invalid secret code' });
  }

  try {
    const admin = await Admin.create({
      username,
      password: bcrypt.hashSync(password, 10),
      secretCode,
    });
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */

router.post('/register', async (req, res) => {
  const { email, password, secretCode } = req.body;

if (!email || !password || !secretCode) {
  return res.status(400).json({ message: 'Email, password, and secret code are required' });
}

if (secretCode !== correctSecretCode) {
  return res.status(401).json({ message: 'Invalid secret code' });
}

try {
  const admin = await Admin.create({
    email,
    password: bcrypt.hashSync(password, 10),
    secretCode,
  });
  res.status(201).json({ message: 'Admin registered successfully', admin });
} catch (error) {
  res.status(400).json({ error: error.message });
}

});
/* // Login Admin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { username } });
    if (admin && bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ id: admin.id }, secretKey, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */
// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Determine if the username is an email or employee_id
    let user = null;
    if (username.includes('@')) { // Assuming it's an email
      user = await Admin.findOne({ where: { email: username } });
    } else { // Otherwise, treat it as employee_id
      user = await Employee.findOne({ where: { employee_id: username } });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate token
      const token = jwt.sign({ id: user.id, role: user.email ? 'admin' : 'employee' }, secretKey, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' }); // Use 500 for server errors
  }
});

export default router;
