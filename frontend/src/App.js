import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import VerificationCard from './components/VerificationCard';
import AdCarousel from './components/AdCarousel';
import Tickets from './components/Tickets';
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
                <VerificationCard result={scanResult} onScan={handleScan} />
                <AdCarousel />
              </div>
            }
          />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/help" element={<h1>Help (Coming Soon)</h1>} />
          <Route path="/report" element={<h1>Report (Coming Soon)</h1>} />
          <Route path="/settings" element={<h1>Settings (Coming Soon)</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;