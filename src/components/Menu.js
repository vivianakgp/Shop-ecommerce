import React, { useState, useEffect } from 'react';
import axios from 'axios';
// , { useState }
import '../styles/Menu.css';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/ecommerce-logo-png-11.png';
// components
import Login from './Login';
import MenuCar from './MenuCar';
import { useDispatch } from 'react-redux';
import { getCartThunk } from '../redux/actions';

const Menu = () => {

    const dispatch = useDispatch();
    // Login State
    const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    // Car State
    const [ isCarOpen, setisCarOpen ] = useState(false);

    const openCart = () => {
        setisCarOpen(!isCarOpen)
        dispatch(getCartThunk())
    }
    return (
        <div className="Menu">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="icons">
                <span onClick={()=> setIsLoginOpen(true)}>
                    <FontAwesomeIcon icon={faUser}/>
                </span>
                <span><FontAwesomeIcon icon={faCartShopping} onClick={ openCart } /></span>
                {
                    isLoginOpen&&
                    <Login setIsLoginOpen={setIsLoginOpen}  />
                }
            </div>
            <MenuCar isCarOpen={isCarOpen} />
        </div>
    );
};

export default Menu;