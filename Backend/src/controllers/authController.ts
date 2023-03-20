// import { Request, Response } from 'express';

// import * as tokenService from '../services/tokenService';
// import { sendForgotPasswordEmail } from '../utils/email';

// export const register = async (req: Request, res: Response) => {
//   // Implementation for user registration
//   const { email, password } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await user.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const newUser = await user.create({ email, password: hashedPassword });

//     // Return success response
//     return res.status(200).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   // Implementation for user login
 

// };

// export const forgotPassword = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;

//     // Validate email address
//     if (!email) {
//       return res.status(400).json({ error: 'Email address is required' });
//     }

//     // Generate token and store in database
//     const token = await tokenService.createToken(email);
//     await sendForgotPasswordEmail(email, token);

//     // Return success response
//     return res.status(200).json({ message: 'Password reset email sent' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };
