import React from 'react';
import './styles.css';

const Search = ({ searchTerm, onSearchChange }) => {
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter podcasts..."
            className="search-input" 
        />
    );
};

export default Search;
