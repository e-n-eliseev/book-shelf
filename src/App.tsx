import { useEffect } from 'react';
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
import { BookPage } from './components/BookPage/BookPage';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getUserId } from './store/selectors/manageUserInfoSelectors';
import { getPhoneFromFb, setEmail, setNick, setPhoneNumber, setPhotoURL, setUserId } from './store/slices/manageUserInfoSlice';
import ReadBook from './components/readBook/ReadBook';

function App() {
  //получаем  ID текущего пользователя
  const userId = useAppSelector(getUserId);
  const dispatch = useAppDispatch();

  //подписываемся на изменение данных о пользователях в firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUserId(user ? user.uid : ""));
      dispatch(setEmail(user?.email ? user.email : ""));
      dispatch(user ? getPhoneFromFb() : setPhoneNumber(""))
      dispatch(setNick(user?.displayName
        ? user.displayName
        : ""));
      dispatch(setPhotoURL(user?.photoURL
        ? user.photoURL
        : ""));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <Header authed={userId} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<PublicRoute authed={userId} />}>
          <Route path="" element={<LogIn />} />
        </Route>
        <Route path="/signup" element={<PublicRoute authed={userId} />}>
          <Route path="" element={<LogIn authed />} />
        </Route>
        <Route path="/bookslist/:id" element={<BooksList />} />
        <Route path="/genres/:id" element={<GenreList />} />
        <Route path="/genre/:genre" element={<BooksList genre={true} />} />
        <Route path='/book/:id' element={<BookPage authed={userId} />} />
        <Route path="/read/:id" element={<ReadBook />} />
        <Route path="/profilepage" element={<PrivateRoute authed={userId} />} >
          <Route path="" element={<ProfilePage />} />
        </Route>
        <Route path="/favourites" element={<PrivateRoute authed={userId} />} >
          <Route path="" element={<FavouritesPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


