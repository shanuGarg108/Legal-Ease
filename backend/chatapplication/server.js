const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const cors = require('cors');




const dotenv = require('dotenv');


const Message = require('./model.js');

dotenv.config();

// Initialize Express and create HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.use(cors());
app.use(express.json());

const chatRoutes = require('./route.js'); // Correct the path to your routes file
app.use('/api/chat', chatRoutes); // This will now correctly use the router

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Real-time communication with Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', async (messageData) => {
        try {
            const newMessage = new Message(messageData);
            await newMessage.save();
            socket.broadcast.emit('receiveMessage', messageData); // Emit to all clients
        } catch (err) {
            console.error('Error saving message:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});



// Server listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
