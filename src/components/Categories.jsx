import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, showCategories } from '../services/api';
import addItemToCart from '../util';

export default class Categories extends Component {
  state = {
    categoriesArray: [],
    productByCategory: [],
  }

  componentDidMount() {
    this.setState(async () => {
      const saveCategories = await getCategories();
      return this.setState({ categoriesArray: saveCategories });
    });
  }

  handleClick = async ({ target }) => {
    const { id } = target;
    const categorieId = await showCategories(id);
    const { results } = await categorieId;
    return this.setState({ productByCategory: results });
  }

  render() {
    const { categoriesArray, productByCategory } = this.state;
    return (

      <form>
        <h3>Categorias</h3>
        <ul>
          {categoriesArray.map((category) => (
            <li key={ category.id }>
              <button
                type="button"
                data-testid="category"
                id={ category.id }
                onClick={ this.handleClick }
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
        {productByCategory.map(({ id,
          title,
          thumbnail,
          price,
          shipping: { free_shipping: freeShipping },
        }) => (
          <li
            key={ id }
            data-testid="product"
          >
            <p>{ title }</p>
            <img alt="imagem" src={ thumbnail } />
            <p>{ `Preço: ${price}` }</p>
            { freeShipping
            && <h3 data-testid="free-shipping">Produto com frete grátis</h3>}
            <Link
              data-testid="product-detail-link"
              to={ `/ProductDetails/${id}` }
            >
              Detalhes do Produto

            </Link>
            <button
              type="button"
              data-testid="product-add-to-cart"
              onClick={ () => addItemToCart(id, title, thumbnail, price) }
            >
              Add to Cart
            </button>
          </li>
        ))}
      </form>
    );
  }
}
