import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    { to: '/terms', label: 'Terms', external: false },
    { to: '/privacy', label: 'Privacy', external: false },
    { to: 'mailto:support@xcan.com', label: 'Contact', external: true },
    { to: '/about', label: 'About', external: false },
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
    <footer className="footer">
      <div className="footer-content">
        <motion.div
          className="footer-branding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/logo.png" alt="Xcan Logo" width="30" />
          <span>Xcan</span>
        </motion.div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <motion.div
              key={link.to}
              className="footer-link-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              {link.external ? (
                <a
                  href={link.to}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link to={link.to} className="footer-link">
                  {link.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
        <div className="footer-copyright">
          <p>© 2025 Xcan, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;