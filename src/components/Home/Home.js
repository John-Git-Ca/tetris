import React from 'react';
import { Link } from 'react-router-dom';
import tetris from '../../images/tetris.png';
import './home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-around">
        <div className="col-5 m-2">
          <Link to="/tetris">
            <div className="card gamecard">
              <img src={tetris} alt="tetris"></img>
              <h3 className="card-title  text-center">Tetris</h3>
            </div>
          </Link>
        </div>
        <div className="col-5 m-2">
          <Link to="/flappybird">
            <div className="card gamecard">
              <img src={tetris} alt="flappy bird"></img>
              <h3 className="card-title text-center">Flappy Bird</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
