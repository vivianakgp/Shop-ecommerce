import './styles/App.css';
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
  return (
    <div className="App">
      <Menu />
      <HashRouter>
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/productInfo/:id' element={ <ProductInfo/> } />
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
