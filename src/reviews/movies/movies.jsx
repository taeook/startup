import React from 'react';
import Sidebar from '../sidebar'; // Import the Sidebar component
import '../reviews.css';

function Movies() {
  return (
    <main className="container">
      <Sidebar /> {/* Use the Sidebar component */}
      <div id="main-content">
        <section id="reviews">
          <h2>Latest Movie Reviews</h2>
          <div id="realtime-reviews">
            <p>Loading the latest moive reviews...</p>
          </div>
        </section>
        <section id="third-party-info" className="mt-4">
          <h2>Additional Information</h2>
          <div id="third-party-placeholder">
            <p>Loading additional information about movies from external sources...</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Movies;