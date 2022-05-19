import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/actions";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
// external libraries
import swal from "@sweetalert/with-react";
import "../styles/Login.css";

const Login = ({ setIsModalUserOpen, openModalCreateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsModalUserOpen(false);
    setEmail("");
    setPassword("");
  };
  const logOut = () => {
    localStorage.setItem("token", "");
    closeModal();
    swal({
      icon: "success",
      buttons: false,
      timer: 2000,
    });
  };
  const successLoginModal = () => {
    swal({
      title: "Successful Login!",
      icon: "success",
      buttons: false,
      timer: 3000,
    });
  };

  const login = (e) => {
    e.preventDefault();
    // console.log({email, password})
    const credentials = { email, password };
    dispatch(loginThunk(credentials))
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("token", res.data.data.token);
      })
      .then(() => {
        closeModal();
        successLoginModal();
      })
      .catch(() => {
        setLoginError("Email or password are invalid!");
        setTimeout(() => {
          setLoginError("");
        }, 4000);
      });
    // .catch(err => setLoginError(err.response.data.detail))
  };

  return (
    <form className="form" onSubmit={login}>
      {localStorage.getItem("token") ? (
        <button className="formBtn" onClick={logOut}>
          Log out
        </button>
      ) : (
        <>
          <span className="testDataContainer">
            <h3>Test Data</h3>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> john@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faLock} /> john1234
            </p>
          </span>
          <label htmlform="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlform="pass">Password</label>
          <input
            type="password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="formBtn">Login</button>
          <p style={{ color: "#F85555", textAlign: "center" }}>{loginError}</p>
          <p
            style={{ textDecoration: "underline", color: "blue" }}
            onClick={openModalCreateUser}
          >
            create an account
          </p>
        </>
      )}
    </form>
  );
};

export default Login;
