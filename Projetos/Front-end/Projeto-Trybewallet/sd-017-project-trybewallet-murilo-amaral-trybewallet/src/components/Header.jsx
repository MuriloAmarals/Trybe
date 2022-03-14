import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, soma } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{email}</h3>
        <h3 data-testid="total-field">{soma}</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  soma: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  soma: state.wallet.soma || 0,
});

export default connect(mapStateToProps)(Header);
