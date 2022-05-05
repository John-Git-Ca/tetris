import { current } from '@reduxjs/toolkit';

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const gridDefault = () => {
  const rows = 18;
  const cols = 10;
  const array = [];

  for (let row = 0; row < rows; row++) {
    array.push([]);
    for (let col = 0; col < cols; col++) {
      array[row].push(0);
    }
  }

  return array;
};

export const shapes = [
  // none
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],

  // I
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ],

    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],

  // T
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 0],
      [0, 2, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [2, 2, 0, 0],
      [0, 2, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [3, 2, 2, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 2, 0],
      [0, 2, 0, 0],
    ],
  ],

  // L
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 3, 3, 0],
      [3, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [3, 3, 0, 0],
      [0, 3, 0, 0],
      [0, 3, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 3, 0],
      [3, 3, 3, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 3, 0, 0],
      [0, 3, 0, 0],
      [0, 3, 3, 0],
    ],
  ],

  // J
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 0, 0],
      [4, 4, 4, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 4, 0, 0],
      [0, 4, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 4, 4, 0],
      [0, 0, 4, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 4, 0, 0],
      [0, 4, 0, 0],
      [4, 4, 0, 0],
    ],
  ],

  // Z
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [5, 5, 0, 0],
      [0, 5, 5, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 5, 0],
      [0, 5, 5, 0],
      [0, 5, 0, 0],
    ],
  ],

  // S
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 6, 6, 0],
      [6, 6, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 6, 0, 0],
      [0, 6, 6, 0],
      [0, 0, 6, 0],
    ],
  ],

  // O
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 7, 7, 0],
      [0, 7, 7, 0],
    ],
  ],
];

export const randomShapes = () => {
  return random(1, shapes.length - 1);
};

export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length;
};

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation];
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col] !== 0) {
        const proposedX = col + x;
        const proposedY = row + y;
        if (proposedY < 0) {
          continue;
        }
        const possibleRow = grid[proposedY];
        if (possibleRow) {
          if (
            possibleRow[proposedX] === undefined ||
            possibleRow[proposedX] !== 0
          ) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  let blockOffGrid = false;
  const block = shapes[shape][rotation];
  const newGrid = [...grid];
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const yIndex = row + y;
        if (yIndex < 0) {
          blockOffGrid = true;
        } else {
          newGrid[row + y][col + x] = shape;
        }
      }
    }
  }

  return { grid: newGrid, gameOver: blockOffGrid };
};

export const checkRows = (grid) => {
  const points = [0, 40, 100, 300, 1200];
  let completedRows = 0;
  for (let row = 0; row < grid.length; row++) {
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1;
      grid.splice(row, 1);
      grid.unshift(Array(10).fill(0));
    }
  }

  return points[completedRows];
};
