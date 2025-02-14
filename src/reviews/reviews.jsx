import React from 'react';
import Sidebar from './sidebar'; // Import the Sidebar component
import './reviews.css';

export function Reviews() {
  return (
    <main className="container">
      <Sidebar />
      <div id="main-content">
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