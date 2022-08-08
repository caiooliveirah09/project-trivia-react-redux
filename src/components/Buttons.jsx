import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendClassAction } from '../redux/actions';

class Buttons extends React.Component {
state = {
  correctClass: '',
  wrongClass: '',
  userReplied: false,
}

handleClick = ({ target: { name } }) => {
  const { correctAnswer, sendClasses } = this.props;
  const correctClass = name === correctAnswer ? 'green' : 'red';
  const wrongClass = name !== correctAnswer ? 'green' : 'red';
  // this.setState({
  //   correctClass,
  //   wrongClass,
  //   userReplied: true,
  // });
  sendClasses({ correctClass, wrongClass });
}

render() {
  const { userReplied } = this.state;
  const { controle, correctAnswer,
    testId, getClasses: { correctClass, wrongClass } } = this.props;
  return (
    <button
      className={ controle === correctAnswer
        ? wrongClass : correctClass }
      onClick={ (e) => this.handleClick(e) }
      data-testid={ testId }
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
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  sendClasses: (payload) => dispatch(sendClassAction(payload)),
});

const mapStateToProps = (state) => ({
  getClasses: state.player.classes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
