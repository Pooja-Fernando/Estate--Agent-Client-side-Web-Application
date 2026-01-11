import React, { useState } from 'react';
import './SearchForm.css';
// Assume you install and import a React Widget library like react-widgets or ant-design
// import { DropdownList, Calendar, NumberPicker } from 'react-widgets'; 

const SearchForm = ({ onSearch }) => {
  // Initialize state for all five search criteria
  const [formData, setFormData] = useState({
    type: 'any', // (house, flat, any)
    minPrice: '', 
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAdded: null, // For single date search
    postcodeArea: '', // e.g., BR1, NW1
  });

  // Simple change handler for standard inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for custom React Widgets (Example: Date or Number picker)
  // const handleWidgetChange = (name, value) => {
  //   setFormData(prevData => ({ ...prevData, [name]: value }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the cleaned form data up to the parent (SearchPage) for filtering
    onSearch(formData);
  };

  return (
    <div className="search-form-container">
      <h3>Property Search Criteria</h3>
      <form onSubmit={handleSubmit} className="search-form">
        
        [cite_start]{/* 1. Property Type (Dropdown/Select Widget) [cite: 25] */}
        <div className="form-group">
          <label htmlFor="type">Property Type:</label>
          {/* REPLACE with React Widget for DropdownList */}
          <select 
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="widget-select"
          >
            [cite_start]<option value="any">Any [cite: 25]</option>
            [cite_start]<option value="house">House [cite: 25]</option>
            [cite_start]<option value="flat">Flat [cite: 25]</option>
          </select>
        </div>

        [cite_start]{/* 2. Price (Min/Max Number Input Widgets) [cite: 26] */}
        <div className="form-group-double">
          <label>Price Range:</label>
          <div className="input-pair">
             {/* REPLACE with React Widget for NumberPicker or RangeSlider */}
            [cite_start]<input type="number" name="minPrice" placeholder="Min Price [cite: 26]" value={formData.minPrice} onChange={handleChange} className="widget-number"/>
            [cite_start]<input type="number" name="maxPrice" placeholder="Max Price [cite: 26]" value={formData.maxPrice} onChange={handleChange} className="widget-number"/>
          </div>
        </div>

        [cite_start]{/* 3. Bedrooms (Min/Max Number Input Widgets) [cite: 27] */}
        <div className="form-group-double">
          <label>Bedrooms:</label>
          <div className="input-pair">
            {/* REPLACE with React Widget for NumberPicker */}
            [cite_start]<input type="number" name="minBedrooms" placeholder="Min Bedrooms [cite: 27]" value={formData.minBedrooms} onChange={handleChange} className="widget-number"/>
            [cite_start]<input type="number" name="maxBedrooms" placeholder="Max Bedrooms [cite: 27]" value={formData.maxBedrooms} onChange={handleChange} className="widget-number"/>
          </div>
        </div>

        [cite_start]{/* 4. Date Added (Date Picker Widget) [cite: 28] */}
        <div className="form-group">
          <label htmlFor="dateAdded">Date Added (After):</label>
          {/* REPLACE with React Widget for Calendar or DatePicker */}
          <input type="date" id="dateAdded" name="dateAdded" value={formData.dateAdded || ''} onChange={handleChange} className="widget-date"/>
        </div>

        [cite_start]{/* 5. Postcode Area (Text Input Widget) [cite: 28] */}
        <div className="form-group">
          <label htmlFor="postcodeArea">Postcode Area:</label>
           {/* REPLACE with React Widget if enhanced input is chosen (e.g., masked input) */}
          [cite_start]<input type="text" id="postcodeArea" name="postcodeArea" placeholder="e.g. BR1, NW1 [cite: 28]" value={formData.postcodeArea} onChange={handleChange} className="widget-text"/>
        </div>

        <button type="submit" className="search-button">Search Properties</button>
      </form>
    </div>
  );
};

export default SearchForm;