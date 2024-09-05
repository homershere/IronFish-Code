const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Database connection
mongoose.connect('mongodb://localhost:27017/minerPool', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema for miner messages
const messageSchema = new mongoose.Schema({
    message: String,
    createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to get all messages
app.get('/messages', async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
});

// Route to post a new message
app.post('/messages', async (req, res) => {
    const { message } = req.body;
    const newMessage = new Message({ message });
    await newMessage.save();
    res.json(newMessage);
});

// Serve the frontend
app.use(express.static('public'));

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
