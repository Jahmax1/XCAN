import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/events', label: 'Events', tooltip: 'View Exclusive Events' },
    { to: '/help', label: 'Help', tooltip: 'Get Support' },
    { to: '/report', label: 'Report', tooltip: 'Report an Issue' },
    { to: '/settings', label: 'Settings', tooltip: 'Configure Preferences' },
  ];

  const handleClick = (e) => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    e.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <nav className="navbar">
      <motion.div
        className="navbar-logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <img src="/logo.png" alt="Logo" width="40" />
      </motion.div>
      <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <motion.div
            key={item.to}
            className="nav-item"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              title={item.tooltip}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;