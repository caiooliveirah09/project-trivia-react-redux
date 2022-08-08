import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Questions.css';
import { connect } from 'react-redux';
import Buttons from './Buttons';

class Questions extends React.Component {
  state = {
    isAlready: false,
    buttons: [],
  }

  componentDidMount() {
    this.createButtons();
  }

  createButtons = () => {
    const { question } = this.props;
    if (question) {
      const { getClasses: { correctClass, wrongClass } } = this.props;
      const qtd = [...question.incorrect_answers, question.correct_answer];
      let answers = [...question.incorrect_answers, question.correct_answer];
      const index = () => Math.floor(Math.random() * answers.length);
      const button = (key) => {
        const controle = answers[index()];
        answers = answers.filter((answer) => answer !== controle);
        if (controle === question.correct_answer) {
        // console.log('resposta Usuario: ', controle);
          console.log('resposta certa: ', correctClass);
          return (
            <Buttons
              controle={ controle }
              testId="correct-answer"
              correctAnswer={ question.correct_answer }
              key={ key }
              nameClass={ correctClass }
            />
          );
        }
        return (
          <Buttons
            controle={ controle }
            testId={ `wrong-answer-${question.incorrect_answers.indexOf(controle)}` }
            correctAnswer={ question.correct_answer }
            key={ key }
            nomeClass={ wrongClass }
          />

        );
      };
      const buttons = qtd.map((_, indexA) => button(indexA));
      this.setState({
        buttons,
        isAlready: true,
      });
    }
  }

  render() {
    const { buttons, isAlready } = this.state;
    const { question } = this.props;
    return (
      <div>
        { question && <h2 data-testid="question-text">{question.question}</h2>}
        {question && <h3 data-testid="question-category">{ question.category }</h3>}
        <div data-testid="answer-options">
          {isAlready && buttons.map((button) => button)}

        </div>
      </div>
    );
  }
}

Questions.propTypes = ({
  question: PropTypes.object,
}).isRequired;

const mapStateToProps = (state) => ({
  getClasses: state.player.classes,
});

export default connect(mapStateToProps)(Questions);
