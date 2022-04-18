import './styles/App.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
// react router
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';
// import components
import Menu from './components/Menu'
import ProductsList from './pages/ProductsList';
import ProductInfo from './pages/ProductInfo';


function App() {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
      axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
          .then(res => setProducts(res.data.data.products))
  }, []);
  return (
    <div className="App">
      <Menu />
      <HashRouter>
      <Routes>
        <Route path='/' element={<ProductsList Products={Products} setProducts={setProducts}/>} />
        <Route path='/productInfo/:id' element={ <ProductInfo Products={Products}/> } />
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
