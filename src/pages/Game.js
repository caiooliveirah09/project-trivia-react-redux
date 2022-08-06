import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchQuestions } from '../tests/helpers/fetchQuestions';
import Questions from '../components/Questions';

class Game extends React.Component {
state = {
  questions: { },
  index: 0,
  isFetched: false,
}

componentDidMount() {
  // const token = JSON.parse(localStorage.getItem('token'));
  this.getQuestions();
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

render() {
  const { questions: { results }, index, isFetched } = this.state;
  return (
    <div>
      { isFetched && <Questions question={ results[index] } />}

    </div>
  );
}
}

Game.propTypes = ({
  history: propTypes.objectOf(propTypes.any),
}).isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Game);
