// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Bug Tracker</h1>
        <p className="text-xl mb-8">Track and manage bugs efficiently</p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            to="/bugs" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            View All Bugs
          </Link>
          <Link 
            to="/bugs/new" 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Report New Bug
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;