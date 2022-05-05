import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers/reducers';

export default configureStore({
  reducer: {
    gameReducer: gameReducer,
  },
});
