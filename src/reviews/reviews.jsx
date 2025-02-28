import React from 'react';
import Sidebar from './sidebar'; // Import the Sidebar component
import './reviews.css';

export function Reviews({ username }) {
  return (
    <main className="container">
      <Sidebar />
      <div id="main-content">
        <h2>
          Hi, {username}!
        </h2>
        {username === 'Guest' && (
          <p className="alert alert-info">
            Create an account to enjoy more features!
          </p>
        )}
        <section id="reviews">
          <h2>Latest Reviews (Database Data & Websocket Data)</h2>
          <div id="realtime-reviews">
            <p>Loading latest reviews...</p>
          </div>
        </section>
        <section id="third-party-info" className="mt-4">
          <h2>Additional Information</h2>
          <div id="third-party-placeholder">
            <p>Loading additional information from external sources...(Third-party Data)</p>
          </div>
        </section>
      </div>
    </main>
  );
}