import React from 'react';
import GridBoard from './GridBoard';
import NextBlock from './NextBlock';
import ScoreBoard from './ScoreBoard';

const Tetris = () => {
  return (
    <div className="App">
      <div className="App-header">Tetris</div>
      <GridBoard />
      <NextBlock />
      <ScoreBoard />
    </div>
  );
};

export default Tetris;
