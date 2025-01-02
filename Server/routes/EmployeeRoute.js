import express from 'express';
import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Admin from '../models/Admin.js';

const router = express.Router();

// Temporary in-memory store for OTPs
const otpStore = {};

/* router.post('/create', async (req, res) => {
  const { employee_id, employee_name, email, mobile_no, role } = req.body;
  const password = crypto.randomBytes(8).toString('hex');  // Generates a random password

  try {
    // Create a new employee
    const employee = await Employee.create({
      employee_id,
      employee_name,
      email,
      mobile_no,
      role,
      password: bcrypt.hashSync(password, 10),  // Hash the password before storing it
    });

    // Create a test account and transporter for development purposes
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    let mailOptions = {
      from: '"Company Name" <no-reply@company.com>',  // Change to your company name and no-reply email
      to: email,
      subject: 'Your Default Password',
      text: `Your employee ID is: ${employee_id}\nYour default password is: ${password}`,
    };

    // Send the email with the password
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.json({
      message: 'Employee created successfully',
      employee,
      previewUrl: nodemailer.getTestMessageUrl(info),  // Only for testing with Ethereal
    });

  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(400).json({ error: error.message });
  }
}); */

// Create Employee
router.post('/create', async (req, res) => {
  const { employee_id, employee_name, email, mobile_no, role } = req.body;
  const password = crypto.randomBytes(8).toString('hex');

  try {
    const employee = await Employee.create({
      employee_id,
      employee_name,
      email,
      mobile_no,
      role,
      password: bcrypt.hashSync(password, 10),
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      //host: 'smtp.gmail.com',
      //port: 587,
      //secure: false,
      auth: {
        user: 'ajayarama9@gmail.com',
        pass: 'xrsf gxsn qgpu ayyp'
      }
    });

    const mailOptions = {
      from: 'ajayarama9@gmail.com', // Sender address
      to: email, // Recipient's email address
      subject: 'Your default password', // Email subject
      text: `Your default password is: ${password}` // Email body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ error: 'Failed to send email' });
      }
      console.log('Email sent:', info.response);
      res.json({ message: 'Employee created successfully', employee });
    });

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.error('Validation errors:', error.errors.map(e => e.message));
    } else {
      console.error('Error creating employee:', error);
    }
    res.status(400).json({ error: error.message });
  }
});

// GET all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});


/* // Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const employee = await Employee.findOne({ where: { email } });
    if (employee) {
      employee.password = bcrypt.hashSync(newPassword, 10);
      await employee.save();
      res.json({ message: 'Password reset successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */
// Send OTP
/* router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    otpStore[email] = otp; // Store OTP temporarily

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ajayarama9@gmail.com', // Replace with your email
        pass: 'xrsf gxsn qgpu ayyp', // Replace with your app password
      },
    });

    const mailOptions = {
      from: 'ajayarama9@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent successfully' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Admin.findOne({ where: { email } }) || await Employee.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    otpStore[email] = otp; // Store OTP temporarily

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ajayarama9@gmail.com', // Replace with your email
        pass: 'xrsf gxsn qgpu ayyp', // Replace with your app password
      },
    });

    const mailOptions = {
      from: 'ajayarama9@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent successfully' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
 // Verify OTP
/* router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP after verification
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
}); 

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.password = bcrypt.hashSync(newPassword, 10);
    await employee.save();
    res.json({ message: 'Password reset successfully' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP after verification
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await Admin.findOne({ where: { email } }) || await Employee.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();
    res.json({ message: 'Password reset successfully' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
 
/* // Login Employee
router.post('/login', async (req, res) => {
  const { employee_id, password } = req.body;
  try {
    const employee = await Employee.findOne({ where: { employee_id } });
    if (employee && bcrypt.compareSync(password, employee.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */

export default router;
