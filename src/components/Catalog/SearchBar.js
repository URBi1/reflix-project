import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    return (
        <input
            type="text"
            placeholder="Search for movies..."
            onChange={onSearchChange}
            value={searchQuery}
        />
    );
};

export default SearchBar;