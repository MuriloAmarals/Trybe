import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import ShoppingCart from './components/ShoppingCart';
import Productdetails from './components/ProductDetails';
import Checkout from './components/Checkout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route path="/checkout" component={ Checkout } />
          <Route path="/:id" component={ Productdetails } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
