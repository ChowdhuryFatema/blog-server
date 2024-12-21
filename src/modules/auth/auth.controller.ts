// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({ name, email, password: hashedPassword });
//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       data: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
//     res.json({ success: true, message: 'Login successful', data: { token } });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
