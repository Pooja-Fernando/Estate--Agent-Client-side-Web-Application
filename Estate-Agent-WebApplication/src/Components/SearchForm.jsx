import { useState } from 'react';


function SearchForm({ onSearch }) {
    const [formData, setFormData] = useState({
        type: 'any',
        minPrice: '', maxPrice: '',
        minBedrooms: '', maxBedrooms: '',
        postcodeArea: '',
        dateAddedMax: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(formData); 
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <h2>Find Your New Home</h2>
            
            {/* Type Filter */}
            <label htmlFor="type">Property Type</label>
            <select name="type" id="type" value={formData.type} onChange={handleChange}>
                <option value="any">Any</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
            </select>
            
            {/* Price Filter */}
            <label>Price Range (£)</label>
            <input type="number" name="minPrice" placeholder="Min Price" value={formData.minPrice} onChange={handleChange} />
            <input type="number" name="maxPrice" placeholder="Max Price" value={formData.maxPrice} onChange={handleChange} />
            
            {/* Bedrooms Filter */}
            <label>Bedrooms</label>
            <input type="number" name="minBedrooms" placeholder="Min Beds" value={formData.minBedrooms} onChange={handleChange} />
            <input type="number" name="maxBedrooms" placeholder="Max Beds" value={formData.maxBedrooms} onChange={handleChange} />
            
            {/* Date Added Filter (Simplified: between two given dates is more complex) */}
            <label htmlFor="dateAddedMax">Added Before</label>
            <input type="date" name="dateAddedMax" id="dateAddedMax" value={formData.dateAddedMax} onChange={handleChange} />

            {/* Postcode Area Filter */}
            <label htmlFor="postcodeArea">Postcode Area (e.g. BR1)</label>
            <input type="text" name="postcodeArea" id="postcodeArea" value={formData.postcodeArea} onChange={handleChange} maxLength="3" />
            
            <button type="submit" className="search-button">Search Properties</button>
        </form>
    );
}

export default SearchForm;