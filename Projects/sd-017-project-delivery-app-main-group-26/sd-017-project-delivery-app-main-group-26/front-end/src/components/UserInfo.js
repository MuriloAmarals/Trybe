import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import api from '../service/api';

export default function UserInfo({ user: { id, name, email, role }, i }) {
  const { handleUsers } = useContext(AppContext);

  const navigate = useNavigate();

  const handleRemove = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await api.delete(`/users/delete/${id}`, {
        headers: { Authorization: user.token },
      });
      handleUsers();
    } catch (error) {
      console.log(error);
      if (error.message.includes('401')) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  return (
    <tr>
      <td data-testid={ `admin_manage__element-user-table-item-number-${i}` }>
        { i + 1 }
      </td>
      <td data-testid={ `admin_manage__element-user-table-name-${i}` }>
        { name }
      </td>
      <td data-testid={ `admin_manage__element-user-table-email-${i}` }>
        { email }
      </td>
      <td data-testid={ `admin_manage__element-user-table-role-${i}` }>
        { role }
      </td>
      <td data-testid={ `admin_manage__element-user-table-remove-${i}` }>
        <button type="button" onClick={ handleRemove }>
          Excluir
        </button>
      </td>
    </tr>
  );
}

UserInfo.propTypes = {
  user: PropTypes.obj,
  i: PropTypes.number,
}.isRequired;
