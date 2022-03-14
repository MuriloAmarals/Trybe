import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserInfo, setRanking } from '../action';

function Feedback(props) {
  const SCORE_MIN = 3;
  const { player: { name, email, score, total, assertions } } = props;

  function userData() {
    const userInfo = {
      name,
      email,
      score: 0,
      total,
      assertions,
    };
    const userRanking = {
      name,
      score: total,
      picture: 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc',
    };

    localStorage.setItem('player', JSON.stringify(userInfo));
    props.dispatchRanking(userRanking);
    props.dispatchUserInfo(userInfo);
  }

  return (
    <div>
      <header>
        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="img"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">{score}</h3>
        <h1 data-testid="feedback-text">
          {assertions < SCORE_MIN ? 'Could be better...' : 'Well Done!'}
        </h1>
        <h3>
          Total:&nbsp;
          <span data-testid="feedback-total-score">{total}</span>
        </h3>
        <h3>
          Total de acertos:&nbsp;
          <span data-testid="feedback-total-question">{assertions}</span>
        </h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            userData();
            const { history } = props;
            history.push('/');
          } }
        >
          Play Again
        </button>
        &nbsp;&nbsp;
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            userData();
            const { history } = props;
            history.push('/ranking');
          } }
        >
          Ranking
        </button>
      </header>
    </div>
  );
}

Feedback.propTypes = {
  player: PropTypes.instanceOf(Object),
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
  ranking: state.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUserInfo(e) {
    dispatch(setUserInfo(e));
  },
  dispatchRanking(e) {
    dispatch(setRanking(e));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
