// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Company from './pages/company';
import Navbar from './components/Header';
import AdvancedSearch from './components/AdvanceSearch';

const App = () => {
  return (
    <Router>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Company />} />
        <Route path="/AdvancedSearch" element={<AdvancedSearch />} />
      </Routes>
    </Router>
  );
};

export default App;