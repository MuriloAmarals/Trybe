import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNav from '../components/CustomNav';
import SellerOrder from '../components/SellerOrder';
import api from '../service/api';

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const getOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role !== 'seller') navigate('/login');
    try {
      const { data } = await api.get(`/sale/orders/${user.id}`, {
        headers: { Authorization: user.token },
      });
      setOrders(data);
    } catch (error) {
      console.error(error);
      if (error.message.includes('401')) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section>
      <header>
        <CustomNav />
      </header>
      <main>
        {orders.map((order) => <SellerOrder key={ order.id } order={ order } />)}
      </main>
    </section>
  );
}
