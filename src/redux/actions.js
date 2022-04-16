import axios from 'axios';

export const loginThunk = credentials => {
    //return a fn
    return () => {
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
        
    }
}