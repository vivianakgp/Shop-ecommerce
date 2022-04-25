import axios from 'axios';

export const actions = {
    setProductsCart: "SET_PRODUCTSCART"
}


const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const setProductsCart = productsCart =>( {
    type: actions.setProductsCart,
    payload: productsCart
} )

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
            .then(res => dispatch(setProductsCart(res.data.data.cart.products)))
    }
}
export const deletCartThunk = id =>{
    return dispatch => {
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig() )
            .then( () => dispatch(getCartThunk()) )
    }
}

export const updateCartThunk = () => {
    return dispatch => {
        return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases/`, getConfig())
            .then( () => dispatch(getCartThunk()) )
    }
}