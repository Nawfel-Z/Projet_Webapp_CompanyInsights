import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Company Insight</div>
      <div><input type="text" placeholder="Search..." className="sidebar-search" /></div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/companies">Companies</Link>
      </div>
    </nav>
  );
};

export default Navbar;