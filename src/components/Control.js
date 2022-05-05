import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveLeft, moveRight, rotate, moveDown } from '../reducers/reducers';
import './control.css';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowDown,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { FiRotateCw } from 'react-icons/fi';

const Control = () => {
  const dispatch = useDispatch();
  const gameReducer = useSelector((state) => state.gameReducer);
  const { isRunning, gameOver } = gameReducer;

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (!isRunning || gameOver) {
        return;
      }
      switch (e.key) {
        case 'ArrowLeft':
          dispatch(moveLeft());
          break;
        case 'ArrowRight':
          dispatch(moveRight());
          break;
        case 'ArrowUp':
          dispatch(rotate());
          break;
        case 'ArrowDown':
          dispatch(moveDown());
          break;
        default:
          return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="controls">
      <button
        className="control-button"
        onClick={(e) => {
          if (!isRunning || gameOver) {
            return;
          }
          dispatch(moveLeft());
        }}
        disabled={!isRunning || gameOver}
      >
        <AiOutlineArrowLeft size={20} />
      </button>
      <button
        className="control-button"
        onClick={(e) => {
          if (!isRunning || gameOver) {
            return;
          }
          dispatch(moveRight());
        }}
        disabled={!isRunning || gameOver}
      >
        <AiOutlineArrowRight size={20} />
      </button>
      <button
        className="control-button"
        onClick={(e) => {
          if (!isRunning || gameOver) {
            return;
          }
          dispatch(rotate());
        }}
        disabled={!isRunning || gameOver}
      >
        <FiRotateCw size={20} />
      </button>
      <button
        className="control-button"
        onClick={(e) => {
          if (!isRunning || gameOver) {
            return;
          }
          dispatch(moveDown());
        }}
        disabled={!isRunning || gameOver}
      >
        <AiOutlineArrowDown size={20} />
      </button>
    </div>
  );
};

export default Control;
