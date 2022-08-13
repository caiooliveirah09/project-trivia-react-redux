import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback'
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('test the feedback page', () => {
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
    // const logo = screen.getByRole("img", { name: /logo/i });
  })
  test('test if you have 5 hits it appears Well Done!', () => {
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
  test('test if you have 0 hits it appears Could be better...', () => {
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
  test('oi', () => {
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
  test('teste em desenvolvimento "dando erro"', () => {
    const initialState = {
      player: {
        name:"test",
        assertions: 3,
        score: 2,
        gravatarEmail:"test@test",
        imageSRC: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
      },
    };
    const route = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, initialState, route);
    expect(history.location.pathname).toBe('/feedback');
    const btnRanking = screen.getByTestId('btn-ranking');
    // userEvent.click(btnRanking);
  })
})