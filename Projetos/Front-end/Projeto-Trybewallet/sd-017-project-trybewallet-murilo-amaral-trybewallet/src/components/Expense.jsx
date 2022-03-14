import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseToStore, requestAPI,
  somaTotal, exportCurrencies } from '../actions/index';

class Expense extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { importCurriencies } = this.props;
    importCurriencies();
  }

  // handler genérico
  handleInputs = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  clearInputs = () => {
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { getCurrency } = this.props;
    await getCurrency();
    const { addExpense, addSoma, expenses, exchangeRates } = this.props;
    const { value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      id: expenses,
      exchangeRates,
    };
    addExpense(expense);
    const convertValue = value * exchangeRates[currency].ask;
    addSoma(convertValue);
    this.clearInputs();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { coins } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor da despesa:
          <input
            data-testid="value-input"
            name="value"
            type="text"
            value={ value }
            onChange={ this.handleInputs }
          />
        </label>
        <label htmlFor="description">
          Descrição despesa:
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            type="text"
            onChange={ this.handleInputs }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            id="currency"
            onChange={ this.handleInputs }
          >
            { coins.map((coin) => (
              <option key={ coin } data-testid={ coin }>{ coin }</option>
            )) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleInputs }
            id="method"
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            type="number"
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleInputs }
            id="tag"
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          id="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (state) => dispatch(expenseToStore(state)),
  addSoma: (value) => dispatch(somaTotal(value)),
  getCurrency: () => dispatch(requestAPI()),
  importCurriencies: () => dispatch(exportCurrencies()),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses.length,
  coins: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
});

Expense.propTypes = {
  addExpense: Proptypes.func.isRequired,
  addSoma: Proptypes.func.isRequired,
  getCurrency: Proptypes.func.isRequired,
  expenses: Proptypes.number.isRequired,
  importCurriencies: Proptypes.func.isRequired,
  coins: Proptypes.node.isRequired,
  exchangeRates: Proptypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
