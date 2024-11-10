// Import necessary modules
const express = require('express');     
const shortid = require('shortid');     
const cors = require('cors');           
const bodyParser = require('body-parser'); 

// Initialize an Express application
const app = express();

// Middleware configuration
app.use(cors());                        
app.use(bodyParser.json());             

// In-memory storage for shortened URLs
const urls = {}; // This object will store the mapping of short IDs to original URLs

// Endpoint to create a shortened URL
app.post('/api/shorten', (req, res) => {
  const { originalUrl, expirationTime } = req.body;  
  console.log('Received URL:', originalUrl);         

  const shortUrlId = shortid.generate(originalUrl);  // Generate a unique ID for the shortened URL
  const expirationTimestamp = expirationTime ? Date.now() + expirationTime * 1000 : null; // Calculate in milliseconds
  
  // Store URL, expiration timestamp, and the original URL in memory
  urls[shortUrlId] = { 
    originalUrl, 
    expirationTimestamp
  };

  const shortUrl = `http://localhost:5000/${shortUrlId}`; 
  res.json({ shortUrl });                               
});

// Endpoint to redirect to the original URL based on the short URL ID
app.get('/:shortUrlId', (req, res) => {
  const { shortUrlId } = req.params;                   
  console.log('Redirecting:', shortUrlId);             

  const entry = urls[shortUrlId];                      
  
  if (entry) {
    // Check if the URL has expired
    if (entry.expirationTimestamp && Date.now() > entry.expirationTimestamp) {
      delete urls[shortUrlId];  
      return res.status(410).json({ error: 'URL has expired' }); 
    }
    
    res.redirect(entry.originalUrl);                   
  } else {
    res.status(404).json({ error: 'URL not found' });  
  }
});


const PORT = process.env.PORT || 5000;                 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
