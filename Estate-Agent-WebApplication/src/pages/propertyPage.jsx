import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageGallery from '../Components/ImageGallery';
import PropertyTabs from '../Components/PropertyTabs';
import FavouriteButton from '../Components/FavouriteButton';
import allPropertiesData from '../data/properties.json'; // Your JSON data file
import { useFavourites } from '../Context/FavouriteContext';
import './PropertyPage.css'; // Responsive and general styling for the page

const PropertyPage = () => {
  // 1. Get the property ID from the URL parameters
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const { isFavourite } = useFavourites();

  // 2. Fetch the specific property data on component load
  useEffect(() => {
    // Find the property matching the ID (ensure ID is compared correctly, e.g., converted to number)
    const foundProperty = allPropertiesData.find(
      p => p.id.toString() === propertyId
    );

    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      // Handle case where property is not found (e.g., redirect or show 404)
      navigate('/404'); 
    }
  }, [propertyId, navigate]);

  if (!property) {
    // Basic loading state or error message
    return <div className="loading-state">Loading property details...</div>;
  }
  
  // Determine favourite status for the button
  const isCurrentlyFavourite = isFavourite(property.id);

  return (
    <div className="property-page-container">
      
      {/* Property Header Section (Type, Price, Location) */}
      <header className="property-header">
        <h1>{property.title}</h1>
        <p className="property-location">{property.location}, {property.postcodeArea}</p>
        
        <div className="price-and-actions">
          <p className="property-price">£{property.price.toLocaleString()}</p>
          
          {/* Favourite Button (Method 2 for Add to Favourites 8%) */}
          <div className="header-favourite-button">
            <FavouriteButton property={property} isFavourite={isCurrentlyFavourite} />
          </div>
        </div>
      </header>

      {/* 3. Image Gallery Component (5% mark) */}
      <section className="property-gallery-section">
        <ImageGallery images={property.images} title={property.title} />
      </section>

      {/* 4. Tabs Component (7% mark) */}
      <section className="property-details-tabs">
        <PropertyTabs property={property} />
      </section>

      {/* Optional: Nearby information, agent contact */}
      <footer className="property-footer">
        <p>Contact the agent today to book a viewing.</p>
      </footer>
    </div>
  );
};

export default PropertyPage;