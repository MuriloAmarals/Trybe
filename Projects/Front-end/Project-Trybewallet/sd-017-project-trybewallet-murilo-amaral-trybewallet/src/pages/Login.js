import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { emailToStore } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  // Submit e Handler genericos
  handleSubmit(event) {
    event.preventDefault();
    const { history, saveUserEmail } = this.props;
    const { email } = this.state;
    saveUserEmail(email);
    history.push('/carteira');
  }

  handleText({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.handleButton());
  }

  handleButton() {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;

    if (email.includes('@')
      && email.includes('.com')
      && password.length >= MIN_PASSWORD_LENGTH) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            name="email"
            placeholder="email"
            type="text"
            onChange={ this.handleText }
          />
        </label>
        <label htmlFor="senha">
          <input
            data-testid="password-input"
            placeholder="senha"
            type="password"
            onChange={ this.handleText }
            name="password"
          />
        </label>
        <button
          type="submit"
          disabled={ buttonDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  saveUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (email) => dispatch(emailToStore(email)),
});

export default connect(null, mapDispatchToProps)(Login);
