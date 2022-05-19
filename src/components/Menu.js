import React, { useState } from "react";
import "../styles/Menu.css";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/ecommerce-logo-png-11.png";
// components
import ModalUser from "./ModalUser";
import MenuCar from "./MenuCar";
import { useDispatch } from "react-redux";
import { getCartThunk } from "../redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  // Login State
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  // Car State
  const [isCarOpen, setisCarOpen] = useState(false);

  const openCart = () => {
    setisCarOpen(!isCarOpen);
    dispatch(getCartThunk());
  };
  return (
    <div className="Menu">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="icons">
        <span onClick={() => setIsModalUserOpen(true)}>
          <FontAwesomeIcon icon={faUser} />
        </span>
        <span>
          <FontAwesomeIcon icon={faCartShopping} onClick={openCart} />
        </span>
        {isModalUserOpen && (
          <ModalUser setIsModalUserOpen={setIsModalUserOpen} />
        )}
      </div>
      <MenuCar isCarOpen={isCarOpen} setisCarOpen={setisCarOpen} />
    </div>
  );
};

export default Menu;
