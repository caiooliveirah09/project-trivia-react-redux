import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
  render() {
    const { counterAnswer, history: { push } } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        {counterAnswer < THREE
          ? (
            <p
              data-testid="feedback-text"
            >
              Could be better...

            </p>)
          : (
            <p
              data-testid="feedback-text"
            >
              Well Done!
            </p>)}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => push('/') }
        >
          Home
        </button>
      </>);
  }
}

const mapStateToProps = ({ player: { counterAnswer } }) => ({
  counterAnswer,
});

Feedback.propTypes = {
  counterAnswer: propTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
