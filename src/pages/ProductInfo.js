import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft, faCar} from '@fortawesome/free-solid-svg-icons';
import '../styles/productsInfo.css';
import AnimateComponent from '../components/AnimateComponent';



const ProductInfo = ({ Products }) => {

    const { id } = useParams();
    const [ idProduct, setIdProduct ] = useState({});
    // state Counter
    const [Counter, setCounter] = useState(0);
    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}/`)
            .then(res => setIdProduct(res.data.data.product))
    }, [id])

    const currentCategory = idProduct.category;
    const sameProductsByCategory = Products.filter(product => product.category.name === currentCategory);
    console.log(sameProductsByCategory)
    const Increment = () => setCounter(Counter + 1);
    const Decrement = () => setCounter(Counter - 1);

    return (
        <AnimateComponent>
            <div className="ProductInfo" >
                <div className="navProduct">
                    <Link className='navProduct-Link' to={`/`} >Home</Link>
                    <FontAwesomeIcon icon={faArrowRight}/>
                    <span className='navProduct-Link' > {idProduct?.title} </span>
                </div>
                <div className="moreDate">
                    <div className="dates">
                        <img 
                            className="productImage"
                            src={idProduct?.productImgs} 
                            alt={idProduct?.title} 
                        />
                        <h3 className="productDate" >{idProduct?.title}</h3>
                        <p className="productDate" >Precio <span>{idProduct?.price}</span> </p>
                    </div>
                    <div className="descriptionProduct">
                        <h4>Descripción</h4>
                        <p>{idProduct?.description}</p>
                        <div className="Counter">
                            {/* Counter */}
                            <button className="arrows" onClick={Increment} >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                            <h4> {Counter} </h4>
                            <button className="arrows" onClick={Decrement} >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </div>
                        <div className="Car">
                            <FontAwesomeIcon icon={faCar} />
                        </div>
                    </div>
                </div>
                <div className="sameProductsContainer">
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
                </div>
            </div>
        </AnimateComponent>
    );
};

export default ProductInfo;