import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseAuth';
import { PublicRoute } from './components/publicRoute/PublicRoute';
import LogIn from './components/logIn/LogIn';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import ProfilePage from './components/profilePage/ProfilePage';
import FavouritesPage from './components/favouritesPage/FavouritesPage';
import PageNotFound from './components/404/PageNotFound';
import { GenreList } from './components/genreList/GenreList';
import { BooksList } from './components/booksList/BooksList';

function App() {

  //локально сохраняем статус авторизации
  const [authed, setAuthed] = useState<boolean>(false);
  //обработчики изменения состояния авторизации в firebase
  const handleLogin = (): void => {
    setAuthed(true);
  };
  const handleLogout = (): void => {
    setAuthed(false);
  };
  //подписываемся на изменение данных о пользователях в firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleLogin();
      } else {
        handleLogout();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <Header authed={authed} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<PublicRoute authed={authed} />}>
          <Route path="" element={<LogIn />} />
        </Route>
        <Route path="/signup" element={<PublicRoute authed={authed} />}>
          <Route path="" element={<LogIn authed />} />
        </Route>
        <Route path="/bookslist/:id" element={<BooksList />} />
        <Route path="/genres/:id" element={<GenreList />} />
        <Route path="/genre/:genre" element={<BooksList genre={true} />} />
        <Route path="/profilepage" element={<PrivateRoute authed={authed} />} >
          <Route path="" element={<ProfilePage />} />
        </Route>
        <Route path="/favourites" element={<PrivateRoute authed={authed} />} >
          <Route path="" element={<FavouritesPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
