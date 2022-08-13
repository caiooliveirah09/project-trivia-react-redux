import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { findByTestId, render, screen, waitFor } from '@testing-library/react';
import App from '../App'
import Game from '../pages/Game'
import Login from '../pages/Login'
import fetchQuestionsMock from './helpers/teste'
describe('test the game page', () => {

  global.fetch = jest.fn(async () => ({
    json: async () => fetchQuestionsMock,
  }));

  test('1 - tests if when doing the fetch, the questions and answers appear', async () => {
    renderWithRouterAndRedux(<Game />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const headerProfilePicture = await screen.findByTestId('header-profile-picture');
    expect(headerProfilePicture).toHaveAttribute('src','https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e');
    const maxSeconds = screen.getByText("30");
    expect(maxSeconds).toBeInTheDocument();
    const questionText = await screen.findByTestId('question-text');
    expect(questionText).toBeInTheDocument();
    expect(questionText).toHaveTextContent('Just Cause 2 was mainly set in what fictional Southeast Asian island country?');
    const questionCategory = await screen.findByTestId('question-category');
    expect(questionCategory).toBeInTheDocument();
    expect(questionCategory).toHaveTextContent('Entertainment: Video Games');
    const correctAnswer = await screen.findByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveTextContent('Panau');
    const wrongAnswer0 = await screen.findByTestId('wrong-answer-0');
    expect(wrongAnswer0).toBeInTheDocument();
    expect(wrongAnswer0).toHaveTextContent('Davao');
    const wrongAnswer1 = await screen.findByTestId('wrong-answer-1');
    expect(wrongAnswer1).toBeInTheDocument();
    expect(wrongAnswer1).toHaveTextContent('Macau');
    const wrongAnswer2 = await screen.findByTestId('wrong-answer-2');
    expect(wrongAnswer2).toBeInTheDocument();
    expect(wrongAnswer2).toHaveTextContent('Palau');
  })
  test('2 - if you get the question wrong, it changes to red color class', async () => {
    renderWithRouterAndRedux(<Game />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const wrongAnswer0 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer0);
    expect(wrongAnswer0).toHaveAttribute('class','red');
    // const buttonPlay = screen.getByTestId('btn-play');
  })
  test('3 - if you get the question right, it changes to green color class', async () => {
    renderWithRouterAndRedux(<Game />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    expect(correctAnswer).toHaveAttribute('class','green');
  })
  /* test('5 - checks if clicking play with the fields filled in is redirected to /game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const gravatarEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(name, 'test');
    userEvent.type(gravatarEmail,'test@test.com');
    userEvent.click(buttonPlay);
    const playerName = await screen.findByTestId("header-player-name");
    expect(playerName).toBeInTheDocument();
    expect(playerName).toHaveTextContent('test');
    expect(history.location.pathname).toBe('/game');
  })
  */
  test('4 - test if you have the basic html of the page', () => {
    renderWithRouterAndRedux(<Game />);
    const headerProfilePicture = screen.getByTestId('header-profile-picture')
    const playerName = screen.getByTestId('header-player-name');
    const headerScore = screen.getByTestId('header-score')
    expect(headerProfilePicture).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(headerScore).toHaveTextContent('0');
  })
})

/*  test('1 - test if you have the basic html of the page', () => {
    renderWithRouterAndRedux(<Game />);
    const headerProfilePicture = screen.getByTestId('header-profile-picture')
    const playerName = screen.getByTestId('header-player-name');
    const headerScore = screen.getByTestId('header-score')
    expect(headerProfilePicture).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(headerScore).toHaveTextContent('0');
  }) */ 

