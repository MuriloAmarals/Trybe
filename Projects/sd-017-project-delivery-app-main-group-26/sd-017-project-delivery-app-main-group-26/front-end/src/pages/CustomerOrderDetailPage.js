import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';
import CustomNav from '../components/CustomNav';
import DetailTable from '../components/DetailTable';
import { AppContext } from '../contexts/AppContext';
import api from '../service/api';

const TESTID_SELLER = 'customer_order_details__element-order-details-label-seller-name';
const TESTID_DATE = 'customer_order_details__element-order-details-label-order-date';
const TESTID_STATUS = 'customer_order_details__element-'
  + 'order-details-label-delivery-status';

export default function CustomerOrderDetailPage() {
  const { handleOrder, order, setOrder } = useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleOrder(id);
  }, []);

  const handleDelivery = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await api.put(`/sale/update/${id}`, { status: 'Entregue' }, {
        headers: { Authorization: user.token },
      });
      if (data) setOrder(data);
    } catch (error) {
      console.log(error);
      if (error.message.includes('401')) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  return (
    <section>
      <header>
        <CustomNav />
      </header>
      <main>
        <h3>Detalhes do pedido</h3>
        {order && (
          <section>
            <div>
              <p
                data-testid="customer_order_details__element-order-details-label-order-id"
              >
                Pedido
                { order.id }
              </p>
              <p data-testid={ TESTID_SELLER }>
                Vendedor
                { order.seller.name }
              </p>
              <p data-testid={ TESTID_DATE }>
                { moment(order.saleDate).locale('pt-br').format('L') }
              </p>
              <p data-testid={ TESTID_STATUS }>
                { order.status }
              </p>
              <button
                type="button"
                data-testid="customer_order_details__button-delivery-check"
                disabled={ order.status !== 'Em Trânsito' }
                onClick={ handleDelivery }
              >
                Marcar como entregue
              </button>
            </div>
            <DetailTable />
            <p data-testid="customer_order_details__element-order-total-price">
              { order.totalPrice.replace('.', ',') }
            </p>
          </section>)}
      </main>
    </section>
  );
}
