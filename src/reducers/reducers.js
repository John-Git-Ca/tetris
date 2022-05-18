import { createSlice } from '@reduxjs/toolkit';
import {
  addBlockToGrid,
  canMoveTo,
  checkRows,
  gridDefault,
  nextRotation,
  randomShapes,
} from '../utils/utils';

export const initialState = () => {
  return {
    grid: gridDefault(),
    shape: randomShapes(),
    rotation: 0,
    x: 3,
    y: -4,
    nextShape: randomShapes(),
    isRunning: true,
    score: 0,
    speed: 1000,
    gameOver: false,
  };
};
const gameSlice = createSlice({
  name: 'gameReducer',
  initialState: initialState(),
  reducers: {
    moveRight: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        return { ...state, x: x + 1 };
      }
      return state;
    },
    moveLeft: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        return { ...state, x: x - 1 };
      }
      return state;
    },
    rotate: (state) => {
      const { shape, grid, x, y, rotation } = state;
      const newRotation = nextRotation(shape, rotation);
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        return { ...state, rotation: newRotation };
      }
      return state;
    },
    moveDown: (state) => {
      const { shape, grid, x, y, rotation, nextShape, score } = state;
      const maybeY = y + 1;
      if (canMoveTo(shape, grid, x, maybeY, rotation)) {
        return { ...state, y: maybeY };
      }
      const obj = addBlockToGrid(shape, grid, x, y, rotation);
      console.log('add');
      const newGrid = obj.grid;
      const gameOver = obj.gameOver;

      if (gameOver) {
        state.shape = 0;
        state.gameOver = true;
        return state;
      }
      state.grid = newGrid;
      state.shape = nextShape;
      state.rotation = 0;
      state.x = 3;
      state.y = -4;
      state.nextShape = randomShapes();
      state.score = score + checkRows(newGrid);
      state.speed = 1000 / Math.max(1, Math.round(score / 2000));
      return state;
    },
    pause: (state) => {
      console.log(state.speed);
      return { ...state, isRunning: false };
    },
    resume: (state) => {
      return { ...state, isRunning: true };
    },
    restart: (state) => {
      return initialState();
    },
  },
});

export const { moveRight, moveLeft, rotate, moveDown, pause, resume, restart } =
  gameSlice.actions;

export default gameSlice.reducer;
