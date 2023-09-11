import { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

export default function CustomNav() {
  const { setCart } = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setCart([]);
    navigate('/login');
  };

  return (
    <nav>
      {pathname.includes('customer') && (
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
      )}
      {pathname.includes('admin') ? (
        <Link
          to="/admin/manage"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Gerenciar Usuários
        </Link>
      ) : (
        <Link
          to={
            pathname.includes('customer')
              ? '/customer/orders'
              : '/seller/orders'
          }
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
      )}
      {user && (
        <h3 data-testid="customer_products__element-navbar-user-full-name">
          {user.name}
        </h3>
      )}
      <button
        type="button"
        onClick={ logout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </nav>
  );
}
