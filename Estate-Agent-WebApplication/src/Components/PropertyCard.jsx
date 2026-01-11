import React from 'react';
import { Link } from 'react-router-dom';
import FavouriteButton from './FavouriteButton'; 
import { useFavourites } from '../Context/FavouriteContext';
import './PropertyCard.css'; 

const PropertyCard = ({ property }) => {
  
  const { id, title, imageURL, price, shortDescription, bedrooms } = property;
  
  // Access the context to check if the property is a favourite
  const { isFavourite } = useFavourites();
  const isCurrentlyFavourite = isFavourite(id);

  return (
    // Wrap the card content in a Link to the corresponding property page
    // The URL structure assumes React Router: /property/:id
    <Link to={`/property/${id}`} className="property-card"> 
      
      {/* Property Image (7% for Display) */}
      <div className="property-image-wrapper">
        <img 
          src={imageURL} 
          alt={title} 
          className="property-card-image" 
        />
        
        {/* The Favourite Button/Icon (Method 2 for 8% mark) */}
        {/* The FavouriteButton component will handle the click/toggle logic */}
        <div className="favourite-overlay">
          <FavouriteButton property={property} isFavourite={isCurrentlyFavourite} />
        </div>
      </div>
      
      <div className="property-card-info">
        
        {/* Price (Pleasant and effective display - 7% mark) */}
        <p className="property-card-price">£{price.toLocaleString()}</p>
        
        {/* Title/Short Description */}
        <h4 className="property-card-title">{title}</h4>
        <p className="property-card-description">
            {bedrooms} Bed {shortDescription}
        </p> 
        
      </div>
    </Link>
  );
};

export default PropertyCard;