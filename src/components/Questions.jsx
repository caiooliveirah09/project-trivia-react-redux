import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Questions.css';
import { connect } from 'react-redux';
import Buttons from './Buttons';
import Timer from './Timer';
import { setButtonsActions } from '../redux/actions';

class Questions extends React.Component {
  componentDidMount() {
    this.createButtons();
  }

  componentDidUpdate(prevProps) {
    const { player: { index } } = this.props;
    if (index !== prevProps.player.index) {
      this.createButtons();
    }
  }

  createButtons = () => {
    const { question } = this.props;
    if (question) {
      const { getClasses: { correctClass, wrongClass }, setButtons } = this.props;
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
              difficulty={ question.difficulty }
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
            difficulty={ question.difficulty }
            testId={ `wrong-answer-${question.incorrect_answers.indexOf(controle)}` }
            correctAnswer={ question.correct_answer }
            key={ key }
            nomeClass={ wrongClass }
          />

        );
      };
      const buttons = qtd.map((_, indexA) => button(indexA));
      setButtons(buttons);
    }
  }

  render() {
    const { question, player: { buttons } } = this.props;
    return (
      <div>
        { question && <Timer />}
        { question && <h2 data-testid="question-text">{question.question}</h2>}
        {question && <h3 data-testid="question-category">{ question.category }</h3>}
        <div data-testid="answer-options">
          {question && buttons.map((button) => button)}

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
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  setButtons: (payload) => dispatch(setButtonsActions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
