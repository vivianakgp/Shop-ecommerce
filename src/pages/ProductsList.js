import React from 'react';
// , { useEffect }
// import axios from 'axios';
// import { useState } from 'react';
import {Link} from 'react-router-dom'
import '../styles/ProductList.css';
//import components
import SelectCategory from '../components/SelectCategory';
import SearchProduct from '../components/SearchProduct';


const ProductsList = ({Products, setProducts}) => {

    console.log(Products)
    
    return (
        <div className="ProductsList">
            <div className="subMenu__Container">
                <button>ALL</button>
                <SelectCategory setProducts={setProducts} />
                <SearchProduct setProducts={setProducts} />
            </div>
            <div className="cards__Container">
            {
                Products.map( Product => (
                    <Link className='link' key={Product.id} to={`/productInfo/${Product.id}`} >
                        <div className="card">
                            <div className='card__imgContainer'>
                                <img 
                                    src={Product?.productImgs} 
                                    alt={Product?.title} 
                                />
                            </div>
                            <div className="card__info">
                                <h3>{Product?.title}</h3>
                                <p>Prirce <span> {`$${Product?.price}`} </span> </p>
                                {/* <p>Category <span> {`$${Product?.category.name}`} </span> </p> */}
                            </div>
                        </div>
                    </Link>
                ) )
            }
            </div>
        </div>
    );
};

export default ProductsList;