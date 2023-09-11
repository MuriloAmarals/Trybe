import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';
import CustomNav from '../components/CustomNav';
import DetailTable from '../components/DetailTable';
import { AppContext } from '../contexts/AppContext';
import api from '../service/api';

const TESTID_DATE = 'seller_order_details__element-order-details-label-order-date';
const TESTID_STATUS = 'seller_order_details__element-order-details-label-delivery-status';

export default function SellerOrderDetailPage() {
  const { handleOrder, order, setOrder } = useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleOrder(id);
  }, []);

  const handlePrep = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await api.put(`/sale/update/${id}`, { status: 'Preparando' }, {
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

  const handleDispatch = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await api.put(`/sale/update/${id}`, { status: 'Em Trânsito' }, {
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
                data-testid="seller_order_details__element-order-details-label-order-id"
              >
                Pedido
                { order.id }
              </p>
              <p data-testid={ TESTID_DATE }>
                { moment(order.saleDate).locale('pt-br').format('L') }
              </p>
              <p data-testid={ TESTID_STATUS }>
                { order.status }
              </p>
              <button
                type="button"
                data-testid="seller_order_details__button-preparing-check"
                disabled={ order.status !== 'Pendente' }
                onClick={ handlePrep }
              >
                Em Preparo
              </button>
              <button
                type="button"
                data-testid="seller_order_details__button-dispatch-check"
                disabled={ order.status !== 'Preparando' }
                onClick={ handleDispatch }
              >
                Saiu para Entrega
              </button>
            </div>
            <DetailTable seller />
            <p data-testid="seller_order_details__element-order-total-price">
              { order.totalPrice.replace('.', ',') }
            </p>
          </section>)}
      </main>
    </section>
  );
}
