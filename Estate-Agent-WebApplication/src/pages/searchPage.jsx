import React, { useState, useEffect } from 'react';
import SearchForm from '../Components/SearchForm';
import PropertyList from '../Components/PropertyList'; // Assuming you renamed SearchResults.jsx to PropertyList.jsx
import FavouriteList from '../Components/FavouriteList';
import { useFavourites } from '../Context/FavouriteContext';
import allPropertiesData from '../data/properties.json'; // Your JSON data file
import '../pages/SearchPage.css'; // Your hand-written media queries and flex/grid layouts

const SearchPage = () => {
  // 1. State for the currently filtered properties
  const [filteredProperties, setFilteredProperties] = useState(allPropertiesData);

  // 2. Access the favourites context for display
  const { favourites } = useFavourites();

  // 3. State to hold the user's current search criteria
  const [searchCriteria, setSearchCriteria] = useState({});

  /**
   * Function to handle the search logic. 
   * This is passed down to the SearchForm and is triggered on form submission.
   * @param {Object} criteria - The criteria object from SearchForm.
   */
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);

    // --- Search Logic Implementation (10% Mark) ---
    // The filtering must work for ANY combination of criteria (1 to 5).
    const results = allPropertiesData.filter(property => {
      let matches = true;

      // Filter by Type
      if (criteria.type && criteria.type !== 'any' && property.type !== criteria.type) {
        matches = false;
      }

      // Filter by Price (Min/Max)
      if (criteria.minPrice && property.price < criteria.minPrice) {
        matches = false;
      }
      if (criteria.maxPrice && property.price > criteria.maxPrice) {
        matches = false;
      }
      
      // Filter by Bedrooms (Min/Max)
      // Implement similar logic for bedrooms, date added, and postcode area...

      return matches;
    });

    setFilteredProperties(results);
  };

  return (
    <div className="search-page-container">
      {/* Search Bar and Favourites should be side-by-side on large screens */}
      <main className="search-and-results-area">
        
        {/* The Search Form Component (8% for Widgets) */}
        <SearchForm onSearch={handleSearch} />

        {/* The Results List Component (7% for Display) */}
        <PropertyList properties={filteredProperties} />
      </main>

      {/* The Favourites Sidebar (3% for Display) */}
      <aside className="favourites-area">
        <h2>My Favourites</h2>
        {/* The FavouriteList component handles all D&D, removal, and clearing logic */}
        <FavouriteList favourites={favourites} />
      </aside>
    </div>
  );
};

export default SearchPage;