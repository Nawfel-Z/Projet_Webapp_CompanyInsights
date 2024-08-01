import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import mockDataCSV from '../data/mockdata.csv'; // Import the CSV file

function SearchResults() {
    const location = useLocation();
    const { data: locationData } = location.state || { data: [] };

    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState(locationData);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (locationData.length === 0) {
            // Parse the CSV file
            Papa.parse(mockDataCSV, {
                download: true,
                header: true,
                complete: (result) => {
                    setData(result.data);
                },
                error: (err) => {
                    setError(err.message);
                },
            });
        }
    }, [locationData]);

    const filteredData = data.filter(item => 
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.director && item.director.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <h1>Search Results</h1>
            {error && <p>Error: {error}</p>}
            <input 
                type="text" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                placeholder="Search..." 
            />
            <ul>
                {filteredData.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;