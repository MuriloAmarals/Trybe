import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNav from '../components/CustomNav';
import ItemsTable from '../components/ItemsTable';
import { AppContext } from '../contexts/AppContext';
import api from '../service/api';

export default function CustomerCheckoutPage() {
  const { handleTotal, setCart, cart } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const navigate = useNavigate();

  const handleSellers = async () => {
    try {
      const { data } = await api.get('/catch/seller');
      setSellers(data);
      setSellerId(data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSellers();
  }, []);

  const handleOrderSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const products = cart.map((item) => ({ id: item.id, quantity: item.qtd }));
    const totalPrice = handleTotal();
    try {
      const { data } = await api.post('/sales', {
        products,
        totalPrice: Number(totalPrice.replace(',', '.')),
        userId: user.id,
        deliveryAddress,
        deliveryNumber,
        sellerId,
      }, { headers: { Authorization: user.token } });
      setCart([]);
      navigate(`/customer/orders/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <header>
        <CustomNav />
      </header>

      <h2>Finalizar Pedido</h2>
      <main>
        <ItemsTable />
        <p data-testid="customer_checkout__element-order-total-price">
          { handleTotal() }
        </p>
      </main>

      <h2>Detalhes e Endereço para Entrega</h2>
      <footer>
        <label htmlFor="seller-input">
          Selecione o vendedor
          <select
            name="seller-input"
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target }) => setSellerId(target.value) }
          >
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{ seller.name }</option>
            ))}
          </select>
        </label>

        <label htmlFor="shipping-input">
          Endereço
          <input
            type="text"
            name="shipping-input"
            data-testid="customer_checkout__input-address"
            value={ deliveryAddress }
            onChange={ ({ target }) => setDeliveryAddress(target.value) }
          />
        </label>

        <label htmlFor="shipping-number-input">
          Número
          <input
            type="text"
            name="shipping-number"
            data-testid="customer_checkout__input-addressNumber"
            value={ deliveryNumber }
            onChange={ ({ target }) => setDeliveryNumber(target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleOrderSubmit }
        >
          Finalizar Pedido
        </button>
      </footer>
    </section>
  );
}
