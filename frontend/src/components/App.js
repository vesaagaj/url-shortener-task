import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UrlShortenerForm from './UrlShortenerForm';
import './App.css';  

function App() {
  const [urls, setUrls] = useState([]);

  const handleSubmit = (urlData) => {
    setUrls([...urls, urlData]); 
  };

  const handleDelete = (shortUrl) => {
    setUrls(urls.filter(url => url.shortUrl !== shortUrl)); 
  };

  return (
    <div className="app-container">
      <Sidebar urls={urls} onDelete={handleDelete} />
      <div className="main-content">
        <UrlShortenerForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;
