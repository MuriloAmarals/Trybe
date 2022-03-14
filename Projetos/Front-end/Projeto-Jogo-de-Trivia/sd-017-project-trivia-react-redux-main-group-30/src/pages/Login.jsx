import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Rached, Token, requestToken, setUserInfo } from '../action/index';

function Login(props) {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [disable, setDisable] = useState(true);
  const rached = md5(inputEmail).toString();

  useEffect(() => {
    if (inputName !== '' && inputEmail !== '') {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [inputName, inputEmail]);

  function userData() {
    const userInfo = {
      name: inputName,
      email: inputEmail,
      score: 0,
      total: 0,
      assertions: 0,
    };

    localStorage.setItem('player', JSON.stringify(userInfo));

    props.dispatchUserInfo(userInfo);
  }

  return (
    <div>


      <button
        type="button"
        onClick={ () => props.RequestToken() }
      >
        teste
      </button>

      <label htmlFor="name-input">
        Name:
        <input
          type="text"
          data-testid="input-player-name"
          id="name-input"
          value={ inputName }
          onChange={ (event) => {
            setInputName(event.target.value);
          } }
        />
      </label>
      <label htmlFor="email-input">
        Email:
        <input
          type="email"
          id="email-input"
          data-testid="input-gravatar-email"
          value={ inputEmail }
          onChange={ (event) => {
            setInputEmail(event.target.value);
          } }
        />
      </label>
      <button
        type="button"
        data-testid="btn-play"
        disabled={ disable }
        onClick={ () => {
          props.RequestToken();
          props.infoHeader(rached);
          userData();
          const { history } = props;
          history.push('/screengame');
        } }
      >
        Play
      </button>
      <button type="button" data-testid="btn-settings">
        Configuraçoes
      </button>
      <h2 data-testid="settings-title">Configuraçoes</h2>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  infoHeader(e) {
    dispatch(Rached(e));
  },
  Token(e) {
    dispatch(Token(e));
  },
  RequestToken(e) {
    dispatch(requestToken(e));
  },
  dispatchUserInfo(e) {
    dispatch(setUserInfo(e));
  },
});

Login.propTypes = {
  infoHeader: PropTypes.func.isRequired,
  RequestToken: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  dispatchUserInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
