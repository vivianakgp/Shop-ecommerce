import './styles/App.css';
// react router
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';
// import compinents
import ProductsList from './components/ProductList';


function App() {
  return (
    <div className="App">
      <HashRouter>
      <Routes>
        <Route path='/' element={<ProductsList />} />
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
