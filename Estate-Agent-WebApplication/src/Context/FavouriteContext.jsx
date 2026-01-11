
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
const FavouriteContext = createContext();

// Custom hook to use the favourites context
export const useFavourites = () => useContext(FavouriteContext);

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Check if a property is already in the list to prevent duplicates (8% requirement)
  const isFavourite = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId);
  };

  const addFavourite = (property) => {
    if (!isFavourite(property.id)) {
      setFavourites(prev => [...prev, property]);
    }
  };

  const removeFavourite = (propertyId) => {
    setFavourites(prev => prev.filter(fav => fav.id !== propertyId));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const value = {
    favourites,
    isFavourite,
    addFavourite,
    removeFavourite,
    clearFavourites,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};

FavouriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// You need to wrap your App.jsx or main component with <FavouriteProvider> in main.jsx or App.jsx