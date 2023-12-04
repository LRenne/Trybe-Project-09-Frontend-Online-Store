import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    cart: [],
  }

  componentDidMount() {
    this.setCart();
  }

  setCart = () => {
    const stateCart = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      cart: stateCart,
    });
  };

  removeCartItem = (target) => target.parentNode.parentNode.remove();

  addProduct = (eachProduct) => {
    const { cart } = this.state;
    this.setState({
      cart: [...cart, eachProduct],
    }, () => {
      eachProduct.quantity += 1;
      const set = new Set(cart);
      const stateCart = [...set];
      this.setState({
        cart: stateCart,
      });
    });
  }

  subtractProduct = (eachProduct) => {
    const { cart } = this.state;
    this.setState({
      cart: [...cart, eachProduct],
    }, () => {
      if (eachProduct.quantity !== 1) {
        eachProduct.quantity -= 1;
      }
      const set = new Set(cart);
      const stateCart = [...set];
      this.setState({
        cart: stateCart,
      });
    });
  }

  render() {
    const { cart } = this.state;
    const { addProduct, subtractProduct, removeCartItem } = this;
    const set = new Set(cart);
    const stateCart = [...set];
    function buildCart() {
      if (stateCart && stateCart.length > 0) {
        return stateCart.reverse().map((eachProduct) => {
          const { id, title, thumbnail } = eachProduct;
          let { quantity, price } = eachProduct;
          quantity = eachProduct.quantity;
          const priceNovo = price;
          price = (priceNovo * quantity);
          return (
            <div id={ id } key={ id }>
              <h3 data-testid="shopping-cart-product-name">{title}</h3>
              <img src={ thumbnail } alt={ id } />
              <p>{price}</p>
              <p data-testid="shopping-cart-product-quantity">
                { quantity }
              </p>
              <div className="cart-product-quantity-container">

                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => subtractProduct(eachProduct) }
                >
                  -
                </button>

                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  onClick={ () => addProduct(eachProduct) }
                >
                  +
                </button>

                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ ({ target }) => removeCartItem(target) }
                >
                  x
                </button>
              </div>
            </div>

          );
        });
      }
      return (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      );
    }

    return (
      <div>
        { buildCart() }
      </div>
    );
  }
}
