import express, { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// sign up type
type SignupBody = {
  username: string;
  email: string;
  password: string;
};

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) { 
        res.status(400).json({ message: 'User already exists' }); 
        return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({ 
        username, 
        email, 
        password: hashedPassword 
    });

     res.status(201).json({ message: 'User created', user: { username, email } });
     return;
  } catch (err) {
     res.status(500).json({ message: 'Signup failed', error: err });
     return;
  }
});

// Login
type LoginBody = {
  email: string;
  password: string;
};

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) { 
        res.status(401).json({ message: 'Invalid credentials' }); 
        return; 
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ 
        message: 'Login successful', 
        token,
        user: { username: user.username, email } 
    });
    return;
  } catch (error) {
    res.status(500).json({ 
        message: 'Login failed', error 
    });
    return;
  }
});

export default router;
