import axios from 'axios';
const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1';
export const actions = {
    setProductsCart: "SET_PRODUCTSCART"
}

// getConfig to access the token with axios
const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const loginThunk = credentials => {
    //return a fn
    return () => {
        return axios.post(`${URL}/users/login`, credentials)
        
    }
};
export const addProductToCartThunk = product => {
    //return a fn
    return () => {
        return axios.post(`${URL}/cart`, product , getConfig())
        .then(()=> console.log(`added ${product.quantity} product with id: ${product.id}`))
        .catch(()=>console.log(localStorage.getItem('token')))
        
    }
};
export const setProductsCart = productsCart =>( {
    type: actions.setProductsCart,
    payload: productsCart
})

// export const cartThunk = () => {
//     return () => {
//         return axios.get(`${URL}/cart`, getConfig())
//     }
// }
export const getCartThunk = () => {
    return dispatch =>  {
        return axios.get(`${URL}/cart`, getConfig())
            .then(res => dispatch(setProductsCart(res.data.data.cart.products)))
    }
}
export const deletCartThunk = id =>{
    return dispatch => {
        return axios.delete(`${URL}/cart/${id}`, getConfig() )
            .then( () => dispatch(getCartThunk()) )
    }
}

export const updateCartThunk = () => {
    return dispatch => {
<<<<<<< HEAD
        return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases/`, getConfig())
=======
        return axios.post(`${URL}/purchases`, {}, getConfig())
>>>>>>> 0c4df3ce21be526a70fc446d5182bdc65e59f56b
            .then( () => dispatch(getCartThunk()) )
    }
}