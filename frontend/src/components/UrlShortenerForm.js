import React, { useState } from 'react';
import './UrlShortenerForm.css';

function UrlShortenerForm({ onSubmit }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add state to store error message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if the URL is provided
    if (!originalUrl) {
      setErrorMessage('Please enter a URL to shorten.'); // Set error message
      return; // Prevent form submission
    }

    // Clear any previous error message
    setErrorMessage('');

    const expirationInSeconds = expirationTime ? parseInt(expirationTime) : null;

    // Send the data to the backend
    fetch('http://localhost:5000/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl, expirationTime:expirationInSeconds }),
    })
      .then((response) => response.json())
      .then((data) => {
        onSubmit(data); // Call onSubmit to add the new shortened URL
        setOriginalUrl(''); // Clear the input fields after submission
        setExpirationTime('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="right-side">
      <form className="url-shortener-form" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'left', width: '100%' }}>URL Shortener</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Paste the URL to be shortened"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <select
            value={expirationTime}
            onChange={(e) => setExpirationTime(e.target.value)}
          >
            <option value="">Select expiration</option>
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="300">5 hours</option>
          </select>
        </div>
        <button type="submit">Shorten URL</button>
        {/* Show error message if URL is not provided */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default UrlShortenerForm;
