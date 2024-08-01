import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import mockDataCSV from '../data/mockdata.csv'; // Import the CSV file

const SearchResults = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
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
    }, []);

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
                    <li key={item.id}>
                        <Link to={`/company/${item.id}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;