import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      validateButton: true,
      isLoading: false,
    };
  }

   handleChange = ({ target }) => {
     const { name, value } = target;

     this.setState({
       [name]: value,
     }, () => this.handleButtonValidation());
   }

  handleButtonValidation = () => {
    const min = 3;
    const { name } = this.state;
    this.setState({
      validateButton: (name.length < min),
    });
  }

  createUser = () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState(
      {
        isLoading: true,
      }, async () => {
        await createUser({ name });
        history.push('/search');
      },
    );
  }

  render() {
    const {
      name,
      validateButton,
      isLoading,
    } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              name="name"
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>

          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ validateButton }
            onClick={ this.createUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
