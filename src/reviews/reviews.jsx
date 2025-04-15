import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { Link } from 'react-router-dom';
import CreatePost from './createPost/createPost'; // Adjust the path if needed
import './reviews.css';

export function Reviews({ username, authState }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          // Sort reviews by the 'created' date in descending order
          const sortedData = data.sort((a, b) => new Date(b.created) - new Date(a.created));
          setReviews(sortedData);
        } else {
          setError('Failed to fetch reviews');
        }
      } catch (error) {
        setError('Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

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

  // Helper function for pagination numbers with ellipsis
  function getPageNumbers(currentPage, totalPages, maxPagesToShow = 5) {
    const pages = [];
    if (totalPages <= maxPagesToShow) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const half = Math.floor(maxPagesToShow / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, currentPage + half);

      if (currentPage <= half) {
        end = maxPagesToShow;
        start = 1;
      } else if (currentPage + half >= totalPages) {
        end = totalPages;
        start = totalPages - maxPagesToShow + 1;
      }

      // Always show first page
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Always show last page
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  }

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
        {authState && (
          <Link to="/create-post">
            <button id="Post">Write a Post</button>
          </Link>
        )}
        <section id="reviews">
          <h2>Latest Reviews</h2>
          <div id="realtime-reviews">
            {loading ? (
              <p>Loading latest reviews...</p>
            ) : error ? (
              <p>{error}</p>
            ) : currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <div key={review.id}>
                  <h3>{review.title}</h3>
                  <p>{review.content}</p>
                  <p><strong>Author:</strong> {review.author}</p>
                  <p><strong>Created:</strong> {review.created}</p>
                  <p><strong>Category:</strong> {review.category}</p>
                  <hr className="my-4 border-dark" />
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
            {getPageNumbers(currentPage, totalPages, 3).map((page, idx) =>
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className="ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              )
            )}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}