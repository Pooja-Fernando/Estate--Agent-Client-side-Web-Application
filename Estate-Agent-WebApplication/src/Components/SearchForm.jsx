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
    //function to update any field in the form.
    const handleChange=(name,value)=>{//name is the property criteria object and the value from input.
        setCriteria(previous=>({
            ...previous,
            [name]:value,

    }));
    }
    

}
