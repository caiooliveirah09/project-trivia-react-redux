import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchQuestions } from '../tests/helpers/fetchQuestions';
import Questions from '../components/Questions';
import Header from './Header';
import { nextQuestionAction } from '../redux/actions';

class Game extends React.Component {
state = {
  questions: { },
  isFetched: false,
}

componentDidMount() {
  const token = localStorage.getItem('token');
  this.getQuestions(token);
}

getQuestions = async (token) => {
  const questions = await fetchQuestions(token);
  this.setState({
    questions,
    isFetched: true,
  }, () => this.questionsValidation());
}

questionsValidation = () => {
  const { questions } = this.state;
  const { history } = this.props;
  const responseInvalid = 3;
  if (questions.response_code === responseInvalid) {
    localStorage.setItem('token', '');
    history.push('/');
  }
}

handleClick = () => {
  const { nextQuestion, player: { index }, history: { push } } = this.props;
  const MAX_INDEX = 4;
  if (index !== MAX_INDEX) {
    nextQuestion();
  } else {
    push('/feedback');
  }
}

render() {
  const { questions: { results }, isFetched } = this.state;
  const { player: { index, nextButton } } = this.props;
  const buttonNext = (
    <button
      type="button"
      data-testid="btn-next"
      onClick={ () => this.handleClick() }
    >
      Next

    </button>
  );
  return (
    <div>
      <Header />
      { isFetched && <Questions question={ results[index] } />}
      { nextButton && buttonNext }
    </div>
  );
}
}

Game.propTypes = ({
  history: propTypes.objectOf(propTypes.any),
  push: propTypes.func,
}).isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(nextQuestionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
