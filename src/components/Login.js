import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../redux/actions';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
// external libraries
import { motion } from 'framer-motion';
import swal from '@sweetalert/with-react';

import '../styles/Login.css';
import user from '../images/user1.png';


const Login = ({ setIsLoginOpen }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch();
    const closeModal = () => {
        setIsLoginOpen(false)
        setEmail('')
        setPassword('')
    };
    const successLoginModal = () => {
        swal({
            title: "Successful Login!",
            icon: "success",
            buttons: false,
            timer: 3000,
        });
    };
    const login = e =>{
        e.preventDefault();
        // console.log({email, password})
        const credentials = {email, password}
        dispatch(loginThunk(credentials))
        .then(res => {
            // console.log(res.data);
            localStorage.setItem('token', res.data.data.token)
        })  
        .then(()=>closeModal())
        .then(()=>successLoginModal())
    };
    // animation obj
    const dropIn = {
        hidden: { y: "-100vh", opacity: 0,},
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
    return (
        <div className="Login">
            <motion.form 
            className="Form" 
            onSubmit={login} 
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <button className="close"
                onClick={()=>setIsLoginOpen(false)}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <div className="imgContainer"><img src={user} alt="userProfile"/></div>
                <span className="testDataContainer">
                    <h3>Test Data</h3>
                    <p><FontAwesomeIcon icon={faEnvelope}/> john@gmail.com</p>
                    <p><FontAwesomeIcon icon={faLock}/> john1234</p>
                </span>
                <label htmlForm="email">Email</label>
                <input type="email"
                id="email"
                value={email} onChange={e => setEmail(e.target.value)}
                />
                <label htmlForm="pass">Password</label>
                <input type="password"
                id="pass"
                value={password} onChange={e => setPassword(e.target.value)}  
                />
                <button className="loginBtn">Login</button>
            </motion.form>
        </div>
    )
};

export default Login;