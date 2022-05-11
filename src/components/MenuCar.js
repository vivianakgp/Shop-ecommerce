import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCounter from '../hooks/useCounter';
import { deletCartThunk } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBucket, faXmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/MenuCar.css';

const MenuCar = ( {isCarOpen, setisCarOpen} ) => {
    const productCarts = useSelector(state => state.productsCart);
    const { counter } = useCounter();
    const dispatch = useDispatch();
    console.log(productCarts)
    return (
        <div className={`CarModal ${isCarOpen ? 'open' : '' }`} >
            <FontAwesomeIcon 
            className="icon-close"
            icon={faXmark} 
            onClick={()=> setisCarOpen(false)}
            />
            <h3 className="car-title">Shopping Cart</h3>
            {
                productCarts.map(productCart => (
                    <div className="dataCart" key={productCart.id} >
                        <div className="dataCart-ch">
                            <b>
                                <p> {productCart?.title} </p>
                            </b>
                            <p><span>Brand:</span><b>{productCart?.brand}</b> </p>
                            <p><span>Price:</span><b>${productCart?.price}</b> </p>
                            <p><span>Quantity:</span> <b>{productCart.productsInCart?.quantity}</b> </p>
                        </div>
                        <button className="btnDelete" onClick={ () => dispatch(deletCartThunk(productCart.id)) } >
                            <FontAwesomeIcon icon={faBucket} />
                        </button>
                    </div>
                )) 
            }
        </div>
    );
};

export default MenuCar;