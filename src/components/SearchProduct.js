import React from 'react';
import '../styles/SearchProduct.css';


const SearchProduct = () => {
    return (
        <div className='searchBox'>
            <form className='search-box'>
            <input type='text' placeholder='search'/>
            <button type='reset'></button>
            </form>
        </div>
    );
};

export default SearchProduct; 