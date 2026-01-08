import React , from 'react';
import PropertyCard from './PropertyCard'; // Import the card created


function SearchResults({ properties }) {
    
    // Check if the properties array is empty
    if (!properties || properties.length === 0) {
        return (
            <div className="search-results-empty">
                <p>No properties match your search criteria. Please adjust your filters.</p>
            </div>
        );
    }

    return (
        <div className="search-results-list">
            <h2>Search Results ({properties.length} properties found)</h2>
            
            <div className="property-grid">
                {/* Map over the properties array and render a PropertyCard for each */}
                {properties.map(property => (
                    <PropertyCard 
                        key={property.id} 
                        property={property} 
                    />
                ))}
            </div>
        </div>
    );
}

export default SearchResults;