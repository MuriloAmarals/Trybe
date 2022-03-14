import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  constructor() {
    super();

    this.renderTable = this.renderTable.bind(this);
  }

  renderTable() {
    const { expenses } = this.props;
    return expenses.map((index) => {
      const {
        description,
        tag,
        method,
        value,
        currency,
        exchangeRates,
      } = index;
      const moeda = exchangeRates[currency].name.replace('/Real Brasileiro', '');
      const cambioUtilizado = exchangeRates[currency].ask;
      const valorConvertido = cambioUtilizado * value;

      return (
        <tr key={ index }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{Number(value).toFixed(2)}</td>
          <td>{moeda}</td>
          <td>{Number(cambioUtilizado).toFixed(2)}</td>
          <td>{Number(valorConvertido).toFixed(2)}</td>
          <td>Real</td>
          <td>X</td>
        </tr>
      );
    });
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {
            expenses.length !== 0 && this.renderTable()
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
