import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Questions.css';
import Buttons from './Buttons';

class Questions extends React.Component {
  state = {
    already: false,
    buttons: [],
  }

  componentDidMount() {
    this.createButtons();
  }

  createButtons = () => {
    const { question } = this.props;
    const qtd = [...question.incorrect_answers, question.correct_answer];
    let answers = [...question.incorrect_answers, question.correct_answer];
    const index = () => Math.floor(Math.random() * answers.length);
    const button = (key) => {
      const controle = answers[index()];
      answers = answers.filter((answer) => answer !== controle);
      if (controle === question.correct_answer) {
        return (
          <Buttons
            controle={ controle }
            testId="correct-answer"
            correctAnswer={ question.correct_answer }
            key={ key }
          />
        );
      }
      return (
        <Buttons
          controle={ controle }
          testId={ `wrong-answer-${question.incorrect_answers.indexOf(controle)}` }
          correctAnswer={ question.correct_answer }
          key={ key }
        />

      );
    };
    const buttons = qtd.map((_, indexA) => button(indexA));
    this.setState({
      buttons,
      already: true,
    });
  }

  render() {
    const { buttons, already } = this.state;
    const { question } = this.props;
    return (
      <div>
        <h2 data-testid="question-text">{question.question}</h2>
        <h3 data-testid="question-category">{ question.category }</h3>

        {already && buttons.map((button) => button)}
      </div>
    );
  }
}

Questions.propTypes = ({
  question: PropTypes.object,
}).isRequired;

export default Questions;
