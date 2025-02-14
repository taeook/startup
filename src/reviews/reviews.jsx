import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import './reviews.css';

export function Reviews() {
  return (
    <main className="container">
      <nav id="sidebar">
        <h2>Categories</h2>
        <ul>
          <li><Link to="books">Books</Link></li> {/* Use relative path for nested route */}
          <li><Link to="/clothes">Clothes</Link></li>
          <li><Link to="/electronics">Electronics</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/games">Games</Link></li>
          <li><Link to="/restaurants">Restaurants</Link></li>
        </ul>
      </nav>
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
        <Outlet /> {/* Render nested routes here */}
      </div>
    </main>
  );
}