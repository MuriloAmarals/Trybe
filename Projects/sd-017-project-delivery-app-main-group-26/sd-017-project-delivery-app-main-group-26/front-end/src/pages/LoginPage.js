import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import { AppContext } from '../contexts/AppContext';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

// const schema = yup.object({
//   email: yup.string().required("Email é obrigatório").email("Email inválido"),
//   password: yup.string().min(6, "Senha inválida").required("Senha é obrigatória"),
// }).required();

const MIN_CHAR = 6;

export default function LoginPage() {
  const { handleUserCheck } = useContext(AppContext);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  // const { register, handleSubmit, formState:{ errors } } = useForm({
  //   resolver: yupResolver(schema)
  // });

  useEffect(() => {
    handleUserCheck();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/login', { email, password });
      console.log(data);
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'seller') navigate('/seller/orders');
        if (data.role === 'customer') navigate('/customer/products');
        if (data.role === 'administrator') navigate('/admin/manage');
      }
    } catch (err) {
      setError('Dados inválidos');
      console.log(err);
    }
  };

  const disableSubmit = () => {
    if (email.match(/^[^\s@]+@[^\s@]+\.com(\.br)?$/) && password.length >= MIN_CHAR) {
      setDisabled(false);
      setError('');
    } else {
      setDisabled(true);
      setError('Dados inválidos');
    }
  };

  return (
    <form onSubmit={ onSubmit }>
      <div>
        <label htmlFor="email">
          Login
          <input
            name="email"
            type="text"
            data-testid="common_login__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
            onKeyUp={ disableSubmit }
            value={ email }
          />
        </label>
      </div>

      <div>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            data-testid="common_login__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
            onKeyUp={ disableSubmit }
            value={ password }
          />
        </label>
      </div>

      <div>
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disabled }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </div>

      {error && (<p data-testid="common_login__element-invalid-email">{error}</p>)}
    </form>
  );
}
