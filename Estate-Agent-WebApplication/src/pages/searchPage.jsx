import React,{useState} from'react';
import  SearchForm from '../components/SearchForm';
import PropertiesData from '.data/properties.json';
export function SearchPage({properties}){
    const [searchCriteria, setSearchCriteria]=useState({});
    const filteredProperties = properties.filter(property => {
  // Check type
    if (criteria.type !== "any" && property.type !== criteria.type) {
         return false;
     }

  // Check price
    if (criteria.minPrice && property.price < criteria.minPrice) {
        return false;
     }
     if (criteria.maxPrice && property.price > criteria.maxPrice) {
        return false;
     }

  // Check bedrooms
     if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) {
        return false;
    }
     if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) {
        return false;
    }

     // If it passed all checks, include it
    return true;
});


}