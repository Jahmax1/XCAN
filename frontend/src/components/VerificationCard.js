import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

function VerificationCard({ result, onScan }) {
  const [points, setPoints] = useState(0);
  const webcamRef = useRef(null);

  useEffect(() => {
    if (result?.authentic) {
      setPoints((prev) => {
        const newPoints = prev + 10;
        localStorage.setItem('points', newPoints);
        return newPoints;
      });
    }
  }, [result]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              onScan(code.data);
            }
          };
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onScan]);

  return (
    <div className="verification-card">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <div className={result ? (result.authentic ? 'authentic' : 'fake') : ''}>
        {result ? (
          <>
            <h3>{result.authentic ? 'Authentic' : 'Fake'}</h3>
            <img src="/logo.png" alt="XCAN Logo" width="100" />
            <p>{result.details}</p>
            {result.fact && <p>Fun Fact: {result.fact}</p>}
            <button
              onClick={() =>
                navigator.share({ text: `Verified with XCAN: ${result.details}` })
              }
            >
              Share
            </button>
            w
            <p>Points: {points}</p>
          </>
        ) : (
          <p>Scan a bottle to verify</p>
        )}
      </div>
    </div>
  );
}

export default VerificationCard;