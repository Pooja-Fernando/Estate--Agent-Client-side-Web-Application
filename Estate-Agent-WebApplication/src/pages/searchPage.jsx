import React,{useState} from'react';
import  SearchForm from '../components/SearchForm';
import All_Properties from '.data/properties.json';
import FavouritesList from '../Components/FavouriteList';
import { FavouritesContext } from '../Context/FavouriteContext';
export function SearchPage({properties}){
    const [searchCriteria, setSearchCriteria]=useState({});
    const filteredProperties = properties.filter(property => {
  // Check type
    if (searchCriteria.type && searchCriteria.type !== "any" && property.type !== searchCriteria.type) {
         return false;
     }

  // Check price
    if (searchCriteria.minPrice && property.price < searchCriteria.minPrice) {
        return false;
     }
     if (searchCriteria.maxPrice && property.price > searchCriteria.maxPrice) {
        return false;
     }

  // Check bedrooms
     if (searchCriteria.minBedrooms && property.bedrooms < searchCriteria.minBedrooms) {
        return false;
    }
     if (searchCriteria.maxBedrooms && property.bedrooms > searchCriteria.maxBedrooms) {
        return false;
    }

    
    return true;
}[searchCriteria]);
const handleDragOver = (e) => {
        e.preventDefault(); 
    };

    // This handles an item being dropped onto the Search Page background.
    const handleRemoveDrop = (e) => {
        e.preventDefault();
        
        // Check for the special ID set by FavouritesList.jsx (the drag source)
        const favIdToRemoveString = e.dataTransfer.getData("favIdToRemove");

        if (favIdToRemoveString) {
            const favIdToRemove = Number(favIdToRemoveString);
            
            // Call the Context function to remove the item
            removeFavourite(favIdToRemove); 
        }
    };

    // --- 3. RENDER THE STRUCTURE ---
    
    return (
        // The main page wrapper div acts as the drop zone for the drag-out removal
        <div 
            className="search-page-container"
            onDragOver={handleDragOver} 
            onDrop={handleRemoveDrop} // This is where the favourite item is removed
        >
            <main className="search-layout">
                <section className="search-form-section">
                    {/* SearchForm sends the new filters back via the onSearch prop */}
                    <SearchForm onSearch={setSearchCriteria} />
                </section>

                <section className="results-and-favourites">
                    <div className="search-results-section">
                        {/* Pass the filtered list to SearchResults */}
                        <SearchResults properties={filteredProperties} />
                    </div>

                    <aside className="favourites-sidebar-section">
                        {/* Pass ALL properties to FavouritesList for the add/lookup on drop */}
                        <FavouritesList allProperties={ALL_PROPERTIES} />
                    </aside>
                </section>
               </main>
            </div>
          );
      }
      export default SearchPage;


