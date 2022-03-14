import React from 'react';
import { Switch, Route } from 'react-router-dom';
/* import logo from './trivia.png'; */
import './App.css';
import Login from './pages/Login';
import ScreenGame from './pages/ScreenGame';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*  <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p> */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/screengame" component={ ScreenGame } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </header>
    </div>
  );
}
