import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import './reviews.css';

export function Reviews({ username }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <main className="container">
      <Sidebar />
      <div id="main-content">
        <h2>Hi, {username}!</h2>
        {username === 'Guest' && (
          <p className="alert alert-info">
            Create an account to enjoy more features!
          </p>
        )}
        <section id="reviews">
          <h2>Latest Reviews</h2>
          <div id="realtime-reviews">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id}>
                  <h3>{review.title}</h3>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <p>Loading latest reviews...</p>
            )}
          </div>
        </section>
        <section id="third-party-info" className="mt-4">
          <h2>Additional Information</h2>
          <div id="third-party-placeholder">
            <p>Loading additional information from external sources...</p>
          </div>
        </section>
      </div>
    </main>
  );
}