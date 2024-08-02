import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand" >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Company Insight</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/companies">Companies</Link>
        <Link to="/company">Details</Link>
      </div>
    </nav>
  );
};

export default Navbar;