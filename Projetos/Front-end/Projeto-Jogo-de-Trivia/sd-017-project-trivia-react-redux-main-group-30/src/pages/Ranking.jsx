import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  componentDidMount() {

    localStorage.setItem('ranking', JSON.stringify(this.props.ranking));
    console.log(this.props.ranking);

    const { ranking } = this.props;
    localStorage.setItem('ranking', JSON.stringify(ranking));

  }

  render() {
    const {
      ranking,
    } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <section>
          <img
            data-testid="header-profile-picture"
            src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
            alt="img"
          />
          <h3>

            {ranking.length > 0
            && ranking.sort((a, b) => b.score - a.score).map((item, index) => (
              <div>
                <h3 data-testid={ `player-name-${index}` }>{item.name}</h3>
                <h3 data-testid={ `player-score-${index}` }>{item.score}</h3>

            {ranking.map((item, i) => (
              <div key={ i }>
                <h3>
                  <span data-testid={ `player-name-${index}` }>{item.name}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span data-testid={ `player-score-${index}` }>{item.score}</span>
                </h3>

              </div>
            ))}
          </h3>
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  ranking: PropTypes.object,
  history: PropTypes.instanceOf(Object),
}.isRequired;

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

export default connect(mapStateToProps, null)(Ranking);
