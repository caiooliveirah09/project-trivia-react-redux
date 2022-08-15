import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import Game from '../pages/Game';
import fetchQuestionsMock from './helpers/teste';

const fakeLocalStorage = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

describe('test the game page', () => {

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

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
  })
  test('3 - if you get the question right, it changes to green color class', async () => {
    renderWithRouterAndRedux(<Game />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    expect(correctAnswer).toHaveAttribute('class','green');
  })
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
  test('5 - checks if it creates the local storage, and if it adds information', async () => {
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
    expect(window.localStorage.getItem('listaRanking')).toEqual(null)
    console.log(window.localStorage.getItem('listaRanking'));
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
    expect(window.localStorage.getItem('listaRanking')).toEqual('[{"imageSRC":"https://www.gravatar.com/avatar/c8d86ad5ed1add319e802f7f659df166","name":"test","score":380}]');
    console.log(window.localStorage.getItem('listaRanking'));
    const listaRanking = JSON.parse(window.localStorage.getItem('listaRanking'));
    console.log(listaRanking[0]);
    expect(listaRanking[0].imageSRC).toBe('https://www.gravatar.com/avatar/c8d86ad5ed1add319e802f7f659df166');
    expect(listaRanking[0].name).toBe('test');
    expect(listaRanking[0].score).toBe(380);
  })
})

