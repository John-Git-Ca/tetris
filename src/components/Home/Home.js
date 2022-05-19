import React from 'react';
import { Link } from 'react-router-dom';
import tetris from '../../images/tetris.png';
import flappyB from '../../images/flappyb.png';
import './home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-around">
        <div className="col-4 m-2 justify-content-center">
          <Link to="/tetris" className="justify-content-center">
            <div className="card gamecard ">
              <img src={tetris} alt="tetris"></img>
            </div>
          </Link>
        </div>
        <div className="col-4 m-2 justify-content-center">
          <Link to="/flappybird">
            <div className="card gamecard">
              <img src={flappyB} alt="flappy bird"></img>
            </div>
          </Link>
        </div>
        <div className="col-4 m-2"></div>
      </div>
    </div>
  );
};

export default Home;
