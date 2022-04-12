import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import '../styles/ProductList.css';
//import components
import SelectCategory from '../components/SelectCategory';
import SearchProduct from '../components/SearchProduct';


const ProductsList = () => {
    const [Products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
            .then(res => setProducts(res.data.data.products))
    }, []);
    console.log(Products)
    
    return (
        <div className='ProductsList' >
            <div className='searchProductContainer'>
                <buttom>ALL</buttom>
                <SelectCategory setProducts={setProducts} />
                <SearchProduct />
            </div>
            {
                Products.map( Product => (
                    <Link className='link' to={`/productInfo/${Products.id}`} >
                    <div className="productContainer" key={Product.id} >
                        <h3 className='productTitle' >{Product?.title} </h3>
                        <img 
                            src={Product?.productImgs} 
                            alt={Product?.title} 
                            className='images'
                        />
                        <p>Prirce <span> {Product?.price} </span> </p>
                    </div>
                    </Link>
                ) )
            }
        </div>
    );
};

export default ProductsList;