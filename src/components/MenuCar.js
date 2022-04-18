import React from 'react';
import '../styles/CarModal.css'

const MenuCar = ( {isCarOpen} ) => {
    return (
        <div className={`CarModal ${isCarOpen ? 'open' : '' }`} >
            <h3>Car</h3>
        </div>
    );
};

export default MenuCar;