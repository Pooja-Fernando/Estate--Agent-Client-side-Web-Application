import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ALL_PROPERTIES from '../data/properties.json'; 

function PropertyPage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('description');

    const property = ALL_PROPERTIES.find(p => p.id === Number(id));

    if (!property) {
        return (
            <div className="property-not-found">
                <h2>Property Not Found</h2>
                <Link to="/">Go back to Search</Link>
            </div>
        );
    }
    
    
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
                    <div className="floorplan-image-container">
                        {/* Floor Plan display (required for tabs) */}
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
                    <div className="map-container">
                        {/* Google Map display*/}
                        <div dangerouslySetInnerHTML={{ __html: property.googleMapEmbed }} /> 
                        <p>Location: {property.location}.</p> 
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="property-page-container">
            <header className="property-header">
                <Link to="/" className="back-link">← Back to Search</Link>
                <h1>{property.location}</h1> 
                <p className="property-price">£{property.price.toLocaleString()}</p>
            </header>

            <div className="property-image-gallery">
               
                <img 
                    src={property.images[0]} 
                    alt={property.location} 
                    className="main-property-image"
                />
               =
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