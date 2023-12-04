import React, { Component } from 'react';
import Product from './Product';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductList extends Component {
  state= {
    search: '',
    result: '',
    buttonDisabled: true,
  };

  buttonEnabled = () => {
    const { search } = this.state;
    const enableButton = search.length > 0;
    this.setState({ buttonDisabled: !enableButton });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.buttonEnabled();
    });
  }

  handleSubmit = async () => {
    const { search } = this.state;
    this.setState({
      result: '',
    }, async () => {
      const response = await getProductsFromCategoryAndQuery('', search);
      console.log(response.results);
      this.setState({
        result: response.results,
      });
    });
  }

  render() {
    const { search, buttonDisabled, result } = this.state;
    return (
      <section>
        <div>
          <input
            type="text"
            name="search"
            data-testid="query-input"
            value={ search }
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleSubmit }
            disabled={ buttonDisabled }
          >
            Pesquisa
          </button>
        </div>
        { result.length === 0 ? (
          <p id="not-found">Nenhum produto foi encontrado</p>
        ) : (
          result.map(({ id, title, thumbnail, price }) => (
            <Product
              key={ id }
              id={ id }
              name={ title }
              img={ thumbnail }
              price={ price }
            />
          ))
        )}
      </section>
    );
  }
}

export default ProductList;
