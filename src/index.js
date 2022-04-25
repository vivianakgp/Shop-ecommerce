import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

// redux
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
// Aquí importamos el reducer creado anteriormente
import rootReducer from './redux';
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}> {/* Aquí sólamente encerramos a <App/> */}
      <App />                {/* En el provider */}
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
