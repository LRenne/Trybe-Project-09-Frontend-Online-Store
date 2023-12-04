const addItemToCart = async (id, title, thumbnail, price) => {
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

export default addItemToCart;
