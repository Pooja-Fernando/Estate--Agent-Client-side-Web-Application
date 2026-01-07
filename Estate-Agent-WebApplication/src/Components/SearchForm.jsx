import {useState} from 'react';
import './SearchForm.css';
export function SearchForm({onSearch}){
    const[criteria,setCriteria]=useState({
        type: 'any',
        minPrice:'',
        maxPrice:'',
        minBedrooms:'',
        maxBedrooms:'',
        dateStart:'',
        postcodeAra:'',

    });
    

}
