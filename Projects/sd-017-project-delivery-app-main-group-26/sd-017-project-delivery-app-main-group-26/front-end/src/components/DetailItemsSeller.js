import PropTypes from 'prop-types';

export default function DetailItemSeller({ item: {
  name,
  SalesProduct: { quantity },
  price,
}, i }) {
  const totalPrice = () => {
    const total = (Number(price) * quantity).toFixed(2);
    const comma = total.toString().replace('.', ',');
    return comma;
  };

  return (
    <tr>
      <td data-testid={ `seller_order_details__element-order-table-item-number-${i}` }>
        { i + 1 }
      </td>
      <td data-testid={ `seller_order_details__element-order-table-name-${i}` }>
        { name }
      </td>
      <td data-testid={ `seller_order_details__element-order-table-quantity-${i}` }>
        { quantity }
      </td>
      <td data-testid={ `seller_order_details__element-order-table-unit-price-${i}` }>
        { price.replace('.', ',') }
      </td>
      <td data-testid={ `seller_order_details__element-order-table-sub-total-${i}` }>
        { totalPrice() }
      </td>
    </tr>
  );
}

DetailItemSeller.propTypes = {
  item: PropTypes.obj,
  i: PropTypes.number,
}.isRequired;
