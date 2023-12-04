import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: 0,
    id: '',
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const resultDetails = await fetchProductById(id);
    const { title, thumbnail, price } = resultDetails;
    return this.setState({ title, thumbnail, price });
  }

  render() {
    const { title, thumbnail, price, id } = this.state;
    const { funcAdd } = this.props;
    return (
      <div>
        <p
          data-testid="product-detail-name"
        >
          { title }
        </p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />

        <p data-testid="product-detail-price">{ price }</p>

        <Link
          to="/Cart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => funcAdd(id, title, thumbnail, price) }
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  funcAdd: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }) }),
}.isRequired;
export default ProductDetails;
