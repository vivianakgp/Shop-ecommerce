import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import '../styles/productsInfo.css';


const ProductInfo = () => {

    const { id } = useParams();

    const [ idProduct, setIdProduct ] = useState({});
    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}/`)
            .then(res => setIdProduct(res.data.data.product))
    }, [id])
    console.log(idProduct)

    return (
        <div className='ProductInfo' >
            <div className="navProduct">
                <Link className='navProduct-Link' to={`/`} >Home</Link>
                <FontAwesomeIcon icon={faArrowRight}/>
                <span className='navProduct-Link' > {idProduct?.title} </span>
            </div>
            <div className="moreDate">
                <div className="dates">
                    <img 
                        className='productImage'
                        src={idProduct?.productImgs} 
                        alt={idProduct?.title} 
                    />
                    <h3 className='productDate' >{idProduct?.title}</h3>
                    <p className='productDate' >Precio <span>{idProduct?.price}</span> </p>
                </div>

                <div className="descriptionProduct">
                    <h4>Descripción</h4>
                    <p>{idProduct?.description}</p>
                </div>
            </div>
            {/* <button></button> */}
        </div>
    );
};

export default ProductInfo;