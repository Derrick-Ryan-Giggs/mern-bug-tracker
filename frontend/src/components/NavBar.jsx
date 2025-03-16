// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Bug Tracker</Link>
        
        <div className="space-x-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-blue-300" : "hover:text-blue-300"
            }
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/bugs" 
            className={({ isActive }) => 
              isActive ? "text-blue-300" : "hover:text-blue-300"
            }
          >
            Bugs
          </NavLink>
          <NavLink 
            to="/bugs/new" 
            className={({ isActive }) => 
              isActive ? "text-blue-300" : "hover:text-blue-300"
            }
          >
            Report Bug
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;