import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Reviews } from './reviews/reviews';
import { Profile } from './profile/profile';
import { About } from './about/about';
import Books from './reviews/books/books';
import Clothes from './reviews/clothes/clothes';
import Electronics from './reviews/electronics/electronics';
import Games from './reviews/games/games';
import Movies from './reviews/movies/movies';
import Restaurants from './reviews/restaurants/restaurants';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  const [authState, setAuthState] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setAuthState(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setAuthState(true);
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setAuthState(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  const handleSignup = (username) => {
    setAuthState(true);
    setUsername(username);
    localStorage.setItem('username', username);
  };

  return (
    <BrowserRouter>
      <div className="body text-light">
        <header className="container-fluid fixed-top" style={{ backgroundColor: '#002E5D' }}>
          <nav className="navbar navbar-expand-lg navbar-dark justify-content-center">
            <div className="container-fluid">
              <a className="navbar-brand mx-auto" href="">ReviewHub<sup>&reg;</sup></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item">
                    <NavLink className='nav-link' to=''>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className='nav-link' to='reviews'>Reviews</NavLink>
                  </li>
                  {authState && (
                    <li className="nav-item">
                      <NavLink className='nav-link' to='profile'>Profile</NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <NavLink className='nav-link' to='About'>About</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path='/' element={<Login authState={authState} onLogin={handleLogin} onLogout={handleLogout} />} exact />
            <Route path='/signup' element={<Signup onSignup={handleSignup} />} />
            <Route path='/profile' element={authState ? <Profile username={username} onLogout={handleLogout} /> : <Login authState={authState} onLogin={handleLogin} onLogout={handleLogout} />} />
            <Route path='/reviews' element={<Reviews username={authState ? username : 'Guest'} />} />
            <Route path='/reviews/books' element={<Books username={authState ? username : 'Guest'} />} />
            <Route path='/reviews/clothes' element={<Clothes username={authState ? username : 'Guest'} />} />
            <Route path='/reviews/electronics' element={<Electronics username={authState ? username : 'Guest'} />} />
            <Route path='/reviews/games' element={<Games username={authState ? username : 'Guest'} />} />
            <Route path='/reviews/movies' element={<Movies username={authState ? username : 'Guest'} />} />
            <Route path='/reviews/restaurants' element={<Restaurants username={authState ? username : 'Guest'} />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <footer className="text-white-50 text-center py-3" style={{ backgroundColor: '#002E5D' }}>
          <div className="container-fluid">
            <span className="text-reset">Taeook Kim</span>
            <a className="text-reset ms-3" href="https://github.com/taeook/startup">GitHub</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}