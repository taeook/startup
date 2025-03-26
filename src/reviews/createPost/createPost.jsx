import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createPost.css';

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/posts/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, category }),
        });
        if (response.ok) {
          alert('Post created successfully');
          setTitle('');
          setContent('');
          setCategory('');
          navigate('/reviews'); // Redirect to the reviews page
        } else {
          alert('Failed to create post');
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    };
  
    return (
      <form className="create-post-container" onSubmit={handleSubmit}>
        <h2>Create a Post</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <div className="categories">
          <h2>Select Category</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Books">Books</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Games">Games</option>
            <option value="Movies">Movies</option>
            <option value="Restaurants">Restaurants</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  export default CreatePostPage;