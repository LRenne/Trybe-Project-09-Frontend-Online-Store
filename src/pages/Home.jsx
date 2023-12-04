import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';

export default class Home extends Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
        <ProductList />
        <Link to="/Cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho de compra
          </button>
        </Link>
      </div>
    );
  }
}
