import React from 'react';
// import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history: { push } } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Ranking;
