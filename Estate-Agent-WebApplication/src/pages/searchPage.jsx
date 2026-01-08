import { useState, useContext, useMemo } from 'react'; // 1. Added useMemo for filtering optimization
import SearchForm from '../Components/SearchForm';
import SearchResults from '../Components/SearchResults'; // 2. IMPORTED missing SearchResults component
import ALL_PROPERTIES from './data/properties.json'; // 3. Corrected import variable to match local use
import FavouritesList from '../Components/FavouriteList';
import { FavouritesContext } from '../Context/FavouritesContext'; // 4. Corrected Context file name (assuming 'FavouriteContext' was a typo)


export function SearchPage() {
    
    
    const { removeFavourite } = useContext(FavouritesContext); 
    
    const [searchCriteria, setSearchCriteria] = useState({});
    
    
    const filteredProperties = useMemo(() => {
        
        
        const allProperties = ALL_PROPERTIES;

        return allProperties.filter(property => {
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
        });
        
    // The filter function re-runs ONLY when searchCriteria changes.
    }, [searchCriteria]);


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


    return (
        // The main page wrapper div acts as the drop zone for the drag-out removal
        <div
            className="search-page-container"
            onDragOver={handleDragOver}
            onDrop={handleRemoveDrop}
        >
            <main className="search-layout">
                <section className="search-form-section">
                    <SearchForm onSearch={setSearchCriteria} />
                </section>

                <section className="results-and-favourites">
                    <div className="search-results-section">
                        {/* 6. Passed filteredProperties to the SearchResults component */}
                        <SearchResults properties={filteredProperties} /> 
                    </div>

                    <aside className="favourites-sidebar-section">
                        {/* 7. Passed ALL_PROPERTIES to FavouritesList */}
                        <FavouritesList allProperties={ALL_PROPERTIES} /> 
                    </aside>
                </section>
            </main>
        </div>
    );
}
export default SearchPage;