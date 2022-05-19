import React, { useState, useRef, useEffect } from 'react';
import './flappybird.css';

const FlappyBird = () => {
  const UP = 'UP';
  const DOWN = 'DOWN';
  const [birdTop, setBirdTop] = useState(200);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [obstacles, setObstacles] = useState({
    a: { top: 200, left: 380, direction: DOWN },
    b: { top: -100, left: 600, direction: UP },
  });
  const gravity = 2;

  const lastTimeRef = useRef(0);
  const progressTimeRef = useRef(0);
  const requestTimeRef = useRef();
  const obstacleTimeRef = useRef(0);

  useEffect(() => {
    let timeInterval = setInterval(() => {
      if (!gameOver && isRunning) {
        setScore(score + 1);
      }
    }, 100);
    return () => {
      clearInterval(timeInterval);
    };
  }, [gameOver, isRunning, score]);

  const checkOverlap = (direc, x, y) => {
    if (x >= 75 && x <= 140) {
      if (direc === UP) {
        if (birdTop <= y + 210) {
          console.log('direc' + direc);
          console.log('birtop' + birdTop);
          console.log('x' + x);
          console.log('y' + y);
          return true;
        }
      } else {
        if (birdTop >= y - 70) {
          console.log('direc' + direc);
          console.log('birtop' + birdTop);
          console.log('x' + x);
          console.log('y' + y);
          return true;
        }
      }
    }
    return false;
  };

  const randomDirection = () => {
    if (Math.floor(2 * Math.random()) === 0) {
      return UP;
    } else {
      return DOWN;
    }
  };

  const gapValue = () => Math.round(Math.random() * 200) + 80;
  const topValue = (dir) => {
    if (dir === DOWN) {
      return Math.round(Math.random() * 150 + 150);
    } else {
      return Math.round(-1 * Math.random() * 200);
    }
  };

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
    obstacleTimeRef.current += deltaTime;
    if (progressTimeRef.current > 10) {
      setBirdTop(birdTop + gravity);
      setObstacles({
        a: { ...obstacles.a, left: obstacles.a.left - 1 },
        b: { ...obstacles.b, left: obstacles.b.left - 1 },
      });
      if (
        checkOverlap(
          obstacles.a.direction,
          obstacles.a.left,
          obstacles.a.top
        ) ||
        checkOverlap(obstacles.b.direction, obstacles.b.left, obstacles.b.top)
      ) {
        setIsRunning(false);
        setGameOver(true);
      }
      progressTimeRef.current = 0;
    }
    if (obstacleTimeRef.current > 1000) {
      if (obstacles.a.left < -50) {
        let tempDirection = randomDirection();
        setObstacles({
          ...obstacles,
          a: {
            top: topValue(tempDirection),
            left: 400 + gapValue(),
            direction: tempDirection,
          },
        });
      }
      if (obstacles.b.left < -50) {
        let tempDirection = randomDirection();
        setObstacles({
          ...obstacles,
          b: {
            top: topValue(tempDirection),
            left: 400 + gapValue(),
            direction: tempDirection,
          },
        });
      }
      obstacleTimeRef.current = 0;
    }
    lastTimeRef.current = time;
  };

  const startGame = () => {
    if (birdTop >= 400) {
      setGameOver(true);
    }
    if (gameOver) {
      setScore(0);
      setBirdTop(200);
      setObstacles({
        a: { top: 200, left: 380, direction: DOWN },
        b: { top: -100, left: 600, direction: UP },
      });
      setGameOver(false);
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (birdTop < 400) {
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
      if (isRunning && e.code === 'Space' && birdTop > 0) {
        setBirdTop(Math.max(birdTop - 50, 0));
      }
    };
    window.addEventListener('keydown', jump);
    return () => window.removeEventListener('keydown', jump);
  }, [isRunning, birdTop]);

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        <div className="birdarea p-2">
          <div className="btn stopbtn" onClick={startGame}>
            {isRunning ? 'Pause' : 'Start'}
          </div>
          <div className="btn score">
            Score: <strong className="text-warning">{score}</strong>
          </div>
          {birdTop < 400 && (
            <div className="bird" style={{ top: `${birdTop}px` }}></div>
          )}
          {obstacles && (
            <div>
              <div
                className={
                  obstacles.a.direction === DOWN
                    ? 'bottomobstacle'
                    : 'topobstacle'
                }
                style={{ top: obstacles.a.top, left: obstacles.a.left }}
              ></div>
              <div
                className={
                  obstacles.b.direction === DOWN
                    ? 'bottomobstacle'
                    : 'topobstacle'
                }
                style={{ top: obstacles.b.top, left: obstacles.b.left }}
              ></div>
            </div>
          )}
        </div>
        <div className="groundarea"></div>
      </div>
    </div>
  );
};

export default FlappyBird;
