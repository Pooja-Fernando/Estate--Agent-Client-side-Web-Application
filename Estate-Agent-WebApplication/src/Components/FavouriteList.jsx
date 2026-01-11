// src/Components/FavouriteList.jsx
import React from 'react';
import { useFavourites } from '../Context/FavouriteContext';
import PropTypes from 'prop-types';

const FavouriteList = () => {
  const { favourites, removeFavourite, clearFavourites } = useFavourites();

  const handleDragOver = (e) => {
    e.preventDefault(); // Essential to allow a drop
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // Assuming the PropertyCard component sets the property ID on dragStart
    const propertyId = e.dataTransfer.getData("text/plain"); 
    
    // Check if the drop target is the list itself (for remove by dragging out)
    // Here we'll just handle adding to the list (handled in SearchPage or PropertyCard)
    // The main use here is to handle "dragging OUT" and dropping elsewhere, 
    // but the simplest implementation is often using the delete button on the item.
  };

  const handleClear = () => {
    clearFavourites();
  };

  return (
    <div 
      className="favourite-list" 
      onDragOver={handleDragOver} 
      onDrop={handleDrop}
    >
      <h3>💖 Favourites List ({favourites.length})</h3>
      
      {favourites.length > 0 && (
        <button onClick={handleClear} className="clear-button">Clear All</button>
      )}

      {favourites.length === 0 ? (
        <p>Drag properties here or click the favourite icon to add!</p>
      ) : (
        <ul className="favourite-items">
          {favourites.map(property => (
            <li key={property.id} className="favourite-item">
              <span className="fav-title">{property.type} @ {property.price}</span>
              <button 
                onClick={() => removeFavourite(property.id)} 
                className="delete-button"
                title="Remove from favourites"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouriteList;