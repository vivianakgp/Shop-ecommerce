import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToCartThunk } from "../redux/actions";

// fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
//import components
import SelectCategory from "../components/SelectCategory";
import SearchProduct from "../components/SearchProduct";
import AnimateComponent from "../components/AnimateComponent";
import "../styles/ProductList.css";
import gif404 from "../images/404.gif";

const ProductsList = ({ Products, setProducts }) => {
  // console.log(Products);
  const [msgAddToCart, setMsgAddToCart] = useState("");
  const dispatch = useDispatch();

  const allProducts = () => {
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
      .then((res) => setProducts(res.data.data.products));
  };
  const addProductToCart = (e) => {
    const product = {
      id: parseInt(e.target.attributes.dataid.value),
      quantity: 1,
    };
    if (localStorage.getItem("token")) {
      dispatch(addProductToCartThunk(product))
        .then(() => {
          setMsgAddToCart("Product added to cart");
          setTimeout(() => {
            setMsgAddToCart("");
          }, 5000);
        })
        .catch(() => {
          setMsgAddToCart("Error to add to cart");
          setTimeout(() => {
            setMsgAddToCart("");
          }, 5000);
        });
    } else {
      setMsgAddToCart("Please login to add to cart");
      setTimeout(() => {
        setMsgAddToCart("");
      }, 4000);
    }
  };
  return (
    <>
      <div className="subMenu__Container">
        <button onClick={allProducts}>All</button>
        <hr className="separate" />
        <SelectCategory setProducts={setProducts} />
        <hr className="separate" />
        <SearchProduct setProducts={setProducts} />
      </div>
      <hr className="breack" />
      <AnimateComponent>
        <div className="cards__Container">
          {Products.length === 0 ? (
            <div className="productsNotFound">
              <p>Products Not Found</p>
              <img src={gif404} alt="404error" />
            </div>
          ) : (
            Products.map((Product) => (
              <div className="productList" key={Product.id}>
                <div className="card">
                  <div className="card__imgContainer">
                    <img
                      className="over"
                      src={Product?.productImgs?.[1]}
                      alt={Product?.title}
                    />
                    <img src={Product?.productImgs?.[2]} alt={Product?.title} />
                  </div>
                  <hr className="breakSec" />
                  <div className="card__info">
                    <h3>{Product?.title}</h3>
                    <p>
                      Price <span> {`$${Product?.price}`} </span>{" "}
                    </p>
                    <Link to={`/productInfo/${Product.id}`}>see more</Link>
                    <p
                      style={{
                        width: "100%",
                        textAlign: "center",
                        color: "#F85555",
                        height: "22px",
                      }}
                    >
                      {msgAddToCart}
                    </p>
                    {localStorage.getItem("token") ? (
                      <button
                        className="shoppingCar"
                        dataid={Product.id}
                        onClick={(e) => addProductToCart(e)}
                      >
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          dataid={Product.id}
                        />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </AnimateComponent>
    </>
  );
};

export default ProductsList;
