import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import fetchQuestionsMock from './helpers/teste';
import userEvent from '@testing-library/user-event';

const players = [
  {imageSRC:"https://www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452",name:"test1",score:100},
  {imageSRC:"https://www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452",name:"test2",score:101},
];

describe('test the ranking page', () => {

  global.fetch = jest.fn(async () => ({
    json: async () => fetchQuestionsMock,
  }));

  localStorage.setItem('listaRanking', JSON.stringify(players));

  test('test if the score goes from highest to lowest', async () => {
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
    const playerName0 = screen.getByTestId('player-name-0');
    expect(playerName0).toBeInTheDocument();
    const playerScore0 = screen.getByTestId('player-score-0');
    expect(playerScore0).toBeInTheDocument();
    expect(playerScore0).toHaveTextContent('380');
    const playerName1 = screen.getByTestId('player-name-1');
    expect(playerName1).toBeInTheDocument();
    const playerScore1 = screen.getByTestId('player-score-1');
    expect(playerScore1).toBeInTheDocument();
    expect(playerScore1).toHaveTextContent('101');
    const playerName2 = screen.getByTestId('player-name-2');
    expect(playerName2).toBeInTheDocument();
    const playerScore2 = screen.getByTestId('player-score-2');
    expect(playerScore2).toBeInTheDocument();
    expect(playerScore2).toHaveTextContent('100');
  })
})
