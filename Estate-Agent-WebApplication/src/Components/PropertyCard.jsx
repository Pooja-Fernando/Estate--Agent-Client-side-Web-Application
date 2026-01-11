
import React from 'react';
import 
import { useFavourites } from '../Context/FavouriteContext';
import { Link } from 'react-router-dom'; 

const PropertyCard = ({ property }) => {
  const { addFavourite, removeFavourite, favourites } = useFavourites();
  
  const isFavourite = favourites.some(fav => fav.id === property.id);

  const handleToggleFavourite = (e) => {
    e.stopPropagation(); // Prevent card click from navigating
    if (isFavourite) {
      removeFavourite(property.id); // For the delete button implementation
    } else {
      addFavourite(property); // For the button/icon implementation (8%)
    }
  };

  return (
    <div className="property-card" draggable="true" onDragStart={(e) => {
        // Essential for the drag-and-drop 'add' method (8%)
        e.dataTransfer.setData('text/plain', JSON.stringify(property));
    }}>
      {/* ... Display image, description, price (7%) ... */}
      
      <Link to={`/property/${property.id}`} className="details-link">
        View Details
      </Link>
      
      <button 
        onClick={handleToggleFavourite}
        className={isFavourite ? 'favourite-btn active' : 'favourite-btn'}
      >
        {isFavourite ? '❤️ Favourited' : '☆ Favourite'}
      </button>
      
      
    </div>
  );
};