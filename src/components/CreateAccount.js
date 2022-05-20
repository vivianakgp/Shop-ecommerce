import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccountThunk } from "../redux/actions";
// external libraries
import swal from "@sweetalert/with-react";
import "../styles/Login.css";

const CreateAccount = ({ setIsModalUserOpen }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [createAccountError, setCreateAccountError] = useState("");

  const dispatch = useDispatch();
  const closeModal = () => {
    setIsModalUserOpen(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };
  const successCreateAccountModal = () => {
    swal({
      title: "created account",
      icon: "success",
      buttons: false,
      timer: 3000,
    });
  };

  const createAccount = (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      phone,
      role: "user",
    };
    // console.log(newUser);
    dispatch(createAccountThunk(newUser))
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        closeModal();
      })
      .then(() => successCreateAccountModal())
      .catch((err) => {
        // console.log(err);
        setCreateAccountError("Error");
      });
  };
  return (
    <form className="form" onSubmit={createAccount}>
      <label htmlform="name">Name</label>
      <input
        type="text"
        id="name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlform="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlform="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlform="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlform="phone">Phone</label>
      <input
        type="number"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="formBtn">Create Account</button>
      <p style={{ color: "#F85555", textAlign: "center" }}>
        {createAccountError}
      </p>
    </form>
  );
};

export default CreateAccount;
