import React, { createContext, useState, useEffect } from 'react';

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('estateClientFavourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    useEffect(() => {
        localStorage.setItem('estateClientFavourites', JSON.stringify(favourites));
    }, [favourites]);

    const addFavourite = (propertyId) => {
        const id = Number(propertyId); 
        setFavourites(prevFavourites => {
            // Prevention of duplicate additions (required for distinction)
            if (!prevFavourites.includes(id)) { 
                return [...prevFavourites, id];
            }
            return prevFavourites;
        });
    };

    const removeFavourite = (propertyId) => {
        const id = Number(propertyId);
        setFavourites(prevFavourites => 
            prevFavourites.filter(favId => favId !== id)
        );
    };

    const clearFavourites = () => {
        setFavourites([]); // Required for coursework
    };

    const contextValue = {
        favourites,
        addFavourite,
        removeFavourite,
        clearFavourites,
        isFavourite: (id) => favourites.includes(Number(id)),
    };

    return (
        <FavouritesContext.Provider value={contextValue}>
            {children}
        </FavouritesContext.Provider>
    );
}