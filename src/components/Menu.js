import React, { useState } from 'react';
// , { useState }
import '../styles/Menu.css';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/ecommerce-logo-png-11.png';
// components
import Login from './Login';
const Menu = () => {
    const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    return (
        <div className="Menu">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="icons">
                <span onClick={()=> setIsLoginOpen(true)}>
                    <FontAwesomeIcon icon={faUser}/>
                </span>
                <span><FontAwesomeIcon icon={faCartShopping}/></span>
                {
                    isLoginOpen&&
                    <Login setIsLoginOpen={setIsLoginOpen}/>
                }
            </div>
        </div>
    );
};

export default Menu;