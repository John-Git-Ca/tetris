import React, { useState, useRef, useEffect } from 'react';
import bgimage from '../../images/fb-game-background.png';
import { moveDown } from '../../reducers/reducers';
import './flappybird.css';

const FlappyBird = () => {
  const [birdTop, setBirdTop] = useState(200);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const gravity = 2;
  let movingDown = useRef();

  const lastTimeRef = useRef(0);
  const progressTimeRef = useRef(0);
  const requestTimeRef = useRef();

  const moveDown = (time) => {
    requestTimeRef.current = requestAnimationFrame(moveDown);
    if (!isRunning) {
      return;
    }
    if (!lastTimeRef.current) {
      lastTimeRef.current = time;
    }
    const deltaTime = time - lastTimeRef.current;
    progressTimeRef.current += deltaTime;
    if (progressTimeRef.current > 10) {
      console.log(isRunning);
      setBirdTop(birdTop + gravity);
      setScore(Math.round(time / 1000));
      progressTimeRef.current = 0;
    }
    lastTimeRef.current = time;
  };

  const startGame = () => {
    if (birdTop >= 470) {
      setScore(0);
      console.log('score set');
      setBirdTop(200);
      console.log('bird set');
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (birdTop < 470) {
      requestTimeRef.current = requestAnimationFrame(moveDown);
    } else {
      setIsRunning(false);
    }
    return () => {
      cancelAnimationFrame(requestTimeRef.current);
    };
  }, [isRunning, birdTop]);

  useEffect(() => {
    const jump = (e) => {
      if (isRunning && e.code === 'Space' && birdTop > 50) {
        setBirdTop(birdTop - 50);
      }
    };
    window.addEventListener('keydown', jump);
    return () => window.removeEventListener('keydown', jump);
  }, [isRunning, birdTop]);

  const generateObstacle = () => <div className="topobstacle"></div>;

  return (
    <div className="container">
      <div className="d-flex flex-column ">
        <div className="birdarea p-2">
          <div className="btn stopbtn" onClick={startGame}>
            {isRunning ? 'Stop' : 'Start'}
          </div>
          <div className="btn score">
            Score: <strong className="text-warning">{score}</strong>
          </div>
          {birdTop < 430 && (
            <div className="bird" style={{ top: `${birdTop}px` }}></div>
          )}
        </div>
        <div className="groundarea"></div>
      </div>
    </div>
  );
};

export default FlappyBird;
