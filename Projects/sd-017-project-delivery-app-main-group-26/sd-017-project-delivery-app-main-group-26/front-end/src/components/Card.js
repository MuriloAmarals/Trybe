import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../contexts/AppContext';

export default function Card({ product: { name, price, id, urlImage } }) {
  const { cart, setCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState(0);

  useEffect(() => {
    const thisProd = cart.find((item) => item.id === id);
    setProduct(thisProd);
    if (thisProd) {
      setQuantity(thisProd.qtd);
    }
  }, [cart]);

  const remove = () => {
    if (product && product.qtd === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      // Referência para map recriando o objeto dentro do array: https://bobbyhadz.com/blog/javascript-update-property-of-object-in-array#:~:text=To%20update%20an%20object's%20property,return%20the%20object%20as%20is.&text=Copied!
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            qtd: product.qtd - 1,
            totalPrice: item.totalPrice - Number(price),
          };
        }
        return item;
      });
      setCart(newCart);
    }
    if (quantity > 0) setQuantity((prevState) => prevState - 1);
  };

  const add = () => {
    if (!product) {
      setCart((prevState) => [...prevState, {
        name,
        price,
        id,
        qtd: 1,
        totalPrice: Number(price),
      }]);
    } else {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            qtd: product.qtd + 1,
            totalPrice: item.totalPrice + Number(price),
          };
        }
        return item;
      });
      setCart(newCart);
    }
    setQuantity((prevState) => prevState + 1);
  };

  const handleQuantityChange = ({ target: { value } }) => {
    if (Number(value) >= 0) setQuantity(Number(value));
    if (!product && Number(value) !== 0) {
      setCart((prevState) => [...prevState, {
        name,
        price,
        id,
        qtd: Number(value),
        totalPrice: Number(value) * Number(price),
      }]);
    } else if (Number(value) === 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            qtd: Number(value),
            totalPrice: Number(value) * Number(price),
          };
        }
        return item;
      }));
    }
  };

  return (
    <div>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <span>R$ </span>
      <span data-testid={ `customer_products__element-card-price-${id}` }>
        { price.replace('.', ',') }
      </span>
      <br />
      <button
        type="button"
        onClick={ remove }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <input
        type="number"
        name="qtd"
        min="0"
        value={ quantity }
        onChange={ handleQuantityChange }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        type="button"
        onClick={ add }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.obj,
}.isRequired;
