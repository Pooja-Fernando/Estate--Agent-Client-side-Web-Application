// Context/FavouriteContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const FavouriteContext = createContext();

// Hook to easily consume the context
export const useFavourites = () => useContext(FavouriteContext);

// 2. Context Provider Component
export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Function to Add Property (must prevent duplicates - 8%)
  const addFavourite = (property) => {
    // Check if property is already in the list using its ID
    const isDuplicate = favourites.some(fav => fav.id === property.id);
    
    if (isDuplicate) {
      console.log('Property already in favourites.');
      // You could add a toast notification here for better UX
      return; 
    }

    setFavourites(prevFavourites => [...prevFavourites, property]);
    console.log(`Added property ID ${property.id} to favourites.`);
  };

  // Function to Remove Property (by ID - 7%)
  const removeFavourite = (propertyId) => {
    setFavourites(prevFavourites => 
      prevFavourites.filter(fav => fav.id !== propertyId)
    );
    console.log(`Removed property ID ${propertyId} from favourites.`);
  };

  // Function to Clear All Favourites (7%)
  const clearFavourites = () => {
    setFavourites([]);
    console.log('Cleared all favourites.');
  };

  const contextValue = {
    favourites,
    addFavourite,
    removeFavourite,
    clearFavourites,
  };

  return (
    <FavouriteContext.Provider value={contextValue}>
      {children}
    </FavouriteContext.Provider>
  );
};

// 3. You need to wrap your <App /> component with <FavouriteProvider> in main.jsx/App.jsx