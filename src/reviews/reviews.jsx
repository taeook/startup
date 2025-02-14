import React from 'react';
import './reviews.css';

export function Reviews() {
  return (
    <main>
    <section id="categories">
        <h2>Categories</h2>
        <ul>
            <li><a href="electronics.html">Electronics</a></li>
            <li><a href="movies.html">Movies</a></li>
            <li><a href="games.html">Games</a></li>
            <li><a href="restaurants.html">Restaurants</a></li>
            <li><a href="clothes.html">Clothes</a></li>
            <li><a href="books.html">Books</a></li>
        </ul>
    </section>

    <section id="reviews">
        <h2>Latest Reviews(Database Data&Websocket Data)</h2>
        <div id="realtime-reviews">
            <p>Loading latest reviews...</p>
        </div>
    </section>

    <section id="third-party-info">
        <h2>Additional Information</h2>
        <div id="third-party-placeholder">
            <p>Loading additional information from external sources...(Third-party Data)</p>
        </div>
    </section>
</main>
  );
}