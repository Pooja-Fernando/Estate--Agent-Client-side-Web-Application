import {FavouritesContext} from '../Context/FavouriteContext';

@param{object[]}lproperties

function FavouritesList({allproperties}){
    // access the state and handles from the favourites context
    const {favourites ,addFavourites, removeFavourites,  clearFavourites}= useContext(FavouritesContext);
    //allows dropping
    const handledragOver=(e)=>{
        e.preventDefault();
    };

    //Handle the drop.
    const handleDropOver = (e)=>{
        e.preventDefault();
    };
    
    const handleDrop=(e) => {
        e.preventDefault();
        //get the property id that was saved when dragging started
        const propertyIdString = e.dataTransfer.getData("propertyId");
        if (propertyIdString){
            const propertyId = Number(propertyIdString);



            const propertyToAdd= allproperties.find(p=>p.id===propertyId);
            
            if (propertyToAdd){
                addFavourites(propertyToAdd);//add to favs
            }
        }
    }

}
