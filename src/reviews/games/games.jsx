import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../reviews.css';

function Games({ username, authState }) { // Ensure authState is a prop
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts/category/Games');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
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
        {authState && ( // Conditionally render the button
          <Link to="/create-post">
            <button id="Post">Write a Post</button>
          </Link>
        )}
        <section id="reviews">
          <h2>Latest Games Reviews</h2>
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
              <p>Loading the latest Games reviews...</p>
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
        <section id="third-party-info" className="mt-4">
          <h2>Additional Information</h2>
          <div id="third-party-placeholder">
            <p>Loading additional information about Games from external sources...</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Games;