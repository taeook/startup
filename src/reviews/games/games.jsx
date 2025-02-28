import React from 'react';
import Sidebar from '../sidebar'; // Import the Sidebar component
import '../reviews.css';

function Games({username}) {
  return (
    <main className="container">
      <Sidebar /> {/* Use the Sidebar component */}
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
          <h2>Latest Game Reviews</h2>
          <div id="realtime-reviews">
            <p>Loading the latest game reviews...</p>
          </div>
        </section>
        <section id="third-party-info" className="mt-4">
          <h2>Additional Information</h2>
          <div id="third-party-placeholder">
            <p>Loading additional information about games from external sources...</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Games;