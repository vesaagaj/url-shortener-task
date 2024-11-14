import React from 'react';

function Sidebar({ urls, onDelete }) {
  return (
    <div className="sidebar">
      <div className="logo-container"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <img
          src={`${process.env.PUBLIC_URL}/AnchorzUp Logo_No Tagline (1).svg`}
          alt="AnchorzUp Logo"
          className="logo"
        />
      </div>
      <h2 style={{textAlign:'center',width:'100%'}}>My Shortened URLs</h2>
      <ul>
        {urls.map((url) => (
          <li key={url.shortUrl}>
            <a href={url.shortUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className='shortened-link' 
            style={{ color: '#0000ff', textDecoration: 'underline' }}>
              {url.shortUrl}
            </a>
            <button onClick={() => onDelete(url.shortUrl)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
