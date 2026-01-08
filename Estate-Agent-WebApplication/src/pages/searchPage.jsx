import React,{useState} from'react';
import  SearchForm from '../components/SearchForm';
import PropertiesData from '.data/properties.json';
import FavouritesList from '../Components/FavouriteList';
import { FavouritesContext } from '../Context/FavouriteContext';
export function SearchPage({properties}){
    const [searchCriteria, setSearchCriteria]=useState({});
    const filteredProperties = properties.filter(property => {
  // Check type
    if (searchCriteria.type && searchCriteria.type !== "any" && property.type !== searchCriteria.type) {
         return false;
     }

  // Check price
    if (searchCriteria.minPrice && property.price < searchCriteria.minPrice) {
        return false;
     }
     if (searchCriteria.maxPrice && property.price > searchCriteria.maxPrice) {
        return false;
     }

  // Check bedrooms
     if (searchCriteria.minBedrooms && property.bedrooms < searchCriteria.minBedrooms) {
        return false;
    }
     if (searchCriteria.maxBedrooms && property.bedrooms > searchCriteria.maxBedrooms) {
        return false;
    }

    
    return true;
});


}