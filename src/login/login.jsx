import React from 'react';

export function Login() {
  return (
    <main>
      <div id="login">
        <h2>Login</h2>
        <form id="login-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p id="user-display">
          Logged in as: <span id="user-name">Guest</span>
        </p>
        <li className="sign-in-link"><a href="">Sign in</a></li>
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