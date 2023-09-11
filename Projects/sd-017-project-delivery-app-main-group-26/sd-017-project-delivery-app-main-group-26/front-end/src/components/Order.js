import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function Order({ order: { id, status, saleDate, totalPrice } }) {
  const navigate = useNavigate();

  const handleOrderDetail = () => {
    navigate(`/customer/orders/${id}`);
  };

  return (
    <button type="button" onClick={ handleOrderDetail }>
      <p data-testid={ `customer_orders__element-order-id-${id}` }>
        { id }
      </p>
      <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
        { status }
      </p>
      <p data-testid={ `customer_orders__element-order-date-${id}` }>
        { moment(saleDate).locale('pt-br').format('L') }
      </p>
      <p data-testid={ `customer_orders__element-card-price-${id}` }>
        { totalPrice.replace('.', ',') }
      </p>
    </button>
  );
}

Order.propTypes = {
  order: PropTypes.obj,
}.isRequired;
