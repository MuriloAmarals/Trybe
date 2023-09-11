import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      isLoadingVisible: true,
      isButtonDisabled: true,
      hasBeenUpdated: false,
    };
  }

  componentDidMount() {
    getUser().then((response) => {
      this.setState({ userData: response, isLoadingVisible: false }, this.validateButton);
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => (
      { userData: { ...prevState.userData, [name]: value } }
    ), this.validateButton);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { userData } = this.state;

    this.setState({ isLoadingVisible: true });

    updateUser(userData).then(() => {
      this.setState({ hasBeenUpdated: true });
    });
  }

  validateButton = () => {
    const { userData: { name, email, description, image } } = this.state;
    const isValid = name !== '' && email !== '' && description !== '' && image !== '';
    this.setState({ isButtonDisabled: !isValid });
  }

  render() {
    const { userData, isLoadingVisible, isButtonDisabled, hasBeenUpdated } = this.state;
    const { name, email, description, image } = userData;

    if (hasBeenUpdated) return <Redirect to="/profile" />;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoadingVisible ? <Loading /> : (
          <form onSubmit={ this.handleSubmit }>
            <input
              type="text"
              name="name"
              data-testid="edit-input-name"
              placeholder="name"
              onChange={ this.handleChange }
              value={ name }
              required
            />

            <input
              type="email"
              name="email"
              data-testid="edit-input-email"
              placeholder="email"
              onChange={ this.handleChange }
              value={ email }
              required
            />

            <input
              type="text"
              name="description"
              placeholder="description"
              data-testid="edit-input-description"
              onChange={ this.handleChange }
              value={ description }
              required
            />

            <input
              type="text"
              name="image"
              data-testid="edit-input-image"
              placeholder="image"
              onChange={ this.handleChange }
              value={ image }
              required
            />

            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ isButtonDisabled }
            >
              Salvar
            </button>
          </form>
        ) }
      </div>
    );
  }
}
export default ProfileEdit;
