import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { activateNextButtonAction,
  sendClassAction, setScoreAction } from '../redux/actions';

class Buttons extends React.Component {
handleClick = ({ target: { name } }) => {
  const { sendClasses, activateNextButton, player: { index } } = this.props;
  const correctClass = 'green';
  const wrongClass = 'red';
  sendClasses({ correctClass, wrongClass });
  this.sumScore(name);
  if (index === 0) {
    activateNextButton();
  }
}

sumScore = (name) => {
  const { timer, correctAnswer, difficulty, setScore } = this.props;
  let difficult = 0;
  const three = 3;
  switch (difficulty) {
  case 'easy': difficult = 1;
    break;
  case 'medium': difficult = 2;
    break;
  case 'hard': difficult = three;
    break;

  default: difficult = 0;
    break;
  }
  if (name === correctAnswer) {
    const ten = 10;
    const score = ten + (timer * difficult);
    setScore(score);
  }
}

render() {
  const { controle, correctAnswer,
    testId, getClasses: { correctClass, wrongClass }, isDisabled } = this.props;
  console.log(correctAnswer);
  return (
    <button
      className={ controle === correctAnswer ? correctClass : wrongClass }
      onClick={ (e) => this.handleClick(e) }
      data-testid={ testId }
      disabled={ isDisabled }
      name={ controle }
      type="button"
    >
      { controle }
    </button>
  );
}
}

Buttons.propTypes = ({
  correctAnswer: PropTypes.string,
  controle: PropTypes.string,
  testId: PropTypes.string,
  isDisabled: PropTypes.bool,
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  sendClasses: (payload) => dispatch(sendClassAction(payload)),
  setScore: (payload) => dispatch(setScoreAction(payload)),
  activateNextButton: () => dispatch(activateNextButtonAction()),
});

const mapStateToProps = (state) => ({
  getClasses: state.player.classes,
  isDisabled: state.player.isButtonDisable,
  timer: state.player.timer,
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
