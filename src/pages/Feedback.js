import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-total-score">{ score }</p>
        <p
          data-testid="feedback-total-question"
        >
          {assertions}
        </p>
        {assertions < THREE
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
      </>);
  }
}

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

Feedback.propTypes = {
  assertions: propTypes.number,
  score: propTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
