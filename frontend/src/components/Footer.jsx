// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} MERN Bug Tracker. All rights reserved.</p>
        <p className="text-sm mt-1">Made with MERN stack</p>
      </div>
    </footer>
  );
};

export default Footer;