import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';

const MIN_PASSW = 6;
const MAX_NAME = 11;

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/register', { name, email, password });
      console.log(data);
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/customer/products');
      }
    } catch (err) {
      setError('Dados inválidos');
      console.log(err);
    }
  };

  const handlerdisableSubmit = () => {
    if (
      email.match(/^[^\s@]+@[^\s@]+\.com(\.br)?$/)
      && password.length >= MIN_PASSW && name.length > MAX_NAME) {
      setDisabled(false);
      setError('');
    } else {
      setDisabled(true);
      setError('Dados inválidos');
    }
  };

  return (
    <div>
      <form onSubmit={ handlerSubmit }>
        <div>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              data-testid="common_register__input-name"
              onChange={ ({ target }) => setName(target.value) }
              onKeyUp={ handlerdisableSubmit }
              value={ name }
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              data-testid="common_register__input-email"
              onChange={ ({ target }) => setEmail(target.value) }
              onKeyUp={ handlerdisableSubmit }
              value={ email }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              data-testid="common_register__input-password"
              onChange={ ({ target }) => setPassword(target.value) }
              onKeyUp={ handlerdisableSubmit }
              value={ password }
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            data-testid="common_register__button-register"
            disabled={ disabled }
          >
            Cadastrar
          </button>
        </div>
        {error && (
          <p data-testid="common_register__element-invalid_register">{error}</p>
        )}
      </form>
    </div>
  );
}
