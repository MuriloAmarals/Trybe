import React, { Component } from 'react';
import CartItem from './CartItem';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
    this.getPrices = this.getPrices.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getPrices();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  getPrices() {
    const getItems = JSON.parse(localStorage.getItem('shoppingCart'));
    const prices = getItems.map((element) => element.price);
    const totalPrice = prices
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    this.setState({ totalPrice });
  }

  render() {
    const { totalPrice, fullname, email, cpf, phone, cep, address } = this.state;
    const getItems = JSON.parse(localStorage.getItem('shoppingCart'));
    return (
      <div>
        <p>{ totalPrice }</p>
        {(getItems && getItems.map((element) => (
          <CartItem item={ element } key={ element.id } />
        )))}
        <div>
          <label htmlFor="fullname">
            Nome Completo
            <input
              type="text"
              id="fullname"
              name="fullname"
              data-testid="checkout-fullname"
              value={ fullname }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              name="email"
              data-testid="checkout-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              type="text"
              id="cpf"
              name="cpf"
              data-testid="checkout-cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="phone">
            Telefone
            <input
              type="tel"
              id="phone"
              name="phone"
              data-testid="checkout-phone"
              value={ phone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep">
            CEP
            <input
              type="text"
              id="cep"
              name="cep"
              data-testid="checkout-cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              id="address"
              name="address"
              data-testid="checkout-address"
              value={ address }
              onChange={ this.handleChange }
            />
          </label>
        </div>
      </div>
    );
  }
}
