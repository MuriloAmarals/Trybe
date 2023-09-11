import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNav from '../components/CustomNav';
import Order from '../components/Order';
import api from '../service/api';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const getOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await api.get(`/customer/orders/${user.id}`, {
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
        {orders.map((order) => <Order key={ order.id } order={ order } />)}
      </main>
    </section>
  );
}
