

import React from 'react';
import { Link } from 'react-router-dom';
import { useFavourites } from '../Context/FavouriteContext';
import PropTypes from 'prop-types';
import '/.Propertycard.css';
const PropertyCard = ({ property }) => {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  
  // Check if the property is currently favourited
  const isFav = isFavourite(property.id);

  const handleToggleFavourite = (e) => {
    e.stopPropagation(); // Prevent card click from navigating
    e.preventDefault(); // Prevent default link behaviour
    
    if (isFav) {
      removeFavourite(property.id); // For the delete button implementation
    } else {
      addFavourite(property); // For the button/icon implementation
    }
  };

  const handleDragStart = (e) => {
    // Essential for the drag-and-drop add method (8% requirement)
    e.dataTransfer.setData("text/plain", property.id);
    e.dataTransfer.effectAllowed = "copy";
    // Also, optionally add the whole JSON string if the target needs more data
    e.dataTransfer.setData("application/json", JSON.stringify(property));
  };

  return (
    <div className="property-card" draggable="true" onDragStart={handleDragStart}>
      {/* Each property listed should have a link to visit the corresponding property page. */}
      <Link to={`/property/${property.id}`} className="card-link">
        
        <img src={property.imageURL} alt={`Image of ${property.type}`} className="property-image" />
        
        <div className="card-body">
          <h4 className="property-price">{property.price}</h4>
          <p className="property-description">{property.shortDescription}</p>
          <p className="property-location">{property.postcodeArea}</p>
        </div>
      </Link>
      
      {/* Favourite Button/Icon implementation (8% requirement) */}
      <button 
        className={`favourite-toggle ${isFav ? 'favourited' : ''}`}
        onClick={handleToggleFavourite}
        title={isFav ? "Remove from favourites" : "Add to favourites"}
      >
        {isFav ? '❤️' : '🤍'}
      </button>

    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    shortDescription: PropTypes.string,
    postcodeArea: PropTypes.string,
    // Add other required properties here
  }).isRequired,
};

export default PropertyCard;