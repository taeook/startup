import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.msg);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignIn = () => {
    navigate('/');
  };

  return (
    <main id="signup">
      <h2>Create an Account</h2>
      {success ? (
        <div className="success-message">
          <p>Signed up successfully! Try logging in.</p>
          <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
        </div>
      ) : (
        <form id="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Create your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Create your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
      {error && <p className="error">{error}</p>}
    </main>
  );
}