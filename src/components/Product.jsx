import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import addItemToCart from '../util';

class Product extends Component {
  render() {
    const { name, img, price, id } = this.props;
    return (
      <div data-testid="product">
        <p>{ name }</p>
        <img alt="imagem" src={ img } />
        <p>{ price }</p>
        <Link
          data-testid="product-detail-link"
          to={ `/ProductDetails/${id}` }
        >
          Detalhes do Produto

        </Link>

        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addItemToCart(id, name, img, price) }
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
};

export default Product;
