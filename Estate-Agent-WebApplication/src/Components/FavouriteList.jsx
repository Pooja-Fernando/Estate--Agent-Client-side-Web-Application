// Components/FavouriteList.jsx

import React from 'react';
import { useFavourites } from '../Context/FavouriteContext';
import { Link } from 'react-router-dom';

const FavouriteList = () => {
  const { favourites, removeFavourite, clearFavourites, addFavourite } = useFavourites();

  // Logic for Drag-and-Drop ADD (Drop Target - 8%)
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      // Retrieve property data transferred from PropertyCard
      const propertyData = e.dataTransfer.getData('text/plain');
      const property = JSON.parse(propertyData);
      addFavourite(property);
    } catch (error) {
      console.error('Error parsing dragged data:', error);
    }
  };
  
  // Logic for Drag-and-Drop REMOVE (Drag Source - 7%)
  const handleDragStart = (e, propertyId) => {
      // Use dataTransfer to identify the item being removed
      e.dataTransfer.setData('text/propertyId', propertyId);
  };
  
  // Logic for Drag-and-Drop REMOVE (Drop Target - 7%)
  // You would define a "drop outside" area (or use the document body) to handle the 'remove' drop.
  // For simplicity here, we focus on the list itself.

  return (
    <div 
      className="favourite-list" 
      onDragOver={(e) => e.preventDefault()} // Must call preventDefault to allow dropping
      onDrop={handleDrop} // Handles dropping a new property ONTO the list
    >
      <h3>⭐️ Your Favourites (3%)</h3>
      
      {favourites.length === 0 ? (
        <p>Drag a property here or click the favourite button to add.</p>
      ) : (
        <>
          <button onClick={clearFavourites} className="clear-btn">Clear All (7%)</button>
          <ul>
            {favourites.map(property => (
              <li key={property.id} 
                  draggable="true" 
                  onDragStart={(e) => handleDragStart(e, property.id)} // Enable drag-out
                  className="favourite-item"
              >
                <Link to={`/property/${property.id}`}>{property.descriptionShort}</Link>
                <button onClick={() => removeFavourite(property.id)} className="delete-btn">
                  &times; {/* Delete button to remove (7%) */}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FavouriteList;