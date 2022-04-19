import './styles/App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
// react router
import {
  Routes,
  Route,
  useLocation
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
  const location = useLocation();
  console.log(location)
  return (
    <div className="App">
      <Menu />
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path='/' element={<ProductsList Products={Products} setProducts={setProducts}/>} />
          <Route path='/productInfo/:id' element={ <ProductInfo Products={Products}/> } /> 
        </Routes>
      </AnimatePresence>
    </div>
  );
}
export default App;

{/* <HashRouter ></HashRouter> */}
