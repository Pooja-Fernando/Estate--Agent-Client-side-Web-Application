import React ,from 'react';
import { Link } from 'react-router-dom';
import All_Properties from '.data/properties.json';

function PropertyCard({}) {
    
   
    const handleDragStart = (e) => {
        // Save the property ID as a string in the dataTransfer object
        e.dataTransfer.setData("propertyId",property.id.toString());
        
        // This is a visual indicator that the effect is copy (adding)
        e.dataTransfer.effectAllowed = "copy"; 
    };

    return (
        <div 
            className="property-card" 
            draggable="true" // Enables dragging of this element
            onDragStart={handleDragStart} // Initiates the drag action and saves the ID
        >
            
            <Link to={`/property/${ prtoperty.id}`} className="card-link">
                <div className="card-image-container">
                    < img
                        src={`/images/${property.images}`} // Adjust path if needed
                        alt={ All_Properties.location} 
                        className="property-image"
                    />
                </div>
                
                <div className="card-details">
                    <h4 className="card-price">£{ All_Properties.price.toLocaleString()}</h4>
                    <p className="card-address">{ All_Properties.location}, { All_Properties.postcode}</p>
                    <div className="card-features">
                        <span>{ property.bedrooms} bed</span> | 
                        <span> { property.type}</span>
                    </div>
                </div>
            </Link>
            
        </div>
    );
}

export default PropertyCard;