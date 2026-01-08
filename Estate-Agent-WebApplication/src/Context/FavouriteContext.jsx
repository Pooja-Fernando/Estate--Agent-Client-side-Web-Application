import {createContext} from 'react';
import {useCallback} from 'react';
const favouritesContext =createContext(null);
const favouritesProvider=({children})=>{
    const[favourites, setFavourites]=useState[()];
    
    //function to add a property and ensuring no duplicates.
    const addFavourites=useCallBack((property)
        setFavourites(previous=>{
            const isDuplicate=previous.some(fav =>fav.id === property.id);
            if (!isDuplicate){
                return[...previous, property];
            }
            return previous;
        });
        []);
        //function to remove a property by its id 
        const removeFavourites =useCallback((propertyId) => {
            setFavourites =>(previous.filter(fav.id !== propertyId));
        }, []);

        // function to clear the entire list
        const clearFavourites=useCallback(() => {
            setFavourites([]);
        },[]);

        //bundling all satte and function in to a value object
        const contextValue =useMemo(()=>({
            favourites,
            addFavourites,
            removeFavourites,
            clearFavourites,
       

         }),[favourites ,addFavourite, removeFavourite,  clearFavourite ]

        )

    };
    
    const 

