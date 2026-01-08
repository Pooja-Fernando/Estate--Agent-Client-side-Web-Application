import React ,{useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import All_Properties from './data/properties.json';

function PropertyPage() {
    // 1. Get the ID from the URL
    const { id } = useParams();
    
    // State to hold the currently selected tab (e.g., 'description', 'floorplan', 'map')
    const [activeTab, setActiveTab] = useState('description');

    // 2. Find the property based on the URL ID
    // We use a simple useEffect/state or a direct lookup here.
    const property = All_Properties.find(p => p.id === Number(id));

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
                    <div>
                        <p>{property.description}</p>
                        <ul>
                            <li>**Type:** {property.type}</li>
                            <li>**Bedrooms:** {property.bedrooms}</li>
                            <li>**Price:** £{property.price.toLocaleString()}</li>
                            <li>**Postcode:** {property.postcode}</li>
                        </ul>
                    </div>
                );
            case 'floorplan':
                return (
                    // Placeholder for the Floor Plan image
                    <div className="floorplan-image-container">
                        <img src={`/images/${property.floorplanImage}`} alt="Floor Plan" className="floorplan-image"/>
                        <p>Floor plan for the {property.type} property.</p>
                        

[Image of Floor plan example]

                    </div>
                );
            case 'map':
                return (
                    // Placeholder for the map view (using a simple image for coursework)
                    <div className="map-container">
                        <p>Location details for {property.address}.</p>
                        <p>Latitude: {property.latitude}, Longitude: {property.longitude}</p>
                        
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
                <h1>{property.address}</h1>
                <p className="property-price">£{property.price.toLocaleString()}</p>
            </header>

            <div className="property-image-gallery">
                {/* Display main image */}
                <img src={`/images/${property.mainImage}`} alt={property.address} className="main-property-image"/>
            </div>

            <div className="tabs-navigation">
                {/* Tab Buttons */}
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