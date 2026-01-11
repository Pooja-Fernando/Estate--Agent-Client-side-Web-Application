// src/Components/SearchResults.jsx

import React from 'react';
import PropertyCard from './PropertyCard';
import PropTypes from 'prop-types';

const SearchResults = ({ properties }) => {
  
  return (
    <div className="search-results-container">
      <h2>Found {properties.length} Properties</h2>
      
      {properties.length === 0 ? (
        <p className="no-results">No properties matched your search criteria.</p>
      ) : (
        // The results-grid class handles the effective and pleasant display/layout
        <div className="results-grid">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

SearchResults.propTypes = {
  // properties is an array of property objects
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // ... include other necessary property shapes
    })
  ).isRequired,
};

export default SearchResults;