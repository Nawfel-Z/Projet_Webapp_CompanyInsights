import React, { useState } from 'react';

const AdvancedSearch = () => {
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    // Implement search logic here
    console.log(`Searching for ${searchValue} by ${searchType}`);
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
        onChange={(e) => setSearchValue(e.target.value)} 
        placeholder="Enter search value"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default AdvancedSearch;
