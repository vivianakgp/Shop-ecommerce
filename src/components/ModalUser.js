import React, { useState } from "react";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
//img
import user from "../images/user1.png";
// external libraries
import { motion } from "framer-motion";
//componets
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";
// eliminas estos estilos
import "../styles/ModalUser.css";

const ModalUser = ({ setIsModalUserOpen }) => {
  const [createNewUser, setcreateNewUser] = useState(false);

  // animation obj
  const dropIn = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: { y: "100vh", opacity: 0 },
  };
  const openModalCreateUser = () => {
    setcreateNewUser(true);
  };
  return (
    <motion.div
      className="modalUser"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="mainContainer">
        <button className="close" onClick={() => setIsModalUserOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="imgContainer">
          <img src={user} alt="userProfile" />
        </div>
        {createNewUser ? (
          <CreateAccount setIsModalUserOpen={setIsModalUserOpen} />
        ) : (
          <Login
            setIsModalUserOpen={setIsModalUserOpen}
            openModalCreateUser={openModalCreateUser}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ModalUser;
