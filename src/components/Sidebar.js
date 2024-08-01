import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><a href="/">Home</a></li>
        <li><a href="/companies">Companies</a></li>
        <li><a href="/sectors">Sectors</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
