import React from 'react';
import './styles/App.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
