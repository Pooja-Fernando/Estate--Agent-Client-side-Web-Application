import React, { useContext } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';

function FavouritesList({ allProperties }) {
    const { favourites, addFavourite, removeFavourite, clearFavourites } = useContext(FavouritesContext);

    // Get the full property details for each favourite ID
    const favouriteProperties = allProperties.filter(p => favourites.includes(p.id));

    // --- Drag-to-Add Logic (Drop Target) ---
    const handleDragOver = (e) => {
        e.preventDefault(); 
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const propertyId = e.dataTransfer.getData("propertyId"); // ID sent from PropertyCard
        if (propertyId) {
            addFavourite(propertyId); // Uses context to add
        }
    };
    
    // --- Drag-out Logic (Drag Source for removal) ---
    const handleDragStart = (e, id) => {
        // Set a special data tag so the SearchPage knows this is an item to be removed
        e.dataTransfer.setData("favIdToRemove", id.toString()); 
    };

    return (
        <div 
            className="favourites-list-container"
            onDragOver={handleDragOver} 
            onDrop={handleDrop} // Drop Target for adding
        >
            <h3>🌟 My Favourites List ({favouriteProperties.length})</h3>
            
            {favouriteProperties.length > 0 && (
                <button onClick={clearFavourites} className="clear-button">Clear All Favourites</button>
            )}

            <div className="favourites-items">
                {favouriteProperties.length === 0 ? (
                    <p className="empty-message">Drag a property card here to save it!</p>
                ) : (
                    favouriteProperties.map(property => (
                        <div 
                            key={property.id} 
                            className="favourite-item"
                            // Enable dragging for removal (Drag Source)
                            draggable="true" 
                            onDragStart={(e) => handleDragStart(e, property.id)}
                        >
                            <Link to={`/property/${property.id}`}>
                                <p>{property.location}</p>
                            </Link>
                            <button onClick={() => removeFavourite(property.id)} className="remove-button">
                                X
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FavouritesList;