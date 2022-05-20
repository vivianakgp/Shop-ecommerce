import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToCartThunk } from "../redux/actions";
import useCounter from "../hooks/useCounter";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCartShopping,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import AnimateComponent from "../components/AnimateComponent";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductInfo = ({ Products }) => {
  const { id } = useParams();
  const [idProduct, setIdProduct] = useState({});
  const [msgAddToCart, setMsgAddToCart] = useState("");
  const { counter, decrement, increment } = useCounter();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}/`)
      .then((res) => setIdProduct(res.data.data.product));
  }, [id]);

  const currentCategory = idProduct.category;
  const sameProductsByCategory = Products.filter(
    (product) => product.category.name === currentCategory
  );
  const addProductToCart = () => {
    const product = {
      id: parseInt(id),
      quantity: counter,
    };
    // console.log(product);
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
    <AnimateComponent>
      <div className="productInfo">
        <div className="productInfo__subMenu">
          <Link
            to={`/`}
            style={{
              textDecoration: "none",
              marginRight: "10px",
              color: "#a0a0a0",
            }}
          >
            Home
          </Link>
          <FontAwesomeIcon
            style={{ marginRight: "8px", color: "#F85555" }}
            icon={faArrowLeft}
          />
          <span style={{ color: "#515151" }}>{idProduct?.title}</span>
        </div>
        <section className="productDetail">
          {/* images container */}
          <div className="productImages">
            <Carousel>
              {idProduct?.productImgs?.map((url) => (
                <Carousel.Item className="carouselItem" key={url}>
                  <img className="carouselImg" src={url} alt={url} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          {/* infomation  container */}
          <div className="productData">
            <h1>{idProduct?.title}</h1>
            <div className="media768">
              <div className="priceAndShoppingCar">
                <div className="flexcontainer">
                  <h3>
                    Price <span>$ {idProduct?.price}</span>{" "}
                  </h3>
                  <div className="Counter">
                    <h3>Quantity</h3>
                    <div className="counter__container">
                      <button onClick={decrement}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{counter}</span>
                      <button onClick={increment}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
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
                <div className="carBtn" onClick={addProductToCart}>
                  Add to car <FontAwesomeIcon icon={faCartShopping} />
                </div>
              </div>
              <div className="description">
                <p>{idProduct?.description}</p>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <h2 className="section2">Discover similar items</h2>
        <section className="sameProductsContainer">
          {sameProductsByCategory?.map(
            (product) =>
              product.id !== idProduct.id && (
                <Link
                  className="link"
                  key={product.id}
                  to={`/productInfo/${product.id}`}
                >
                  <div className="card">
                    <div className="card__imgContainer">
                      <img src={product?.productImgs} alt={product?.title} />
                    </div>
                    <hr className="breakSec" />
                    <div className="card__info">
                      <h3>{product?.title}</h3>
                      <p>
                        Prirce <span> {`$${product?.price}`} </span>{" "}
                      </p>
                    </div>
                  </div>
                </Link>
              )
          )}
        </section>
      </div>
    </AnimateComponent>
  );
};

export default ProductInfo;
