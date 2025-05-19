import React, { useState, useEffect } from 'react';

const mediaContent = [
  {
    id: 1,
    type: 'ad',
    content: 'Try our new cocktail recipe!',
    url: '/ad1',
    image: '/cocktail.jpg',
  },
  {
    id: 2,
    type: 'edu',
    content: 'Whiskey is aged in oak barrels for at least 3 years.',
    image: '/barrel.jpg',
  },
  {
    id: 3,
    type: 'ad',
    content: 'Visit our distillery!',
    url: '/ad2',
    image: '/distillery.jpg',
  },
  {
    id: 4,
    type: 'edu',
    content: 'Gin is infused with botanicals like juniper and coriander.',
    image: '/botanicals.jpg',
  },
  {
    id: 5,
    type: 'ad',
    content: 'Join our tasting event!',
    url: '/ad3',
    image: '/tasting.jpg',
  },
  {
    id: 6,
    type: 'edu',
    content: 'Distillation dates back to the 13th century!',
    image: '/still.jpg',
  },
];

function MediaCarousel() {
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % mediaContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const item = mediaContent[currentItem];

  return (
    <div className="media-carousel">
      <div className="media-content">
        {item.type === 'ad' ? (
          <a href={item.url} className="media-link">
            <img src={item.image} alt={item.content} className="media-image" />
            <div className="media-overlay">
              <p>{item.content}</p>
            </div>
          </a>
        ) : (
          <div className="media-item">
            <img src={item.image} alt={item.content} className="media-image" />
            <div className="media-overlay">
              <p>{item.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaCarousel;