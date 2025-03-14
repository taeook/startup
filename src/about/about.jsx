import React, { useState, useEffect } from 'react';
import './about.css';

export function About() {
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/600/400');
  const [quote, setQuote] = useState('Loading quote...');
  const [quoteAuthor, setQuoteAuthor] = useState('');

  useEffect(() => {
    // Function to fetch quote
    const fetchQuote = async () => {
      try {
        // Fetch quote from the provided API
        const quoteResponse = await fetch('https://quote.cs260.click');
        const quoteData = await quoteResponse.json();
        
        // Update state with fetched quote data
        setQuote(quoteData.quote);
        setQuoteAuthor(quoteData.author);

        // Set random image URL using picsum.photos
        setImageUrl('https://picsum.photos/1000/500');

      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <main id="about">
      <div id="picture" className="picture-box">
        <img width="600px" src={imageUrl} alt="random" />
      </div>
      <div id="realtime-reviews">
        <p>{quote}</p>
        <p><em>- {quoteAuthor}</em></p>
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