const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const cors = require('cors');

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

// Routes

// Sign-in Route
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    res.json({ name: user.name });
  } catch (error) {
    console.error('Server Error: ', error.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// Sign-up Route
app.post(
  '/api/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      user = new User({
        name,
        email,
        passwordHash,
      });

      await user.save();

      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Fetch Users Except Current
app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const users = await User.find({ name: { $ne: username } });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Fetch Current User
app.get('/api/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    

    res.json(user);
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ message: 'Error fetching current user' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = User