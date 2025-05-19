import React, { useState, useEffect } from 'react';

const eduContent = [
  {
    id: 1,
    content: 'Whiskey is aged in oak barrels for at least 3 years.',
    image: '/barrel.jpg',
  },
  {
    id: 2,
    content: 'Gin is infused with botanicals like juniper and coriander.',
    image: '/botanicals.jpg',
  },
  {
    id: 3,
    content: 'Distillation dates back to the 13th century!',
    image: '/still.jpg',
  },
];

function EduCarousel({ type }) {
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % eduContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`edu-carousel ${type}`}>
      <div className="edu-item">
        <img src={eduContent[currentItem].image} alt={eduContent[currentItem].content} className="edu-image" />
        <p>{eduContent[currentItem].content}</p>
      </div>
    </div>
  );
}

export default EduCarousel;