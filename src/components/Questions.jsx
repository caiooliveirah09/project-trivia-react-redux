import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const { question } = this.props;
    const qtd = [...question.incorrect_answers, question.correct_answer];
    let answers = [...question.incorrect_answers, question.correct_answer];
    const index = () => Math.floor(Math.random() * answers.length);
    function button(key) {
      const controle = answers[index()];
      answers = answers.filter((answer) => answer !== controle);
      if (controle === question.correct_answer) {
        return (
          <button
            key={ key }
            data-testid="correct-answer"
            name={ controle }
            type="button"
          >
            { controle }

          </button>

        );
      }
      return (
        <button
          key={ key }
          data-testid={ `wrong-answer-${question.incorrect_answers.indexOf(controle)}` }
          name={ controle }
          type="button"
        >
          { controle }

        </button>
      );
    }
    return (
      <div>
        <h2 data-testid="question-text">{question.question}</h2>
        <h3 data-testid="question-category">{ question.category }</h3>

        {qtd.map((_, indexA) => button(indexA))}
      </div>
    );
  }
}

Questions.propTypes = ({
  question: PropTypes.object,
}).isRequired;

export default Questions;
