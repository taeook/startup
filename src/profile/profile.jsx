import React, { useState, useEffect } from 'react';
import './profile.css';

export function Profile({ username, onLogout }) {
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulate fetching profile data
    const fetchProfileData = () => {
      // Simulated data
      const data = {
        name: username,
        email: `${username}@byu.edu`,
        joined: 'January 2023',
      };
      setProfileData(data);
    };

    // Simulate fetching user reviews
    const fetchUserReviews = () => {
      // Simulated reviews
      const userReviews = [
        { id: 1, title: 'Great Product!', content: 'I really enjoyed using this product.' },
        { id: 2, title: 'Not bad', content: 'It was okay, could be better.' },
      ];
      setReviews(userReviews);
    };

    fetchProfileData();
    fetchUserReviews();
  }, [username]);

  return (
    <main>
      <div id="left-column">
        <section id="notifications">
          <h2>Real-time Notifications</h2>
          <div id="realtime-notifications">
            <p>Waiting for new notifications...(Websocket Data)</p>
          </div>
        </section>
      </div>
      <div id="right-column">
        <section id="profile-info">
          <h2>Profile Information</h2>
          <div id="database-profile">
            {profileData ? (
              <div>
                <p>Name: {profileData.name}</p>
                <p>Email: {profileData.email}</p>
                <p>Joined: {profileData.joined}</p>
              </div>
            ) : (
              <p>Loading user profile data...(Database Data)</p>
            )}
          </div>
        </section>
        <section id="user-reviews">
          <h2>Your Reviews</h2>
          <div id="database-user-reviews">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id}>
                  <h3>{review.title}</h3>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <p>Loading your reviews...(Database Data)</p>
            )}
          </div>
        </section>
        <button id='logout_profile' onClick={onLogout}>Logout</button>
      </div>
    </main>
  );
}