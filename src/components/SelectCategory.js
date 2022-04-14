import React, { useEffect, useState }from 'react';
import axios from 'axios';



const SelectBox = ({setProducts}) => {
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res => setCategories(res.data.data.categories))
    },[]);
    const filterProducts = e => {
        e.preventDefault();
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${e.target.value}`)
        .then(res => setProducts(res.data.data.products))
    }
    // selected disabled
    return (
        <div className='selectBox'>
            <select onChange={filterProducts}>
                <option >category</option>
                {
                    categories?.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                }
            </select>

        </div>
    )

}
export default SelectBox;