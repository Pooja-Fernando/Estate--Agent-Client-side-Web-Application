import React,{ useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavouritesContext } from '../context/FavouritesContext';

function PropertyCard({ property }) {
    const { addFavourite, isFavourite } = useContext(FavouritesContext);

    // Drag-to-add logic (Drag Source)
    const handleDragStart = (e) => {
        e.dataTransfer.setData("propertyId", property.id.toString());
    };

    return (
        <div 
            className={`property-card ${isFavourite(property.id) ? 'is-favourite' : ''}`}
            draggable="true" 
            onDragStart={handleDragStart} // Drag Source for adding to FavouritesList
        >
            <Link to={`/property/${property.id}`} className="property-link">
                <img src={property.images[0]} alt={property.location} className="card-image"/>
                <div className="card-details">
                    <h3>{property.location}</h3>
                    <p className="card-price">£{property.price.toLocaleString()}</p>
                    <p className="card-short-desc">{property.shortDescription}</p>
                    <p>{property.bedrooms} Bed {property.type}</p>
                </div>
            </Link>

            {/* Favourite Button (Alternative method for adding favourites) */}
            <button 
                className="favourite-button"
                onClick={() => addFavourite(property.id)}
                disabled={isFavourite(property.id)} // Prevents duplicates
            >
                {isFavourite(property.id) ? '❤️ Favourited' : '☆ Add to Favourites'}
            </button>
        </div>
    );
}

export default PropertyCard;