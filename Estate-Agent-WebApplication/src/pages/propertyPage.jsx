 import{ useState } from 'react';
import { Link, useParams } from 'react-router-dom';


import ALL_PROPERTIES from '../data/properties.json'; 

function PropertyPage() {
    // 1. Get the ID from the URL
    const { id } = useParams();

    // State to hold the currently selected tab (e.g., 'description', 'floorplan', 'map')
    const [activeTab, setActiveTab] = useState('description');

    // 2. Find the property based on the URL ID
    
    const property = ALL_PROPERTIES.find(p => p.id === Number(id));

    // Handle case where property is not found (e.g., bad URL)
    if (!property) {
        return (
            <div className="property-not-found">
                <h2>Property Not Found</h2>
                <p>The property ID "{id}" does not match any property in our database.</p>
                <Link to="/">Go back to Search</Link>
            </div>
        );
    }
    
    // 3. Helper function to render the content based on the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div className="property-description-content">
                        
                        <p>{property.longDescription}</p> 
                        <ul>
                            <li>**Type:** {property.type}</li>
                            <li>**Bedrooms:** {property.bedrooms}</li>
                            <li>**Price:** £{property.price.toLocaleString()}</li>
                            
                            
                            <li>**Postcode:** {property.postcodeArea}</li> 
                        </ul>
                    </div>
                );
            case 'floorplan':
                return (
                    // Placeholder for the Floor Plan image
                    <div className="floorplan-image-container">
                        
                        <img 
                            src={`/images/floorplan-${property.id}.png`} 
                            alt="Floor Plan" 
                            className="floorplan-image"
                        />
                        <p>Floor plan for the {property.type} property.</p>
                    </div>
                );
            case 'map':
                return (
                    // Placeholder for the map view (using the provided googleMapEmbed key)
                    <div className="map-container">
                        {/* 6. CORRECTION: Use the googleMapEmbed field you provided */}
                        <div dangerouslySetInnerHTML={{ __html: property.googleMapEmbed }} /> 
                        <p>Location: {property.location}.</p> 
                        
                        {/* The property data provided did not have latitude/longitude keys.
                            If you add them later, uncomment the line below. */}
                        {/* <p>Latitude: {property.latitude}, Longitude: {property.longitude}</p> */}
                    </div>
                );
            default:
                return null;
        }
    };

    // 4. Render the full page with the required tabbed interface
    return (
        <div className="property-page-container">
            <header className="property-header">
                <Link to="/" className="back-link">&larr; Back to Search</Link>
               
                <h1>{property.location}</h1> 
                <p className="property-price">£{property.price.toLocaleString()}</p>
            </header>

            <div className="property-image-gallery">
                
                <img 
                    src={property.images[0]} 
                    alt={property.location} 
                    className="main-property-image"
                />
            </div>

            <div className="tabs-navigation">
               
                <button 
                    className={activeTab === 'description' ? 'active' : ''} 
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button 
                    className={activeTab === 'floorplan' ? 'active' : ''} 
                    onClick={() => setActiveTab('floorplan')}
                >
                    Floor Plan
                </button>
                <button 
                    className={activeTab === 'map' ? 'active' : ''} 
                    onClick={() => setActiveTab('map')}
                >
                    Map
                </button>
            </div>

            <section className="tab-content">
                {renderTabContent()}
            </section>
        </div>
    );
}

export default PropertyPage;