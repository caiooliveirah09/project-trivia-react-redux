import React from 'react';
// import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const arrayRanking = JSON.parse(localStorage.getItem('listaRanking'));
    const menosUm = -1;
    const arrayRankingSorted = arrayRanking
      .sort((a, b) => ((a.score < b.score) ? 1 : menosUm));
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
        {
          arrayRankingSorted.map((obj, index) => (
            <div key={ Math.random() }>
              <img alt={ obj.name } src={ obj.imageSRC } />
              <h4 data-testid={ `player-name-${index}` }>{ obj.name}</h4>
              <h4 data-testid={ `player-score-${index}` }>{ obj.score}</h4>
            </div>
          ))
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Ranking;
