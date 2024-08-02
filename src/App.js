import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Company from './pages/company';
import CompanyDetail from './components/CompanyDetail';
import Navbar from './components/Header';
import AdvancedSearch from './components/AdvanceSearch';
// import SearchResults from './pages/SearchResults'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Company />} />
        <Route path="/company" element={<CompanyDetail />} />
        <Route path="/AdvancedSearch" element={<AdvancedSearch />} />

      </Routes>
    </Router>
  );
};

export default App;