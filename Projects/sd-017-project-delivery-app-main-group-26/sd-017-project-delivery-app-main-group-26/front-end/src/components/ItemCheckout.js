import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../contexts/AppContext';

export default function ItemCheckout({ item: { id, name, qtd, price, totalPrice }, i }) {
  const { setCart } = useContext(AppContext);

  const handleRemove = () => {
    setCart((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <tr>
      <td data-testid={ `customer_checkout__element-order-table-item-number-${i}` }>
        { i + 1 }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${i}` }>
        { name }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-quantity-${i}` }>
        { qtd }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }>
        { price.replace('.', ',') }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }>
        { Number(totalPrice).toFixed(2).toString().replace('.', ',') }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-remove-${i}` }>
        <button type="button" onClick={ handleRemove }>
          Remover
        </button>
      </td>
    </tr>
  );
}

ItemCheckout.propTypes = {
  item: PropTypes.obj,
  i: PropTypes.number,
}.isRequired;
