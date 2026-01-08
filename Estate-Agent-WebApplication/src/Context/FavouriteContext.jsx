import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavouritesContext } from '../context/FavouritesContext';

function PropertyCard({ property }) {
    const { addFavourite, isFavourite } = useContext(FavouritesContext);

    const handleDragStart = (e) => {
        // Set the property ID to be transferred during the drag operation
        e.dataTransfer.setData("propertyId", property.id.toString());
    };

    return (
        <div 
            className={`property-card ${isFavourite(property.id) ? 'is-favourite' : ''}`}
            // Enable dragging for the property card (Drag Source)
            draggable="true" 
            onDragStart={handleDragStart} 
        >
            <Link to={`/property/${property.id}`} className="property-link">
                {/* Short description, price, and picture are required [cite: 37] */}
                <img src={property.images[0]} alt={property.location} className="card-image"/>
                <div className="card-details">
                    <h3>{property.location}</h3>
                    <p className="card-price">£{property.price.toLocaleString()}</p>
                    <p className="card-short-desc">{property.shortDescription}</p>
                    <p>{property.bedrooms} Bed {property.type}</p>
                </div>
            </Link>

            {/* Favourite Button (Alternative method for adding favourites)  */}
            <button 
                className="favourite-button"
                onClick={() => addFavourite(property.id)}
                disabled={isFavourite(property.id)} // Prevent duplicates [cite: 47]
            >
                {isFavourite(property.id) ? '❤️ Favourited' : '☆ Add to Favourites'}
            </button>
        </div>
    );
}

export default PropertyCard;