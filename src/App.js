import React from 'react';
import './App.css';
import Control from './components/Control';
import GridBoard from './components/GridBoard';
import MessagePopup from './components/MessagePopup';
import NextBlock from './components/NextBlock';
import ScoreBoard from './components/ScoreBoard';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header">Tetris</div>
        <GridBoard />
        <NextBlock />
        <ScoreBoard />
      </div>
    </Provider>
  );
};

export default App;
