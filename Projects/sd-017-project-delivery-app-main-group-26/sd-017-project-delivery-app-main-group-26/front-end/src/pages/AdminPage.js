import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNav from '../components/CustomNav';
import UsersTable from '../components/UsersTable';
import { AppContext } from '../contexts/AppContext';
import api from '../service/api';

const MIN_PASSW = 6;
const MAX_NAME = 11;

export default function AdminPage() {
  const { handleUsers } = useContext(AppContext);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user.role !== 'administrator') navigate('/login');
  }, []);

  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/users', { name, email, password, role }, {
        headers: { Authorization: user.token },
      });
      if (data) handleUsers();
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');
    } catch (err) {
      setError('Dados inválidos');
      console.log(err);
      if (error.message.includes('401')) {
        localStorage.removeItem('user');
        navigate('/login');
      }
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
    <section>
      <header>
        <CustomNav />
      </header>
      <div>
        { error && <p data-testid="admin_manage__element-invalid-register">{ error }</p> }
        <h3>Cadastrar novo usuário</h3>
        <form onSubmit={ handlerSubmit }>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              data-testid="admin_manage__input-name"
              onChange={ ({ target }) => setName(target.value) }
              onKeyUp={ handlerdisableSubmit }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              data-testid="admin_manage__input-email"
              onChange={ ({ target }) => setEmail(target.value) }
              onKeyUp={ handlerdisableSubmit }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              data-testid="admin_manage__input-password"
              onChange={ ({ target }) => setPassword(target.value) }
              onKeyUp={ handlerdisableSubmit }
              value={ password }
            />
          </label>
          <select
            id="role"
            data-testid="admin_manage__select-role"
            onChange={ ({ target }) => setRole(target.value) }
            value={ role }
          >
            Tipo:
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor(a)</option>
            <option value="administrator">Administrador</option>
          </select>
          <div>
            <button
              type="submit"
              data-testid="admin_manage__button-register"
              disabled={ disabled }
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
      <main>
        <h3>Lista de usuários</h3>
        <UsersTable />
      </main>
    </section>
  );
}
