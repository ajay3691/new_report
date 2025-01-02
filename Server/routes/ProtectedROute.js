import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example protected route
router.get('/admin-only', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

router.get('/employee-only', authenticate, authorize('employee'), (req, res) => {
  res.json({ message: 'Welcome, employee!' });
});

export default router;
