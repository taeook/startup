import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Reviews } from './reviews/reviews';
import { Profile } from './profile/profile';
import { About } from './about/about';

//Categories
import Books from './reviews/books/books';
import Clothes from './reviews/clothes/clothes';
import Electronics from './reviews/electronics/electronics';
import Games from './reviews/games/games';
import Movies from './reviews/movies/movies';
import Restaurants from './reviews/restaurants/restaurants';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body text-light">
        <header className="container-fluid fixed-top" style={{ backgroundColor: '#002E5D' }}>
          <nav className="navbar navbar-expand-lg navbar-dark justify-content-center">
            <div className="container-fluid">
              <a className="navbar-brand mx-auto" href="#">ReviewHub<sup>&reg;</sup></a>
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
                  <li className="nav-item">
                    <NavLink className='nav-link' to='profile'>Profile</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className='nav-link' to='About'>About</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div style={{ paddingTop: '80px' }}> {/* Adjust padding to match navbar height */}
        <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/profile' element={<Profile />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/reviews/books' element={<Books />} />
        <Route path='/reviews/clothes' element={<Clothes />} /> 
        <Route path='/reviews/electronics' element={<Electronics />} /> 
        <Route path='/reviews/games' element={<Games />} /> 
        <Route path='/reviews/movies' element={<Movies />} />
        <Route path='/reviews/restaurants' element={<Restaurants />} /> 
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
        </Routes>
        </div>
        <footer className="text-white-50 text-center py-3" style={{ backgroundColor: '#002E5D' }}>
          <div className="container-fluid">
            <span className="text-reset">Taeook Kim</span>
            <a className="text-reset ms-3" href="https://github.com/webprogramming260/simon-react">GitHub</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}