import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import CustomNav from '../components/CustomNav';
import { AppContext } from '../contexts/AppContext';

const MAX_CARDS = 11;

export default function CustomerProductsPage() {
  const {
    products,
    getProducts,
    cart,
    handleTotal,
    handleUserCheck,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    handleUserCheck();
    getProducts();
  }, []);

  const checkout = () => {
    if (cart.length > 0) {
      navigate('/customer/checkout');
    }
  };

  return (
    <section>
      <header>
        <CustomNav />
      </header>
      <main>
        {products.map((product, i) => (i <= MAX_CARDS)
          && (<Card key={ product.id } product={ product } />))}
        <button
          type="button"
          onClick={ checkout }
          data-testid="customer_products__button-cart"
          disabled={ cart.length === 0 }
        >
          Ver carrinho
          { cart.length > 0 && ': R$ ' }
          <span data-testid="customer_products__checkout-bottom-value">
            { cart.length > 0 && handleTotal() }
          </span>
        </button>
      </main>
    </section>
  );
}
