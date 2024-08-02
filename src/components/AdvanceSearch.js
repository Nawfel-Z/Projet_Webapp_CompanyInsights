import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdvancedSearch = () => {
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate()
  const handleSearch = () => {
    navigate(`/company?searchValue=${searchValue}&searchType=${searchType}`);
  };


  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };


  return (
    <div>
      <h2>Advanced Search</h2>
      <select onChange={(e) => setSearchType(e.target.value)}>
        <option value="">Select Search Type</option>
        <option value="companyNumber">By Company Number</option>
        <option value="companyName">By Company Name</option>
        <option value="activity">By Activity</option>
        <option value="address">By Address</option>
      </select>
      <input 
        type="text" 
        value={searchValue} 
        onChange={handleInputChange} 
        placeholder="Enter search value"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default AdvancedSearch;
