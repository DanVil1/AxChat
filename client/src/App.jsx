// client/src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ChatWindow from './components/ChatWindow';
import io from 'socket.io-client';
import './App.css'; // Add some basic styling

// Connect to backend (adjust URL if needed)
// IMPORTANT: Initialize socket here but manage connection state later
const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]); // Holds message objects { user: 'name', text: 'message' }

  // Effect for handling incoming messages (Phase 4)
  useEffect(() => {
    // Listener for new messages from server
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up listener on component unmount
    return () => {
      socket.off('newMessage');
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleLogin = (name) => {
    if (name.trim()) {
      setUsername(name.trim());
      setIsLoggedIn(true);
      // Optionally: Emit a 'join' event here for bonus feature
      // socket.emit('userJoined', name.trim());
    }
  };

  // Function to handle sending a message (local state update for MVP)
  // This will be updated in Phase 4 to use Socket.io
  const handleSendMessage = (text) => {
     if (text.trim() && username) {
        const newMessage = { user: username, text: text.trim() };
        // --- MVP: Update local state directly ---
        // setMessages((prevMessages) => [...prevMessages, newMessage]);
        // --- Phase 4: Emit message via Socket.IO ---
         socket.emit('sendMessage', newMessage);
     }
  };

  return (
    <div className="App">
      <h1>Simple Chat App</h1>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ChatWindow
          username={username}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default App;