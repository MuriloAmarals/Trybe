import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function Order({ order: {
  id,
  status,
  saleDate,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
} }) {
  const navigate = useNavigate();

  const handleOrderDetail = () => {
    navigate(`/seller/orders/${id}`);
  };

  return (
    <button type="button" onClick={ handleOrderDetail }>
      <p data-testid={ `seller_orders__element-order-id-${id}` }>
        { id }
      </p>
      <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
        { status }
      </p>
      <p data-testid={ `seller_orders__element-order-date-${id}` }>
        { moment(saleDate).locale('pt-br').format('L') }
      </p>
      <p data-testid={ `seller_orders__element-card-price-${id}` }>
        { totalPrice.replace('.', ',') }
      </p>
      <p data-testid={ `seller_orders__element-card-address-${id}` }>
        { `${deliveryAddress}, ${deliveryNumber}` }
      </p>
    </button>
  );
}

Order.propTypes = {
  order: PropTypes.obj,
}.isRequired;
