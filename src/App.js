import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import './App.css';
import ProductDetails from './pages/ProductDetails';

export default class App extends Component {
  addItemToCart = async (id, title, thumbnail, price) => {
    /* Adding the item to the cart. */
    const items = { id, title, thumbnail, price, quantity: 1 };
    const localCart = JSON.parse(localStorage.getItem('cart'));
    let cart = [];
    cart.forEach((checkItemOnCart, index) => {
      if (checkItemOnCart.id === items.id) cart[index].quantity += 1;
    });
    if (localCart) {
      cart = [items, ...localCart];
      console.log(cart);
      if (localCart.some((comparetoItem) => comparetoItem.id === items.id)) {
        cart = localCart;
      } localStorage.setItem('cart', JSON.stringify(cart));
    } else localStorage.setItem('cart', JSON.stringify([items]));
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/Cart" component={ Cart } />
            <Route
              exact
              path="/productdetails/:id"
              render={ (props) => (
                <ProductDetails
                  { ...props }
                  funcAdd={ this.addItemToCart }
                />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
