import React from 'react';
import './FavouriteList.css'; // Uses styling from the parent

const DeleteFavouriteButton = ({ propertyId, onDelete }) => {
  return (
    <button 
      onClick={(e) => {
        // Stop event propagation to prevent triggering the link to the property page
        e.stopPropagation(); 
        onDelete(propertyId);
      }}
      className="delete-favourite-button"
      title="Remove from favourites"
    >
      &times;
    </button>
  );
};

export default DeleteFavouriteButton;