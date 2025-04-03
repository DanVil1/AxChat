// client/src/components/Login.js
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Enter your username:</label>
      <input
        type="text"
        id="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Join Chat</button>
    </form>
  );
}

export default Login;