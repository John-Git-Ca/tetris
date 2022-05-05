import React from 'react';

const GridSquare = (props) => {
  const classes = `grid-square color-${props.color}`;
  return <div className={classes}></div>;
};

export default GridSquare;
