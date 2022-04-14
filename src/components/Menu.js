import React from 'react';
import '../styles/Menu.css';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// image
import logo from '../images/ecommerce-logo-png-11.png';
const Menu = () => {
    return (
        <div className="Menu">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="icons">
                <span><FontAwesomeIcon icon={faUser}/></span>
                <span><FontAwesomeIcon icon={faCartShopping}/></span>
            </div>
        </div>
    );
};

export default Menu;