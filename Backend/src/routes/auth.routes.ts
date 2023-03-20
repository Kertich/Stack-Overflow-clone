import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../index';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with given email exists
    const result = await pool
      .request()
      .input('email', email)
      .execute('sp_getUserByEmail');

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);

    // Send token and user data
    res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
  });

  // Get logged-in user
router.get('/me', async (req, res) => {
    const { userId } = req as any;
  
    try {
      // Get user data by ID
      const result = await pool
        .request()
        .input('id', userId)
        .execute('sp_getUserById');
  
      if (result.recordset.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Send user data
      const user = result.recordset[0];
      res.status(200).json({ user: { id: user.id, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

export default router;
