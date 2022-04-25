import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../styles/ProductList.css';
import gif404 from '../images/404.gif';
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
//import components
import SelectCategory from '../components/SelectCategory';
import SearchProduct from '../components/SearchProduct';
import AnimateComponent from '../components/AnimateComponent';

const ProductsList = ({ Products, setProducts }) => {
    console.log(Products);

    const allProducts = ()=>{
        console.log('all products')
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
        .then(res => setProducts(res.data.data.products))
    };
    return (
        <>
            <div className="subMenu__Container">
                <button onClick={allProducts}>All</button>
                <hr className="separate"/>
                <SelectCategory setProducts={setProducts}/>
                <hr className="separate"/>
                <SearchProduct setProducts={setProducts} />
            </div>
            <hr className="breack"/>
            <AnimateComponent>
                <div className="cards__Container">
                    {
                        Products.length === 0?(
                            <div className="productsNotFound">
                                <p>Products Not Found</p>
                                <img src={gif404} alt="404error"/>
                            </div>
                        ): (
                            
                                Products.map( Product => (
                                    <Link className='link' key={Product.id} to={`/productInfo/${Product.id}`} >
                                        <div className="card">
                                            <div className='card__imgContainer'>
                                                <img className="over" src={Product?.productImgs?.[1]} alt={Product?.title}/>
                                                <img src={Product?.productImgs?.[2]} alt={Product?.title}/>
                                            </div>
                                            <hr className="breakSec"/>
                                            <div className="card__info">
                                                <h3>{Product?.title}</h3>
                                                <p>Price <span> {`$${Product?.price}`} </span> </p>
                                                <button className="shoppingCar"><FontAwesomeIcon icon={faCartShopping}/></button>
                                            </div>
                                        </div>
                                    </Link>
                                ) )
                            
                        )
                    }
                </div>
            </AnimateComponent>

        </>
    );
};

export default ProductsList;