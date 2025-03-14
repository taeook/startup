import React, { useState, useEffect } from 'react';
import './profile.css';

export function Profile({ username, onLogout }) {
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchUserReviews = async () => {
      try {
        const response = await fetch('/api/user-reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch user reviews');
        }
      } catch (error) {
        console.error('Error fetching user reviews:', error);
      }
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
            <p>Waiting for new notifications...</p>
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
              <p>Loading user profile data...</p>
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
              <p>Loading your reviews...</p>
            )}
          </div>
        </section>
        <button id='logout_profile' onClick={onLogout}>Logout</button>
      </div>
    </main>
  );
}