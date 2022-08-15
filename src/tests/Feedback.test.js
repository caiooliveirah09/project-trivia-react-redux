import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import Feedback from '../pages/Feedback'
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetchQuestionsMock from './helpers/teste';

describe('test the feedback page', () => {
  
  global.fetch = jest.fn(async () => ({
    json: async () => fetchQuestionsMock,
  }));

  test('1 - test if you have the basic html of the feedbacks page', () => {
    renderWithRouterAndRedux(<Feedback />);
    const headerProfilePicture = screen.getByTestId('header-profile-picture');
    expect(headerProfilePicture).toBeInTheDocument();
    const headerPlayerName =  screen.getByTestId('header-player-name');
    expect(headerPlayerName).toBeInTheDocument();
    const headerScore = screen.getByTestId('header-score');
    expect(headerScore).toBeInTheDocument();
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    expect(feedbackTotalScore).toBeInTheDocument();
    expect(feedbackTotalScore).toHaveTextContent('0');
    const feedbackTotalQuestion = screen.getByTestId('feedback-total-question')
    expect(feedbackTotalQuestion).toBeInTheDocument();
    expect(feedbackTotalQuestion).toHaveTextContent('0');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackText).toHaveTextContent('Could be better...');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnPlayAgain).toHaveTextContent('Home');
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();
    expect(btnRanking).toHaveTextContent('Ranking');
  })
  test('2 - test if you have 5 hits it appears Well Done!', () => {
    const initialState = {
      player: {
        name:"test",
        assertions: 5,
        score: 5,
        gravatarEmail:"test@test",
        imageSRC: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
      },
    };
    renderWithRouterAndRedux(<Feedback />, initialState);
    const headerPlayerName = screen.getByTestId('header-player-name');
    expect(headerPlayerName).toHaveTextContent('test');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    expect(feedbackTotalScore).toHaveTextContent('5');
    const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
    expect(feedbackTotalQuestion).toHaveTextContent('5');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Well Done!');
  })
  test('3 - test if you have 0 hits it appears Could be better...', () => {
    const initialState = {
      player: {
        name:"test",
        assertions: 0,
        score: 0,
        gravatarEmail:"test@test",
        imageSRC: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
      },
    };
    renderWithRouterAndRedux(<Feedback />, initialState);
    const headerPlayerName = screen.getByTestId('header-player-name');
    expect(headerPlayerName).toHaveTextContent('test');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    expect(feedbackTotalScore).toHaveTextContent('0');
    const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
    expect(feedbackTotalQuestion).toHaveTextContent('0');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Could be better...');
  })
  test('4 - test if it enters the feedback page and appears to play again', () => {
    const initialState = {
      player: {
        name:"test",
        assertions: 0,
        score: 0,
        gravatarEmail:"test@test",
        imageSRC: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
      },
    };
    const route = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    expect(history.location.pathname).toBe('/feedback');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  })
  test('5 - check the ranking page, and if it comes back home', async () => {
    const initialState = {
      player: {
        name:"test",
        assertions: 3,
        score: 2,
        gravatarEmail:"test@test",
        imageSRC: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
      },
    };
    const route = '/game';
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/game');
    const correctAnswer1 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer1);
    const next1 = screen.getByTestId('btn-next');
    userEvent.click(next1);
    const correctAnswer2 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer2);
    const next2 = screen.getByTestId('btn-next');
    userEvent.click(next2);
    const correctAnswer3 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer3);
    const next3 = screen.getByTestId('btn-next');
    userEvent.click(next3);
    const correctAnswer4 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer4);
    const next4 = screen.getByTestId('btn-next');
    userEvent.click(next4);
    const correctAnswer5 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer5);
    const next5 = screen.getByTestId('btn-next');
    userEvent.click(next5);
    const btnRanking = screen.getByTestId('btn-ranking');
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
    const btnGoHome = screen.getByTestId('btn-go-home');
    userEvent.click(btnGoHome);
    expect(history.location.pathname).toBe('/');
  })
})