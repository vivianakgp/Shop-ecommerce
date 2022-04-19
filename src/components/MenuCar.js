import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCounter from '../hooks/useCounter';
import { deletCartThunk } from '../redux/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBucket} from '@fortawesome/free-solid-svg-icons';
import '../styles/MenuCar.css';


const MenuCar = ( {isCarOpen} ) => {

    const productCarts = useSelector(state => state.productsCart)
    
    const { counter } = useCounter();

    const dispatch = useDispatch()

    return (
        <div className={`CarModal ${isCarOpen ? 'open' : '' }`} >
            <h3 className='car-title' >Carro de compras</h3>
            {
               productCarts.map(productCart => (
                   <div className="dataCart" key={productCart.id} >
                       
                       <div className="dataCart-ch">
                            <p> {productCart?.brand} </p>
                            <b>
                                <p> {productCart?.title} </p>
                            </b>
                            <p>${productCart?.price}</p>
                            <p> {productCart.productsInCart?.quantity} </p>
                            <div className="Counter">
                                <p> {counter} </p>
                            </div>
                            <button onClick={ () => dispatch(deletCartThunk(productCart.id)) } >
                                <FontAwesomeIcon icon={faBucket} />
                            </button>
                       </div>
                   </div>
               )) 
            }
        </div>
    );
};

export default MenuCar;