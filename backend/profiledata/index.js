const express = require('express');
const mongoose = require('mongoose');


const dotenv = require('dotenv');
const cors = require('cors');

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();
const ProfileData = require('./model.js');
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

app.post('/api/saveUserData', async (req, res) => {
    try {
      const profileData = new ProfileData(req.body);
      await profileData.save(); // Save data to the database
      res.status(201).send('User data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/api/getUserData', async (req, res) => {
    try {
      const allUsers = await ProfileData.find(); // Fetch all user data
      res.status(200).json({ result: allUsers });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/api/searchUser', async (req, res) => {
    try {
      const { caseCategory, name } = req.query;
      const query = {};
  
      if (caseCategory) {
        query.caseType = caseCategory;
      }
  
      if (name) {
        query.$or = [
          { firstname: { $regex: name, $options: "i" } }, // Case-insensitive regex search
          { lastname: { $regex: name, $options: "i" } }
        ];
      }
  
      const foundUsers = await ProfileData.find(query);
      res.status(200).json(foundUsers);
    } catch (error) {
      console.error('Error searching for user:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

  app.get('/api/getUserProfile/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const userProfile = await ProfileData.findById(id); // Find user by ID
      if (!userProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(userProfile); // Send profile data
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))