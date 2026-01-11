

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './SearchForm.css'; // Import specific CSS for the form styling

const SearchForm = ({ onSearch }) => {
  const [criteria, setCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcodeArea: '',
    dateAdded: '', // For "after specified date"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };
  
  // Helper function for widgets that don't use standard event objects (e.g., DatePicker)
  const handleWidgetChange = (name, value) => {
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Execute the search function passed from SearchPage
    onSearch(criteria); // This starts the search functionality (10% requirement)
  };
  
  // Example data for dropdowns
  const propertyTypes = ['any', 'house', 'flat'];
  const minMaxPrices = ['100000', '200000', '500000', '750000', '1000000', 'any'];
  const minMaxBedrooms = ['1', '2', '3', '4', '5', 'any'];


  return (
    <div className="search-form-container">
      <h2>Find Your Dream Property</h2>
      <form onSubmit={handleSubmit} className="search-form-grid">
        
        {/* 1. Property Type (Dropdown/Select Widget) [cite: 25] */}
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          {/* Example of a standard select element that would be styled as a widget */}
          <select 
            id="type" 
            name="type" 
            value={criteria.type} 
            onChange={handleChange}
            className="react-widget" // Class for widget styling
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* 2. Min Price (Number Input Widget) [cite: 26] */}
        <div className="form-group">
          <label htmlFor="minPrice">Min Price (£)</label>
          {/* Use NumberPicker or standard input styled as a widget */}
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="e.g. 100000"
            value={criteria.minPrice}
            onChange={handleChange}
            className="react-widget"
          />
        </div>
        
        {/* 3. Max Price (Number Input Widget) [cite: 26] */}
        <div className="form-group">
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="e.g. 500000"
            value={criteria.maxPrice}
            onChange={handleChange}
            className="react-widget"
          />
        </div>

        {/* 4. Min Bedrooms (Dropdown/Number Widget) [cite: 27] */}
        <div className="form-group">
          <label htmlFor="minBedrooms">Min Bedrooms</label>
          <select 
            id="minBedrooms" 
            name="minBedrooms" 
            value={criteria.minBedrooms} 
            onChange={handleChange}
            className="react-widget"
          >
            {minMaxBedrooms.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        
        {/* 5. Max Bedrooms (Dropdown/Number Widget) [cite: 27] */}
        <div className="form-group">
          <label htmlFor="maxBedrooms">Max Bedrooms</label>
          <select 
            id="maxBedrooms" 
            name="maxBedrooms" 
            value={criteria.maxBedrooms} 
            onChange={handleChange}
            className="react-widget"
          >
            {minMaxBedrooms.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* 6. Date Added (Date Picker Widget) [cite: 28] */}
        <div className="form-group">
          <label htmlFor="dateAdded">Date Added (After)</label>
          {/* You would replace the standard input below with a true DatePicker component 
              from your chosen React Widgets library (e.g., react-widgets) */}
          <input 
            type="date"
            id="dateAdded"
            name="dateAdded"
            value={criteria.dateAdded}
            onChange={handleChange}
            className="react-widget"
          />
        </div>

        {/* 7. Postcode Area (Text Input) [cite: 28] */}
        <div className="form-group">
          <label htmlFor="postcodeArea">Postcode Area</label>
          <input
            type="text"
            id="postcodeArea"
            name="postcodeArea"
            placeholder="e.g. BR1, NW1"
            value={criteria.postcodeArea}
            onChange={handleChange}
            className="react-widget"
          />
        </div>

        <button type="submit" className="search-button">
          Search Properties
        </button>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;