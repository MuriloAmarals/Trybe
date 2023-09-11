import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../contexts/AppContext';
import DetailItem from './DetailItems';
import DetailItemSeller from './DetailItemsSeller';

export default function DetailTable({ seller }) {
  const { order } = useContext(AppContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((item, i) => {
          if (seller) return <DetailItemSeller key={ item.id } item={ item } i={ i } />;
          return <DetailItem key={ item.id } item={ item } i={ i } />;
        })}
      </tbody>
    </table>
  );
}

DetailTable.propTypes = {
  seller: PropTypes.bool,
}.isRequired;
