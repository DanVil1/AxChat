// client/src/components/ChatWindow.js
import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatWindow({ username, messages, onSendMessage }) {
  return (
    <div className="chat-window">
      <h2>Welcome, {username}!</h2>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatWindow;