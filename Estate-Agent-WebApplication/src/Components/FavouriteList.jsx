import React, { useContext } from 'react';
import {FavouritesContext} from '../Context/FavouriteContext';
import {Link} from 'react-router-dom';
import { FavouritesContext } from '../Context/FavouriteContext';


function FavouritesList({allproperties}){
    // access the state and handles from the favourites context
    const {favourites ,addFavourites, removeFavourites,  clearFavourites}= useContext(FavouritesContext);
    //allows dropping
    const handledragOver=(e)=>{
        e.preventDefault();
    };

  
    const handleDropOver = (e)=>{
        e.preventDefault();
    };
    //Handle the drop
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
    };
     
    //drag and drop to remove
    const handlefavedragstart= (e, propertyId)=>{
        e.dataTransfer.setdata("favIdremove", propertyId);
        e.dataTransfer.effectAllowed="move";//visual indicator
    };
    return (
    <div 
      className="favourites-sidebar"
      onDragOver={handledragOver} // Allows drop
      onDrop={handleDrop} // Handles adding new properties
    >
      <h3>My Favourites ({favourites.length})</h3>
      
      
      {favourites.length > 0 && (
          <button onClick={clearFavourites} className="clear-btn">
              Clear All Favourites
          </button>
      )}

      <div className="favourites-items">
        {favourites.length === 0 ? (
          <p>Drag properties here to add them to your favourites.</p>
        ) : (
          // Display, Linking, and Removal setup
          favourites.map(fav => (
            <div 
              key={fav.id} 
              className="favourite-item"
              draggable="true" // Makes the list item draggable for drag-out removal
              onDragStart={(e) => handlefavedragstart(e, fav.id)} // Sets up removal ID
            >
              <Link to={`/property/${fav.id}`} className="fav-link">
                {fav.bedrooms} bed {fav.type} - £{fav.price.toLocaleString()}
              </Link>
               
             
              <button 
                onClick={() => removeFavourite(fav.id)} 
                className="delete-fav-btn"
                aria-label="Remove from favourites"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavouritesList;

