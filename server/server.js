// server/server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from your React frontend

const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Or your React app's port (often 3000 or 5173 for Vite)
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001; // Use port 3001 for the backend

// Basic route (optional, for testing)
app.get('/', (req, res) => {
  res.send('Chat Server is running');
});

// Socket.IO connection logic (will be expanded)
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Placeholder for message handling
  socket.on('sendMessage', (messageData) => {
    // For now, just log it. Later, broadcast it.
    console.log('Message received:', messageData);
    // Broadcast to all clients (including sender) - Add this in Phase 4
    io.emit('newMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
});