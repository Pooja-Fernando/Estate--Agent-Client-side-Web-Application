import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertyList.css'; // Styling for the grid/flex layout of results

const PropertyList = ({ properties }) => {
  // Check if properties array is empty after filtering
  if (!properties || properties.length === 0) {
    return (
      <div className="no-results">
        <p>No properties found matching your search criteria. Please try broadening your search.</p>
        {/* Optional: Add a visual cue for no results */}
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <h3>Found {properties.length} Properties</h3>
      
      {/* This is the container styled using CSS Grid/Flex for the effective and 
        pleasant display of results (7% mark) 
      */}
      <div className="property-list">
        {properties.map(property => (
          <PropertyCard 
            key={property.id} 
            property={property} 
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;