import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState();
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getProducts = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      try {
        const { data } = await api.get('/customer/products', {
          headers: { Authorization: user.token },
        });
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTotal = () => {
    const subtotal = cart.reduce((acc, curr) => (acc + curr.totalPrice), 0).toFixed(2);
    const comma = subtotal.toString().replace('.', ',');
    return comma;
  };

  const handleUserCheck = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      try {
        const { data } = await api.get('/login/validate', {
          headers: { Authorization: user.token },
        });
        if (data.role === 'customer') navigate('/customer/products');
        if (data.role === 'seller') navigate('/seller/orders');
        if (data.role === 'administrator') navigate('/admin/manage');
      } catch (error) {
        console.log(error);
        if (error.message.includes('401')) localStorage.removeItem('user');
      }
    }
  };

  const handleOrder = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await api.get(`/sale/${id}`, {
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

  const handleUsers = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const { data } = await api.get('/users', {
        headers: { Authorization: user.token },
      });
      if (data) setUsers(data);
    } catch (error) {
      console.log(error);
      if (error.message.includes('401')) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  const value = useMemo(() => ({
    products,
    setProducts,
    cart,
    setCart,
    getProducts,
    handleTotal,
    handleUserCheck,
    order,
    handleOrder,
    setOrder,
    users,
    setUsers,
    handleUsers,
  }), [products, cart, order, users]);

  return (
    <AppContext.Provider
      value={ value }
    >
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.obj,
}.isRequired;
