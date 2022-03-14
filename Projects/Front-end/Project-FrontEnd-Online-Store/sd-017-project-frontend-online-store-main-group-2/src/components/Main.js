import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import SearchProducts from './SearchProducts';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      searchProducts: [],
      endPoint: '',
      category: '',
      cart: 0,
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchCart = this.fetchCart.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.categoriesSelection = this.categoriesSelection.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchCart();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { endPoint } = this.state;
    const productAPI = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${endPoint}`,
    );
    const data = await productAPI.json();
    this.setState({ searchProducts: data.results });
  }

  async fetchCategories() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  fetchCart() {
    const getItems = JSON.parse(localStorage.getItem('shoppingCart'));
    this.setState({ cart: getItems ? getItems.length : 0 });
  }

  categoriesSelection(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, async () => {
      const { endPoint, category } = this.state;
      if (!endPoint) {
        const categoriesByItem = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}`);
        const data = await categoriesByItem.json();
        this.setState({ searchProducts: data.results });
      } else {
        const data = await getProductsFromCategoryAndQuery(category, endPoint);
        this.setState({ searchProducts: data.results });
      }
    });
  }

  render() {
    const { categories, endPoint, searchProducts, cart } = this.state;
    return (
      <div>
        <span data-testid="shopping-cart-size">{ cart }</span>
        <input
          name="endPoint"
          value={ endPoint }
          type="text"
          placeholder="Search"
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Search
        </button>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        {searchProducts.map((value) => (
          <SearchProducts value={ value } key={ value.id } fetchCart={ this.fetchCart } />
        ))}
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        {categories.map((value) => (
          <label htmlFor={ value.id } data-testid="category" key={ value.id }>
            <input
              type="radio"
              id={ value.id }
              name="category"
              onClick={ this.categoriesSelection }
              value={ value.id }
            />
            {value.name}
          </label>
        ))}
      </div>
    );
  }
}

export default Main;
