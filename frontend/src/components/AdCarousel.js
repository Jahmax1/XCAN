import React, { useState, useEffect } from 'react';

const ads = [
  { id: 1, content: 'Try our new cocktail recipe!', url: '/ad1' },
  { id: 2, content: 'Visit our distillery!', url: '/ad2' },
  { id: 3, content: 'Join our tasting event!', url: '/ad3' },
];

function AdCarousel() {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ad-carousel">
      <a href={ads[currentAd].url}>{ads[currentAd].content}</a>
    </div>
  );
}

export default AdCarousel;