import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import '../reviews.css';

function Books({ username, authState }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts/category/Books');
        if (response.ok) {
          const data = await response.json();
          // Sort posts by the 'created' date in descending order
          const sortedData = data.sort((a, b) => new Date(b.created) - new Date(a.created));
          setPosts(sortedData);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

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
          <h2>Latest Book Reviews</h2>
          <div id="realtime-reviews">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <div key={post._id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <p><strong>Author:</strong> {post.author}</p>
                  <p><strong>Created:</strong> {post.created}</p>
                </div>
              ))
            ) : (
              <p>Loading the latest book reviews...</p>
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

export default Books;