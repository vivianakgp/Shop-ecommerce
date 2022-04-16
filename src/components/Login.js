import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../redux/actions';
import swal from '@sweetalert/with-react';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';


import '../styles/Login.css';
import user from '../images/user1.png'


const Login = ({setIsLoginOpen}) => {
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
            // button: "Aww yiss!",
            buttons: false,
            timer: 3000,
        });

    }
    const login = e =>{
        e.preventDefault()
        console.log({email, password})
        const credentials = {email, password}
        dispatch(loginThunk(credentials))
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.data.token)
        })
        .then(()=>closeModal())
        .then(()=>successLoginModal())
    };
    return (
        <div className="Login">
            <form className="Form" onSubmit={login}>
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
            </form>
        </div>
    )
};

export default Login;
