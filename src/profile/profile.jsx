import React, { useState, useEffect, useRef } from 'react';
import './profile.css';

export function Profile({ username, onLogout }) {
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [notifPage, setNotifPage] = useState(1);
  const [notifTotalPages, setNotifTotalPages] = useState(1);
  const notifPerPage = 5;
  const wsRef = useRef(null);

  // Show/hide notifications state
  const [showNotifications, setShowNotifications] = useState(true);

  // Fetch profile and reviews
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

  // Fetch notifications with pagination
  const fetchNotifications = async (page = 1) => {
    const res = await fetch(`/api/notifications?page=${page}&limit=${notifPerPage}`);
    const data = await res.json();
    setNotifications(data.notifications);
    setNotifTotalPages(data.totalPages);
    setNotifPage(data.page);
  };

  // Fetch notifications when page or profileData changes
  useEffect(() => {
    if (profileData && profileData.name) {
      fetchNotifications(notifPage);
    }
    // eslint-disable-next-line
  }, [notifPage, profileData]);

  // WebSocket connection for notifications, filter out own posts
  useEffect(() => {
    if (!profileData || !profileData.name) return;
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    wsRef.current = new window.WebSocket(`${wsProtocol}://${window.location.host}`);
    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (
        message.type === 'new_post' &&
        message.author !== profileData.name
      ) {
        setNotifications(prev => {
          const updated = [message, ...prev];
          // Only slice if we exceed notifPerPage
          return updated.length > notifPerPage ? updated.slice(0, notifPerPage) : updated;
        });
      }
    };
    wsRef.current.onclose = () => {
      // Optionally handle reconnect logic here
    };
    return () => {
      wsRef.current && wsRef.current.close();
    };
    // profileData is a dep!
  }, [profileData]);

  // Reviews pagination logic
  const reviewsPerPage = 5;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Notifications pagination
  const handleNotifNext = () => {
    if (notifPage < notifTotalPages) setNotifPage(notifPage + 1);
  };
  const handleNotifPrev = () => {
    if (notifPage > 1) setNotifPage(notifPage - 1);
  };

  return (
    <main>
      {/* Show notifications button when hidden */}
      {!showNotifications && (
        <button
          id="show-notifications-btn"
          style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            zIndex: 1100,
            background: '#0047BA',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            fontSize: '1.5em',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onClick={() => setShowNotifications(true)}
          aria-label="Show notifications"
          title="Show notifications"
        >
          🔔
        </button>
      )}

      <div id="left-column">
        {/* Notifications panel */}
        {showNotifications && (
          <section id="notifications">
            <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Real-time Notifications</span>
              <button
                style={{
                  marginLeft: 'auto',
                  marginRight: 0,
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2em',
                  cursor: 'pointer',
                  color: '#0047BA'
                }}
                onClick={() => setShowNotifications(false)}
                aria-label="Hide notifications"
                title="Hide notifications"
              >
                ✖
              </button>
            </h2>
            <div id="realtime-notifications">
              <ul className="notification-list">
                {notifications.map((n, i) => (
                  <li key={n._id || i}>
                    {`New post by ${n.author}: "${n.title}" in ${n.category} at ${n.created}`}
                  </li>
                ))}
              </ul>
              {/* Pagination Controls for notifications */}
              <div className="pagination">
                <button onClick={handleNotifPrev} disabled={notifPage === 1}>Previous</button>
                <span className="pagination-info">Page {notifPage} of {notifTotalPages}</span>
                <button onClick={handleNotifNext} disabled={notifPage === notifTotalPages}>Next</button>
              </div>
            </div>
          </section>
        )}
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
                <div key={review._id}>
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