import React from 'react';
import './reviews.css';

export function Reviews() {
  return (
    <main className="container">
      <nav id="sidebar">
        <h2>Categories</h2>
        <ul>
          <li><a href="/books">Books</a></li>
          <li><a href="/clothes">Clothes</a></li>
          <li><a href="/electronics">Electronics</a></li>
          <li><a href="/movies">Movies</a></li>
          <li><a href="/games">Games</a></li>
          <li><a href="/restaurants">Restaurants</a></li>
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
      </div>
    </main>
  );
}