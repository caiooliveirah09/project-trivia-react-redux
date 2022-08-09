import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendClassAction } from '../redux/actions';

class Buttons extends React.Component {
handleClick = () => {
  const { sendClasses } = this.props;
  const correctClass = 'green';
  const wrongClass = 'red';
  sendClasses({ correctClass, wrongClass });
}

render() {
  const { controle, correctAnswer,
    testId, getClasses: { correctClass, wrongClass }, isDisabled } = this.props;
  console.log('resposta certa: ', correctAnswer);
  return (
    <button
      className={ controle === correctAnswer ? correctClass : wrongClass }
      onClick={ () => this.handleClick() }
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
});

const mapStateToProps = (state) => ({
  getClasses: state.player.classes,
  isDisabled: state.player.isButtonDisable,
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
