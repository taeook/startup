import React, { useState, useEffect } from 'react';
import './profile.css';

export function Profile({ username, onLogout }) {
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

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
      } finally {
        setLoadingProfile(false);
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
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchProfileData();
    fetchUserReviews();
  }, [username]);

  // Calculate the reviews to display on the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
            {loadingProfile ? (
              <p>Loading user profile data...</p>
            ) : profileData ? (
              <div>
                <p>Name: {profileData.name}</p>
                <p>Email: {profileData.email}</p>
                <p>Joined: {profileData.joined}</p>
              </div>
            ) : (
              <p>Profile data not available.</p>
            )}
          </div>
        </section>
        <section id="user-reviews">
          <h2>Your Reviews</h2>
          <div id="database-user-reviews">
            {loadingReviews ? (
              <p>Loading your reviews...</p>
            ) : currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <div key={review.id}>
                  <h3>{review.title}</h3>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </section>
        <button id='logout_profile' onClick={onLogout}>Logout</button>
      </div>
    </main>
  );
}