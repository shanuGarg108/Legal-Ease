const express = require('express');
const router = express.Router();
const Message = require('./model');
const User = require('./server')

// Get all messages between two users
router.get('/api/messages/:userID/:otherUserID', async (req, res) => {
    const { userID, otherUserID } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: userID, receiver: otherUserID },
                { sender: otherUserID, receiver: userID }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Save a new message
router.post('/messages', async (req, res) => {
    const { sender, receiver, message } = req.body;

    if (!sender || !receiver || !message) {
        return res.status(400).json({ error: 'Sender, receiver, and message are required.' });
    }

    try {
        const newMessage = new Message({ 
            sender,
            receiver,
            message,
            timestamp: new Date()
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: 'Error saving message' });
    }
});

// Get all users the current user has chatted with
router.get('/api/chatUsers/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
        // Step 1: Find all messages where the user is either the sender or receiver
        const messages = await Message.find({
            $or: [
                { sender: userID },
                { receiver: userID }
            ]
        });

        // Step 2: Extract unique user IDs from messages
        const userIDs = messages.reduce((acc, message) => {
            if (message.sender !== userID) acc.add(message.sender);
            if (message.receiver !== userID) acc.add(message.receiver);
            return acc;
        }, new Set());

        // Convert Set to Array
        const userIDsArray = Array.from(userIDs);

        // Step 3: Find users by IDs
        const users = await User.find({ _id: { $in: userIDsArray } });

        // Step 4: Return the list of users
        res.json(users);
    } catch (err) {
        console.error('Error fetching chat users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
