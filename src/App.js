import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Configuracoes from './pages/Configuracoes';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ </p>
        <Switch>
          <Route path="/configuracoes" component={ Configuracoes } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/" component={ Login } />
        </Switch>
      </header>
    </div>
  );
}
