import React, { useEffect, useState }from 'react';
import axios from 'axios';
import '../styles/SelectCategory.css';


const SelectBox = ({ setProducts }) => {
    const [ categories, setCategories ] = useState([]);
    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res => setCategories(res.data.data.categories))
    },[]);
    // console.log(categories)
    const filterProducts = e => {
        e.preventDefault();
        // console.log(e.target.value)
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${e.target.value}`)
        .then(res => setProducts(res.data.data.products))
    };
    return (
        <div className='selectBox'> 
                    <button>
                        Category
                        <ul>
                        {
                        categories?.map(category => (
                            <li key={category.id} value={category.id} onClick={filterProducts}>{category.name}</li>
                        ))
                        }
                        </ul>
                    </button>
        </div>
    )
}
export default SelectBox;
