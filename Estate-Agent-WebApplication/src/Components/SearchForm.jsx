import React, { useState } from 'react';
import { Combobox } from 'react-widgets';
import DatePicker from 'react-widgets/DatePicker';
import NumberPicker from 'react-widgets/NumberPicker';
import 'react-widgets/styles.css';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAddedAfter: null,
    dateAddedBefore: null,
    postcodeArea: ''
  });

  // Property types for dropdown
  const propertyTypes = ['any', 'house', 'flat'];

  // Handle form field changes
  const handleChange = (field, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  // Reset form
  const handleReset = () => {
    setSearchCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAddedAfter: null,
      dateAddedBefore: null,
      postcodeArea: ''
    });
    onSearch({});
  };

  return (
    <div className="search-form-container">
      <h2>Search Properties</h2>
      <form onSubmit={handleSubmit} className="search-form">
        
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="propertyType">Property Type</label>
          <Combobox
            data={propertyTypes}
            value={searchCriteria.type}
            onChange={(value) => handleChange('type', value)}
            placeholder="Select property type"
          />
        </div>

        {/* Price Range */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="minPrice">Min Price (£)</label>
            <NumberPicker
              value={searchCriteria.minPrice}
              onChange={(value) => handleChange('minPrice', value)}
              min={0}
              step={10000}
              placeholder="Min price"
              format={{ style: 'currency', currency: 'GBP' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (£)</label>
            <NumberPicker
              value={searchCriteria.maxPrice}
              onChange={(value) => handleChange('maxPrice', value)}
              min={0}
              step={10000}
              placeholder="Max price"
              format={{ style: 'currency', currency: 'GBP' }}
            />
          </div>
        </div>

        {/* Bedrooms Range */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms</label>
            <NumberPicker
              value={searchCriteria.minBedrooms}
              onChange={(value) => handleChange('minBedrooms', value)}
              min={0}
              max={10}
              placeholder="Min bedrooms"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxBedrooms">Max Bedrooms</label>
            <NumberPicker
              value={searchCriteria.maxBedrooms}
              onChange={(value) => handleChange('maxBedrooms', value)}
              min={0}
              max={10}
              placeholder="Max bedrooms"
            />
          </div>
        </div>

        {/* Date Added */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="dateAddedAfter">Added After</label>
            <DatePicker
              value={searchCriteria.dateAddedAfter}
              onChange={(value) => handleChange('dateAddedAfter', value)}
              placeholder="Select date"
              max={new Date()}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateAddedBefore">Added Before</label>
            <DatePicker
              value={searchCriteria.dateAddedBefore}
              onChange={(value) => handleChange('dateAddedBefore', value)}
              placeholder="Select date"
              max={new Date()}
            />
          </div>
        </div>

        {/* Postcode Area */}
        <div className="form-group">
          <label htmlFor="postcodeArea">Postcode Area (e.g., BR1, NW1)</label>
          <input
            type="text"
            id="postcodeArea"
            value={searchCriteria.postcodeArea}
            onChange={(e) => handleChange('postcodeArea', e.target.value.toUpperCase())}
            placeholder="Enter postcode area"
            className="postcode-input"
          />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn-search">Search</button>
          <button type="button" onClick={handleReset} className="btn-reset">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;