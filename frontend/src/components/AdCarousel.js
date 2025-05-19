import React, { useState, useEffect } from 'react';

const ads = [
  { id: 1, content: 'Try our new cocktail recipe!', url: '/ad1', image: '/cocktail.jpg' },
  { id: 2, content: 'Visit our distillery!', url: '/ad2', image: '/distillery.jpg' },
  { id: 3, content: 'Join our tasting event!', url: '/ad3', image: '/tasting.jpg' },
];

function AdCarousel({ type }) {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`ad-carousel ${type}`}>
      <a href={ads[currentAd].url} className="ad-link">
        <img src={ads[currentAd].image} alt={ads[currentAd].content} className="ad-image" />
        <p>{ads[currentAd].content}</p>
      </a>
    </div>
  );
}

export default AdCarousel;