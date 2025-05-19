import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { motion, AnimatePresence } from 'framer-motion';

function VerificationCard({ result, onScan }) {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const startScanning = () => {
    setScanning(true);
    setScanComplete(false);
  };

  useEffect(() => {
    let interval;
    if (scanning) {
      interval = setInterval(() => {
        if (webcamRef.current && canvasRef.current) {
          const video = webcamRef.current.video;
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'dontInvert',
            });
            if (code) {
              onScan(code.data);
              setScanning(false);
              setScanComplete(true);
              setTimeout(() => setScanComplete(false), 1000);
              if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
              }
            }
          }
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [scanning, onScan]);

  return (
    <div className="verification-card">
      <AnimatePresence>
        {scanning ? (
          <motion.div
            className="scan-hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'environment' }}
              className="webcam"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="scan-overlay">
              <div className="particle-container">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="particle"
                    style={{ background: `hsl(${i * 45}, 70%, 50%)` }}
                    animate={{
                      rotate: 360,
                      x: Math.cos((i * Math.PI) / 4) * 50,
                      y: Math.sin((i * Math.PI) / 4) * 50,
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <p>Scanning...</p>
            </div>
          </motion.div>
        ) : result ? (
          <motion.div
            className={result.authentic ? 'authentic' : 'fake'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {scanComplete && (
              <motion.div
                className="checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {result.authentic ? (
                  <img src="/checkmark.png" alt="Checkmark" width="50" />
                ) : (
                  <span className="cross">✖</span>
                )}
              </motion.div>
            )}
            <h3>{result.authentic ? 'Verified' : 'Invalid'}</h3>
            <p>{result.details}</p>
            <p className="fact">{result.fact}</p>
            {result.authentic && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const points = parseInt(localStorage.getItem('points') || '0') + 10;
                  localStorage.setItem('points', points);
                  if (navigator.share) {
                    navigator.share({
                      title: 'Verification Result',
                      text: `Verified: ${result.details}`,
                      url: window.location.href,
                    });
                  }
                }}
              >
                Share & Claim Points
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="scan-prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={startScanning}
          >
            <img src="/logo.png" alt="Logo" width="50" />
            <p>Tap to Scan</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VerificationCard;