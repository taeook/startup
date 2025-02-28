import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ authState, onLogin, onLogout }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
      setError('');
      navigate('/'); // Redirect to home or another page after login
    } else {
      setError('Please enter both username and password.');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <main>
      <div id="login">
        <h2>{authState ? 'Welcome' : 'Login'}</h2>
        {authState ? (
          <div id="logout">
            <p id="user-display">
              Logged in as: <span id="user-name">{username}</span>
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        )}
        {error && <p className="error">{error}</p>}
        <li className="sign-in-link"><a href="">Create an account</a></li>
      </div>
      <div id="content">
        <h2>Explore Our Features</h2>
        <p>
          Discover reviews, follow your favorite reviewers, and stay updated
          with real-time notifications.
        </p>
        <div id="third-party-placeholder">
          <p>Loading latest movie and game information...</p>
        </div>
      </div>
    </main>
  );
}