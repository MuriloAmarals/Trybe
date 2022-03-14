import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

let storageItem = [];
class SearchProducts extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { value, fetchCart } = this.props;
    storageItem = [...storageItem, value];
    localStorage.setItem('shoppingCart', JSON.stringify(storageItem));
    fetchCart();
  }

  render() {
    const { value: {
      title,
      thumbnail,
      price,
      id,
      shipping,
    } } = this.props;

    return (
      <>
        <Link to={ `./${id}` } data-testid="product-detail-link">
          <div data-testid="product">
            <p>{ title }</p>
            <img src={ thumbnail } alt="" />
            <p>{ price }</p>
            {(shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p>)}
          </div>
        </Link>
        <button
          id={ id }
          onClick={ this.handleClick }
          type="button"
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </>
    );
  }
}

SearchProducts.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchCart: PropTypes.func.isRequired,
};

export default SearchProducts;
