import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login'
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App'

describe('test the login page', () => {
  test('1 - checks if it has the name field, email and the buttons', () => {
    renderWithRouterAndRedux(<Login />);
    const name = screen.getByTestId('input-player-name');
    const gravatarEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    const buttonConfig = screen.getByTestId('btn-settings');
    expect(name).toBeInTheDocument();
    expect(gravatarEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonConfig).toBeInTheDocument();
  })
  test('2 - test if the play button is disabled if you dont fill in the fields', () => {
    renderWithRouterAndRedux(<Login />);
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toHaveProperty('disabled', true);
  })
  test('3 - test if you fill in the fields the play button enables', () => {
    renderWithRouterAndRedux(<Login />);
    const name = screen.getByTestId('input-player-name');
    const gravatarEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(name, 'test');
    userEvent.type(gravatarEmail,'test@test.com');
    expect(buttonPlay).toHaveProperty('disabled', false);
  })
  test('4 - checks if it enters /settings by clicking on settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const buttonConfig = screen.getByTestId('btn-settings');
    userEvent.click(buttonConfig);
    const settings = screen.getByRole("heading", { name: /settings/i });
    expect(settings).toBeInTheDocument();
    expect(history.location.pathname).toBe('/configuracoes')
  })
  test('5 - checks if clicking play with the fields filled in is redirected to /game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const gravatarEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(name, 'test');
    userEvent.type(gravatarEmail,'test@test.com');
    userEvent.click(buttonPlay);
    const playerName = await screen.findByTestId("header-player-name");
    expect(playerName).toBeInTheDocument();
    expect(history.location.pathname).toBe('/game');
  })
})