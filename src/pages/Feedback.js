import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
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
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
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
