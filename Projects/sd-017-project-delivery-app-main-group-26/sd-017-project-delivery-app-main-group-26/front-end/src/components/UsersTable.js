import { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import UserInfo from './UserInfo';

export default function UsersTable() {
  const { users, handleUsers } = useContext(AppContext);

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (<UserInfo key={ user.id } user={ user } i={ i } />))}
      </tbody>
    </table>
  );
}
