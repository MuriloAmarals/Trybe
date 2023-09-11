import { useContext } from 'react';
import ItemCheckout from './ItemCheckout';
import { AppContext } from '../contexts/AppContext';

export default function ItemsTable() {
  const { cart } = useContext(AppContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, i) => (
          <ItemCheckout key={ item.id } item={ item } i={ i } />
        ))}
      </tbody>
    </table>
  );
}
