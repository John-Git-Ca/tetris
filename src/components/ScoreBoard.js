import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pause, resume, restart } from '../reducers/reducers';

const ScoreBoard = (props) => {
  const dispatch = useDispatch();
  const { score, isRunning, gameOver } = useSelector(
    (state) => state.gameReducer
  );
  return (
    <div className="score-board">
      <br />
      <div>Score:</div>
      <br />
      <div>
        <strong>{score}</strong>
      </div>
      <br />
      <div>Level: </div>
      <br />
      <div>
        <strong>{Math.max(1, Math.round(score / 2000))}</strong>
      </div>
      <br />
      <button
        className={
          isRunning ? 'score-board-button redBg' : 'score-board-button greenBg'
        }
        onClick={(e) => {
          if (gameOver) {
            return;
          }
          if (isRunning) {
            dispatch(pause());
          } else {
            dispatch(resume());
          }
        }}
      >
        {isRunning ? 'Pause' : 'Play'}
      </button>
      <button
        className="score-board-button"
        onClick={(e) => dispatch(restart())}
      >
        Restart
      </button>
    </div>
  );
};

export default ScoreBoard;
