import React, { useState, useEffect } from 'react';
import './about.css';

export function About() {
  const [imageUrl, setImageUrl] = useState('placeholder.jpg');
  const [quote, setQuote] = useState('Loading quote...');

  useEffect(() => {
    // Function to fetch image URL and quote
    const fetchImageAndQuote = async () => {
      try {
        // Placeholder URLs for image and quote APIs
        const imageResponse = await fetch('https://api.example.com/random-image');
        const quoteResponse = await fetch('https://api.example.com/random-quote');

        // Assuming the APIs return JSON with a 'url' and 'quote' field respectively
        const imageData = await imageResponse.json();
        const quoteData = await quoteResponse.json();

        // Update state with fetched data
        setImageUrl(imageData.url);
        setQuote(quoteData.quote);
      } catch (error) {
        console.error('Error fetching image or quote:', error);
      }
    };

    fetchImageAndQuote();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <main id="about">
      <div id="picture" className="picture-box">
        <img width="600px" src={imageUrl} alt="random" />
      </div>
      <div id="realtime-reviews">
        <p>{quote}</p>
        <p>
          ReviewHub is your go-to platform for honest and comprehensive reviews on a wide range of products and entertainment.
        </p>
        <p>
          Whether you're looking for the latest insights on video games, movies, or the best shoes in the market, ReviewHub provides a community-driven space where users can share their experiences and help others make informed decisions.
        </p>
      </div>
    </main>
  );
}