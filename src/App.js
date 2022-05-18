import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Tetris from './components/Tetris';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import FlappyBird from './components/FlappyBird/FlappyBird';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/flappybird" element={<FlappyBird />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Provider>
  );
};

export default App;
