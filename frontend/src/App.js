import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import VerificationCard from './components/VerificationCard';
import MediaCarousel from './components/MediaCarousel';
import Events from './components/Events';
import Help from './components/Help';
import Report from './components/Report';
import Settings from './components/Settings';
import Footer from './components/Footer';
import './styles.css';
import './App.css';

function App() {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      try {
        const response = await fetch('http://localhost:5000/api/scan', {
          method: 'POST',
          body: JSON.stringify({ id: data }),
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        setScanResult(result);
        if (result.authentic) {
          speak(`Authentic: ${result.details}`);
        } else {
          speak(`Fake: ${result.details}`);
        }
      } catch (error) {
        setScanResult({ authentic: false, details: 'Scan failed' });
        speak('Scan failed');
      }
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <MediaCarousel />
                <div className="scan-card-container">
                  <VerificationCard result={scanResult} onScan={handleScan} />
                </div>
              </div>
            }
          />
          <Route path="/events" element={<Events />} />
          <Route path="/help" element={<Help />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;