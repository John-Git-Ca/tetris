import React from 'react';
import GridSquare from './GridSquare';
import { useSelector } from 'react-redux';
import { shapes } from '../utils/utils';
import Control from './Control';

const NextBlock = () => {
  const nextShape = useSelector((state) => state.gameReducer.nextShape);

  const box = shapes[nextShape][0];

  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => (
      <GridSquare key={`${row}${col}`} color={square} />
    ));
  });

  return (
    <div>
      <div className="next-block">{grid}</div>
      <Control />
    </div>
  );
};

export default NextBlock;
