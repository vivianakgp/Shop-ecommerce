import axios from 'axios';

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const loginThunk = credentials => {
    //return a fn
    return () => {
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
        
    }
}

export const cartThunk = () => {
    return dispatch => {
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
    }
}
export const getCartThunk = () => {
    return dispatch =>  {
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
            .then(res => console.log(res.data.data.cart))
    }
}
