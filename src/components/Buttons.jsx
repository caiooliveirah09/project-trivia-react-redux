import React from 'react';
import PropTypes from 'prop-types';

class Buttons extends React.Component {
state = {
  nameClass: '',
  userReplied: false,
}

handleClick = ({ target: { name } }) => {
  const { correctAnswer } = this.props;
  const nameClass = name === correctAnswer ? 'green' : 'red';
  this.setState({
    nameClass,
    userReplied: true,
  });
}

render() {
  const { nameClass, userReplied } = this.state;
  const { controle, testId } = this.props;
  return (
    <button
      className={ userReplied ? nameClass : '' }
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

export default Buttons;
