import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

class ShoppingCart extends Component {
  render() {
    const getItems = JSON.parse(localStorage.getItem('shoppingCart'));
    return (
      <>
        <div>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          <Link to="/checkout" data-testid="checkout-products">
            Finalizar Compra
          </Link>
        </div>
        {(getItems && getItems.map((element) => (
          <CartItem item={ element } key={ element.id } />
        )))}
      </>
    );
  }
}

export default ShoppingCart;
