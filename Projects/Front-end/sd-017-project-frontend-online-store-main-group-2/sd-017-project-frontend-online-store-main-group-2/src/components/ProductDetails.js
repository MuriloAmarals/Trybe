import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

let storageItem = [];
class Productdetails extends Component {
  constructor() {
    super();
    this.state = {
      item: {},
      email: '',
      rating: '',
      evaluation: '',
      comments: [],
      cart: 0,
    };
    this.fetchItem = this.fetchItem.bind(this);
    this.fetchCart = this.fetchCart.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getLocal = this.getLocal.bind(this);
  }

  componentDidMount() {
    this.fetchItem();
    this.getLocal();
    this.fetchCart();
  }

  handleClick() {
    const { item } = this.state;
    storageItem = [...storageItem, item];
    localStorage.setItem('shoppingCart', JSON.stringify(storageItem));
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { email, rating, evaluation, comments } = this.state;
    const object = { email, rating, evaluation };
    const allComments = [...comments, object];
    this.setState({
      comments: allComments,
      email: '',
      rating: '',
      evaluation: '',
    }, () => localStorage.setItem('evaluation', JSON.stringify(allComments)));
  }

  getLocal() {
    const storage = JSON.parse(localStorage.getItem('evaluation'));
    if (storage) {
      this.setState({
        comments: storage,
      });
    }
  }

  async fetchItem() {
    const { match: { params: { id } } } = this.props;
    const itemApi = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await itemApi.json();
    this.setState({ item: data });
  }

  fetchCart() {
    const getItems = JSON.parse(localStorage.getItem('shoppingCart'));
    this.setState({ cart: getItems ? getItems.length : 0 });
  }

  render() {
    const { item, email, evaluation, rating, comments, cart } = this.state;
    return (
      <div>
        <span data-testid="shopping-cart-size">{ cart }</span>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <p data-testid="product-detail-name">{item.title}</p>
        <img src={ item.thumbnail } alt={ item.title } />
        <p>{item.price}</p>
        <button
          id={ item.id }
          onClick={ this.handleClick }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <div>
          <label htmlFor={ item.id }>
            Email
            <input
              type="email"
              id={ item.id }
              name="email"
              data-testid="product-detail-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="1-rating">
            1
            <input
              type="radio"
              id="1-rating"
              data-testid="1-rating"
              name="rating"
              value="1"
              onChange={ this.handleChange }
              checked={ rating === '1' }
            />
          </label>
          <label htmlFor="2-rating">
            2
            <input
              type="radio"
              id="2-rating"
              data-testid="2-rating"
              name="rating"
              value="2"
              onChange={ this.handleChange }
              checked={ rating === '2' }
            />
          </label>
          <label htmlFor="3-rating">
            3
            <input
              type="radio"
              id="3-rating"
              data-testid="3-rating"
              name="rating"
              value="3"
              onChange={ this.handleChange }
              checked={ rating === '3' }
            />
          </label>
          <label htmlFor="4-rating">
            4
            <input
              type="radio"
              id="4-rating"
              data-testid="4-rating"
              name="rating"
              value="4"
              onChange={ this.handleChange }
              checked={ rating === '4' }
            />
          </label>
          <label htmlFor="5-rating">
            5
            <input
              type="radio"
              id="5-rating"
              data-testid="5-rating"
              name="rating"
              value="5"
              onChange={ this.handleChange }
              checked={ rating === '5' }
            />
          </label>
          <label htmlFor="evaluation">
            Avaliação
            <textarea
              id="evaluation"
              name="evaluation"
              rows="4"
              cols="50"
              data-testid="product-detail-evaluation"
              value={ evaluation }
              onChange={ this.handleChange }
            />
          </label>
          <button
            id="submit"
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleSubmit }
          >
            Enviar
          </button>
        </div>
        {comments.map((comment) => (
          <div key={ comment.email }>
            <p>{comment.email}</p>
            <p>{comment.rating}</p>
            <p>{comment.evaluation}</p>
          </div>
        ))}
      </div>
    );
  }
}

Productdetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Productdetails;
