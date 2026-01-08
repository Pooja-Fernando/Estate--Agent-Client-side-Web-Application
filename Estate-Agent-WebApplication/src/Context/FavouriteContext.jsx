import {createContext} from 'react';
import {useCallback} from 'react';
const favouritesContext =createContext(null);
const favouritesProvider=({children})=>{
    const[favourites, setFavourites]=useState[()];
    
    //function to add a property and ensuring no duplicates.
    const addFavourite=useCallBack((property)
        setFavourites(previous=>){
            const isDuplicate=previous.some(fav =>fav.id === property.id);
            if (!isDuplicate){
                return[...previous, property];
            }
            return previous;
        });

    }  , []);
    const 

}