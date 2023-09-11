import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.handleDecrease = this.handleDecrease.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
  }

  handleDecrease() {
    const { quantity } = this.state;
    if (quantity !== 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  }

  handleIncrease() {
    const { item } = this.props;
    const { quantity } = this.state;
    if (quantity !== item.available_quantity) {
      this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
    }
  }

  render() {
    const { item } = this.props;
    const { quantity } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-product-name">{ item.title }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.handleDecrease }
        >
          -
        </button>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.handleIncrease }
        >
          +
        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};
