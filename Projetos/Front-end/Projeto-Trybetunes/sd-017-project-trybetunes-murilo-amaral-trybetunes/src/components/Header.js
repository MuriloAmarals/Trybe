import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const userData = await getUser();
    const { name } = userData;
    this.setState({
      userName: name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { isLoading ? <Loading /> : userName}
        </p>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
