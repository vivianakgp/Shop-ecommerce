import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../styles/ProductList.css';
import gif404 from '../images/404.gif';
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
        <div className="ProductsList">
            <div className="subMenu__Container">
                <button onClick={allProducts}>All</button><hr/>
                <SelectCategory setProducts={setProducts} /><hr/>
                <SearchProduct setProducts={setProducts} />
            </div>
            <hr style={{width:"70%", margin:"20px auto"}}/>
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
                                            <hr style={{color:"#918d8d"}}/>
                                            <div className="card__info">
                                                <h3>{Product?.title}</h3>
                                                <p>Prirce <span> {`$${Product?.price}`} </span> </p>
                                                {/* <p>Category <span> {`$${Product?.category.name}`} </span> </p> */}
                                            </div>
                                        </div>
                                    </Link>
                                ) )
                            
                        )
                    }
                </div>
            </AnimateComponent>

        </div>
    );
};

export default ProductsList;