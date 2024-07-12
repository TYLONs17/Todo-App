import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import User from './models/user';
import Todo from './models/todo';

// Load environment variables from .env file (not working)
// dotenv.config();

// Load environment variables from .env file using the path module
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('Loaded environment variables UserName:', process.env.UserName);
console.log('Loaded environment variables MONGO_URI:', process.env.MONGO_URI);
// Ensure MONGO_URI is defined
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
    console.log('MONGO_URI:', process.env.MONGO_URI);
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error('SECRET_KEY environment variable is not defined');
}

// Route to create an account
app.post('/CreateAccountScreen', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

// Route to log in
app.post('/LoginScreen', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    // Generate a token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Send the token to the client
    res.header('auth-token', token).send('Login successful');
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
