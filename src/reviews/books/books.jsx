import React from 'react';
import { Link } from 'react-router-dom';
import '../reviews.css'; // Import the CSS file from the reviews directory

function Books() {
  return (
    <main className="container">
      <nav id="sidebar">
        <h2>Categories</h2>
        <ul>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/clothes">Clothes</Link></li>
          <li><Link to="/electronics">Electronics</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/games">Games</Link></li>
          <li><Link to="/restaurants">Restaurants</Link></li>
        </ul>
      </nav>
      <div id="main-content">
        <section id="reviews">
          <h2>Latest Book Reviews</h2>
          <div id="realtime-reviews">
            <p>Loading the latest book reviews...</p>
            {/* Here you can add logic to fetch and display the latest book reviews */}
          </div>
        </section>
        <section id="third-party-info" className="mt-4">
          <h2>Additional Information</h2>
          <div id="third-party-placeholder">
            <p>Loading additional information about books from external sources...</p>
            {/* Add any additional information or third-party data related to books */}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Books;