import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import fetchQuestionsMock from './helpers/teste'
import userEvent from '@testing-library/user-event';

describe('test the app', () => {
  
  global.fetch = jest.fn(async () => ({
    json: async () => fetchQuestionsMock,
  }));

  test('test if you have the logo and phrase on the homepage', () => {
    renderWithRouterAndRedux(<App />);
    const logo = screen.getByRole("img", { name: /logo/i });
    const phrase = screen.getByText("SUA VEZ");
    expect(logo).toBeInTheDocument();
    expect(phrase).toBeInTheDocument();
  })
})