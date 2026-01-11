import React from 'react';
import { useFavourites } from '../Context/FavouriteContext';
import DeleteFavouriteButton from './DeleteFavouriteButton'; // Component for item deletion
import './FavouriteList.css';

// Unique identifier used for drag-and-drop data transfer
const PROPERTY_DRAG_TYPE = 'property/listing';

const FavouriteList = () => {
  const { favourites, addFavourite, removeFavourite, clearFavourites } = useFavourites();

  // --- Drag-and-Drop Handlers (Add to Favourites 8%) ---
  
  // Prevents the default action (which is to not allow a drop)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /**
   * Handles dropping a property from the search results into the favourites area.
   * This implements the "Dragging the property to a favourites list on the side" requirement.
   */
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      // Retrieve the property data passed during drag start from PropertyCard
      const data = e.dataTransfer.getData(PROPERTY_DRAG_TYPE);
      if (data) {
        const property = JSON.parse(data);
        // addFavourite includes the duplicate prevention logic
        addFavourite(property);
      }
    } catch (error) {
      console.error("Error processing dropped property data:", error);
    }
  };
  
  // --- Component Rendering ---
  
  return (
    <div 
      className="favourites-list-container"
      onDrop={handleDrop} // Drop zone for adding properties
      onDragOver={handleDragOver} // Must be present to allow dropping
    >
      
      {/* List Header and Clear All Button (Remove/Clear Favourites 7%) */}
      <div className="favourites-header">
        <h4>{favourites.length} Saved Properties</h4>
        {favourites.length > 0 && (
          <button 
            onClick={clearFavourites} 
            className="clear-favourites-button"
            title="Clear the entire favourite list"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Property List Display (Display Favourites 3%) */}
      {favourites.length === 0 ? (
        <p className="empty-message">Drag properties here from the results to save them!</p>
      ) : (
        <ul className="favourites-list">
          {favourites.map(property => (
            <li key={property.id} className="favourite-item">
              <div className="favourite-item-info">
                {/* Link to the individual property page */}
                <span className="favourite-item-link">{property.title}</span>
                <span className="favourite-item-price">£{property.price.toLocaleString()}</span>
              </div>
              
              {/* Delete Button (Method 2 for Remove/Clear 7%) */}
              <DeleteFavouriteButton 
                propertyId={property.id} 
                onDelete={removeFavourite} 
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouriteList;