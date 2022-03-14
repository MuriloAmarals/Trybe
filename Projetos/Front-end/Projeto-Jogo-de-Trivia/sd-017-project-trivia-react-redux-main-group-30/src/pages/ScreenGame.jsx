import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestToken, handleApi, setUserInfo } from '../action/index';
import '../styles.css';

function ScreenGame(props) {
  const TRINTA = 30;
  const UM = 1;
  const MIL = 1000;
  const SCORE_INIT = 10;
  const SCORE_EASY = 1;
  const SCORE_MEDIUM = 2;
  const SCORE_HARD = 3;
  const MAX_QUESTIONS = 5;
  const CINQUENTA = 50;


  const numberRandom = Math.random() * 100;

  const [btnDisable, setBtnDisable] = useState(true);

  const [index, setIndex] = useState(0);
  const [Interval, setIntervallGame] = useState(TRINTA);
  const styleTrue = { border: '3px solid rgb(6, 240, 15)' };
  const styleFalse = { border: '3px solid rgb(255, 0, 0)' };
  const { player: { name, email, score, total, assertions }, questions } = props;
  const [countQuestions, setCountQuestions] = useState(1);

  useEffect(() => {
    props.handleApi();
    setInterval(() => {
      setIntervallGame((Interval) => Interval - UM);
    }, MIL);
    return () => clearInterval(Interval);
  }, []);

  
  // useEffect(() => {
  //   if (Interval <= 0) {
  //     setBtnDisable(true);
  //   } else {
  //     setBtnDisable(false);
  //   }
  // }, [Interval]);


  function checkAnswer({ target }) {
    let difficulty = 0;
    if (props.questions[index].difficulty === 'easy') {
      difficulty = SCORE_EASY;
    } else if (props.questions[index].difficulty === 'medium') {
      difficulty = SCORE_MEDIUM;
    } else if (props.questions[index].difficulty === 'hard') {
      difficulty = SCORE_HARD;
    }

    const isCorrect = target.getAttribute('data-testid').includes('correct');
    if (isCorrect) {
      const newScore = SCORE_INIT + (Interval * difficulty);
      const userInfo = {
        name,
        email,
        score: score + newScore,
        total: total + newScore,
        assertions: assertions + 1,
      };
      localStorage.setItem('player', JSON.stringify(userInfo));
      props.dispatchUserInfo(userInfo);
    }
  }

  return (
    <div>
      <header>
        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="img"
        />
        <p>
          Nome:&nbsp;
          <span data-testid="header-player-name">{name}</span>
          &nbsp;&nbsp;Email:&nbsp;
          <span data-testid="input-gravatar-email">{email}</span>
        </p>
        <p>
          Pontuação:&nbsp;
          <span data-testid="header-score">{score}</span>
        </p>
      </header>
      {questions.length > 0 && numberRandom <= CINQUENTA ? (
        <div data-testid="answer-options">
          <p data-testid="question-category">{questions[index].category}</p>
          <p data-testid="question-text">{questions[index].question}</p>

          <section data-testid="answer-options">
            <button
              type="button"
              disabled={ Interval <= 0 ? 'disabled' : btnDisable }
              style={ styleTrue }
              data-testid="correct-answer"

              onClick={ (event) => {
                checkAnswer(event);
                setBtnDisable(true);
              } }

            >
              {questions[index].correct_answer}
            </button>

            <button
              type="button"
              style={ styleFalse }
              data-testid={ `wrong-answer-${index}` }

              onClick={ (event) => {
                checkAnswer(event);
                setBtnDisable(true);
              } }

            >
              {questions[index].incorrect_answers[0]}
            </button>

            <button
              type="button"
              style={ styleFalse }
              data-testid={ `wrong-answer-${index}` }
              onClick={ (event) => {
                checkAnswer(event);
                setBtnDisable(true);
              } }

            >
              {questions[index].incorrect_answers[1]}
            </button>

            <button
              type="button"
              style={ styleFalse }
              data-testid={ `wrong-answer-${index}` }
              onClick={ (event) => {
                checkAnswer(event);
                setBtnDisable(true);
              } }

            >
              {questions[index].incorrect_answers[2]}
            </button>
          </section>

        </div>
      ) : (
        questions.length > 0
        && numberRandom > CINQUENTA && (
          <div>
            <p data-testid="question-category">{questions[index].category}</p>
            <p data-testid="question-text">{questions[index].question}</p>

            <section data-testid="answer-options">
              <button
                type="button"
                style={ styleFalse }
                data-testid={ `wrong-answer-${index}` }

                onClick={ (event) => {
                  checkAnswer(event);
                  setBtnDisable(true);
                } }

              >
                {questions[index].incorrect_answers[0]}
              </button>

              <button
                type="button"
                style={ styleFalse }
                data-testid={ `wrong-answer-${index}` }
                onClick={ (event) => {
                  checkAnswer(event);
                  setBtnDisable(true);
                } }

              >
                {questions[index].incorrect_answers[1]}
              </button>

              <button
                type="button"
                disabled={ Interval <= 0 ? 'disabled' : btnDisable }
                onClick={ (event) => {
                  checkAnswer(event);
                  setBtnDisable(true);
                } }

                style={ styleTrue }
                data-testid="correct-answer"
              >
                {questions[index].correct_answer}
              </button>
              <button
                type="button"
                onClick={ (event) => {
                  checkAnswer(event);
                  setBtnDisable(true);
                } }

                style={ styleFalse }
                data-testid={ `wrong-answer-${index}` }
              >
                {questions[index].incorrect_answers[2]}
              </button>
            </section>
          </div>
        )
      )}

      <button
        data-testid="btn-next"
        onClick={ () => {
          const { history } = props;
          setCountQuestions(countQuestions + 1);
          setIntervallGame(TRINTA);
          setIndex(index + 1);
          if (countQuestions === MAX_QUESTIONS) {
            setCountQuestions(0);
            history.push('/feedback');
          }
        } }
        type="button"
      >
        Proxima Pergunta
      </button>

      
      {
        btnDisable
          && (
            <button
              data-testid="btn-next"
              onClick={ () => {
                const { history } = props;
                setCountQuestions(countQuestions + 1);
                console.log(countQuestions + 1);
                handleApi();
                setIntervallGame(TRINTA);
                setBtnDisable(false);

                if (countQuestions === MAX_QUESTIONS) {
                  setCountQuestions(0);
                  history.push('/feedback');
                }
              } }
              type="button"
            >
              Proxima Pergunta
            </button>
          )
      }


      <div>
        <p>{`Tempo: ${Interval}`}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  player: state.player,
  questions: state.questions,

});

const mapDispatchToProps = (dispatch) => ({
  RequestToken() {
    dispatch(requestToken());
  },
  dispatchUserInfo(score) {
    dispatch(setUserInfo(score));
  },
  handleApi() {
    dispatch(handleApi());
  },
});

ScreenGame.propTypes = {
  player: PropTypes.instanceOf(Object),
  dispatchUserInfo: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  handleApi: PropTypes.func,
  questions: PropTypes.instanceOf(Object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);
