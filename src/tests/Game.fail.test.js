import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App'
import { fetchQuestionsMockFailed } from './helpers/teste';


describe('test the game page fail', () => {
  
  global.fetch = jest.fn(async () => ({
    json: async () => fetchQuestionsMockFailed,
  }));

  test('1- test returns to home if fetch fails', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const gravatarEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(name, 'test');
    userEvent.type(gravatarEmail,'test@test.com');
    userEvent.click(buttonPlay);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/');
  })
})
