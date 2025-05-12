import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/tickets">Tickets</Link>
      <Link to="/help">Help</Link>
      <Link to="/report">Report</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
}

export default Navbar;