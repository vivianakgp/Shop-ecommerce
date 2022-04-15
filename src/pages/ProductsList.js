import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Link} from 'react-router-dom'
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
    
    
    return (
        <div className="ProductsList">
            <div className="subMenu__Container">
                <buttom>ALL</buttom>
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
                                <p>Prirce <span> {Product?.price} </span> </p>
                                <button>car</button>
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