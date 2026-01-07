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
    const handleSubmit=(e)=>{
        e.preventDefault();//will not refresh the web page when submitting.
        onSerach(criteria);

    };
    return(
        <form onsubmit={handleSubmit}>
        <label>Property Type</label>
        <DropdownList
            data={['any','house','flat']}
            value={criteria.type}{/*currently selected value.*/}
            onChange={val => handleChange('type',val)
            }
        />
        {/*Prices*/ }
        <label>Price</label>
        <NumberPicker
            value={criteria.price}
            onChange={val =>handleChange('price',val)}
            min={0}//from this user cannot pick a negative value.input validation

            
        />
        <label>Bedrooms:</label>
        <NumberPicker
            value={criteria.bedrooms}
            onChange={val => handleChange('bedrooms', val)}
            min={0}
      />
        <label>Available Date:</label>
        <DateTimePicker
            value={criteria.date}
            onChange={val => handleChange('date', val)}
      />

        <label>Postcode:</label>
        <input
            type="text"
            value={criteria.postcode}
            onChange={e => handleChange('postcode', e.target.value)}
      />

      <button type="submit">Search</button>

         </form>
    )
    }

    

}
