import React, { useState } from 'react';
import axios from 'axios';

const SearchProduct = ({setProducts}) => {
    const [ value, setValue ] = useState('');
    const submit= e =>{
        e.preventDefault();
        const valueInLowerCase = value.substring(1).toLowerCase();
        const newValue = value.charAt(0).toUpperCase()+valueInLowerCase;
        // console.log(newValue)
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${newValue}`)
        .then(res => setProducts(res.data.data.products))
        .then(()=> setValue(''))
        
    }
    return (
        <div className='searchContainer'>
            <form className='search-box' onSubmit={submit}>
            <input 
            type='text' 
            placeholder='search'
            onChange={e => setValue(e.target.value)}
            value={value}
            />
            <button type='reset'></button>
            </form>
        </div>
    );
};

export default SearchProduct; 