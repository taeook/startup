import React from 'react';
import { Link } from 'react-router-dom';
import './reviews.css'; // Ensure this file contains the necessary styles

function Sidebar() {
  return (
    <nav id="sidebar">
      <h2>Categories</h2>
      <ul>
        <li><Link to="/reviews/books">Books</Link></li>
        <li><Link to="/reviews/clothes">Clothes</Link></li>
        <li><Link to="/reviews/electronics">Electronics</Link></li>
        <li><Link to="/reviews/movies">Movies</Link></li>
        <li><Link to="/reviews/games">Games</Link></li>
        <li><Link to="/reviews/restaurants">Restaurants</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;