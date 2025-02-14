import React from 'react';
import './about.css';

export function About() {
  return (
    <main id="about">
      <div id="picture" className="picture-box">
        <img width="600px" src="placeholder.jpg" alt="random" />
      </div>
      <div id="realtime-reviews">
        <p>
          ReviewHub is your go-to platform for honest and comprehensive reviews on a wide range of products and entertainment.
        </p>
        <p>
          Whether you're looking for the latest insights on video games, movies, or the best shoes in the market, ReviewHub provides a community-driven space where users can share their experiences and help others make informed decisions.
        </p>
      </div>
    </main>
  );
}