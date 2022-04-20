import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCounter from '../hooks/useCounter';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus, faCartShopping, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import AnimateComponent from '../components/AnimateComponent';
// import { useDispatch } from 'react-redux';
// import { updateCartThunk } from '../redux/actions';
// import '../styles/productsInfo.css';

const ProductInfo = ({ Products }) => {

    const { id } = useParams();
    const [ idProduct, setIdProduct ] = useState({});
    // state Counter
    const { counter, decrement, increment } = useCounter();

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}/`)
            .then(res => setIdProduct(res.data.data.product))
    }, [id])

    const currentCategory = idProduct.category;
    const sameProductsByCategory = Products.filter(product => product.category.name === currentCategory);
    return (
        <AnimateComponent>
            <div className="productInfo" >
                <div className="productInfo__subMenu">
                    <Link to={`/`} >Home</Link>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <span>{idProduct?.title}</span>
                </div>
                <section className="productDetail">
                    {/* images container */}
                    <div className="productImages">
                        <img src={idProduct?.productImgs} alt={idProduct?.title} />
                    </div>
                    {/* infomation  container */}
                    <div className="productData">
                        <h1>{idProduct?.title}</h1>
                        <div className="priceAndShoppingCar">
                            <div className="flexcontainer">
                                <h3>Precio <span>$ {idProduct?.price}</span> </h3>
                                <div className="Counter">
                                    <h3>Quantity</h3>
                                    <p>
                                    <button onClick={decrement}><FontAwesomeIcon icon={faMinus}/></button>
                                    <span>{counter}</span>
                                    <button onClick={increment}><FontAwesomeIcon icon={faPlus}/></button>
                                    </p>
                                </div>
                            </div>
                            <div className="carBtn">
                                Add to car  <FontAwesomeIcon icon={faCartShopping}/>
                            </div>
                            
                        </div>
                        <div className="description">
                            <p>{idProduct?.description}</p>
                        </div>
                    </div>
                </section>
                <hr/>
                <section className="sameProductsContainer">
                        {
                            sameProductsByCategory?.map(product => product.id !== idProduct.id && (
                                <Link className='link' key={product.id} to={`/productInfo/${product.id}`} >
                                    <div className="card">
                                        <div className='card__imgContainer'>
                                            <img 
                                                src={product?.productImgs} 
                                                alt={product?.title} 
                                            />
                                        </div>
                                        <div className="card__info">
                                            <h3>{product?.title}</h3>
                                            <p>Prirce <span> {`$${product?.price}`} </span> </p>
                                            {/* <p>Category <span> {`$${product?.category.name}`} </span> </p> */}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                </section>
            </div>
        </AnimateComponent>      
    );
};

export default ProductInfo;



{/* <div className="flexcontainer">
    <h3>Precio <span>$ {idProduct?.price}</span> </h3>
    <div className="Counter">
        <h3>Quantity</h3>
        <>
            <button onClick={decrement}><FontAwesomeIcon icon={faMinus}/></button>
            <span>{counter}</span>
            <button onClick={increment}><FontAwesomeIcon icon={faPlus}/></button>
        <>
    </div>
</div> */}