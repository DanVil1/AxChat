// client/src/components/MessageList.js
import React, { useEffect, useRef } from 'react';

function MessageList({ messages }) {
  const messagesEndRef = useRef(null); // To auto-scroll

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]); // Scroll on new messages

  return (
    <div className="message-list" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px', padding: '5px' }}>
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
      <div ref={messagesEndRef} /> {/* Anchor for scrolling */}
    </div>
  );
}

export default MessageList;