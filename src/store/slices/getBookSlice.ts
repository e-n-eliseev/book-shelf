import {
  IBook,
  IBooksInfo,
  IGetBook,
  IGetCurrentBook,
  IState,
} from "./../../types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { bookApiKey } from "../../firebase/firebaseConfig";
import { maxResults } from "../../helpers/vars";
import { setError, setLoading, setSuccessLoading } from "./commonSlice";
import { bookAdapter, missingData } from "../../helpers/bookSearch";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const getBooksBySearchParam = createAsyncThunk(
  "getBooks/getBooksBySearchParam",
  async (
    { searchParam, startIndex }: IGetBook,
    { rejectWithValue, dispatch }
  ) => {
    dispatch(setLoading());
    try {
      const booksData = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchParam}+inauthor:${searchParam}&key=${bookApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
      );
      dispatch(setTotalBooksQuantity(booksData.data.totalItems));
      dispatch(setSearchParam(searchParam));
      dispatch(setSuccessLoading());
      console.log(booksData);
      return booksData.data;
    } catch (error) {
      //rejectWithValue(error);
      console.log(error);
      dispatch(setError(`${error}`));
    }
  }
);
export const getBooksByGenre = createAsyncThunk(
  "getBooks/getBooksByGenre",
  async (
    { searchParam, startIndex }: IGetBook,
    { rejectWithValue, dispatch }
  ) => {
    dispatch(setLoading());
    try {
      const booksData = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${searchParam}&key=${bookApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
      );
      dispatch(setTotalBooksQuantity(booksData.data.totalItems));
      dispatch(setSearchParam(searchParam));
      dispatch(setSuccessLoading());
      return booksData.data;
    } catch (error) {
      //rejectWithValue(error);
      console.log(error);
      dispatch(setError(`${error}`));
    }
  }
);
export const getCurrentBookInfo = createAsyncThunk(
  "getBooks/getCurrentBookInfo",
  async ({ id }: IGetCurrentBook, { rejectWithValue, dispatch }) => {
    dispatch(setLoading());
    try {
      const currentBookInfo = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${bookApiKey}`
      );
      dispatch(getFavouriteBooksInfo());
      dispatch(setSuccessLoading());
      return currentBookInfo.data;
    } catch (error) {
      //rejectWithValue(error);
      console.log(error);
      dispatch(setError(`${error}`));
    }
  }
);
export const getFavouriteBooksInfo = createAsyncThunk(
  "getBooks/getFavouriteBooksInfo",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as IState;
      const userId = state.manageUserInfo.userId;
      const favouriteBooks = await getDoc(
        doc(db, `users/${userId}/favourites/items`)
      );
      return favouriteBooks?.data() ? favouriteBooks.data() : {};
    } catch (error) {
      console.log(error);
      //rejectWithValue(error);
    }
  }
);
export const getLastReadBooksInfo = createAsyncThunk(
  "getBooks/getLastReadBooksInfo",
  async (_, { rejectWithValue, dispatch, getState }) => {
    dispatch(setLoading());
    try {
      const state = getState() as IState;
      const userId = state.manageUserInfo.userId;
      const lastReadBooks = await getDoc(
        doc(db, `users/${userId}/recent/items`)
      );
      dispatch(setSuccessLoading());
      return lastReadBooks.data()?.recent ? lastReadBooks.data()!.recent : [];
    } catch (error) {
      //rejectWithValue(error);
      console.log(error);
    }
  }
);
export const setLastReadBooksFB = createAsyncThunk(
  "getBooks/getLastReadBooksInfo",
  async (book: IBook, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as IState;
      const lastRead: IBook[] = state.getBooks.lastReadBooks;
      const userId = state.manageUserInfo.userId;
      const isInTheList =
        lastRead.findIndex((item: IBook) => item.id === book.id) === -1;
      if (isInTheList) {
        const newLastRead = [...lastRead, book];
        if (newLastRead.length > 6) {
          newLastRead.splice(0, 1);
        }
        await setDoc(doc(db, `users/${userId}/recent/items`), {
          recent: newLastRead,
        });
      } else {
        const newLastRead = lastRead.filter(
          (item: IBook) => item.id !== book.id
        );
        newLastRead.push(book);
        await setDoc(doc(db, `users/${userId}/recent/items`), {
          recent: newLastRead,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: IBooksInfo = {
  books: [],
  currentBook: {},
  feedBack: [],
  searchParam: "",
  totalBookQuantity: 0,
  favouriteBooks: {},
  lastReadBooks: [],
};

export const getBookSlice = createSlice({
  name: "getBooks",
  initialState,
  reducers: {
    setTotalBooksQuantity: (
      state: IBooksInfo,
      action: PayloadAction<number>
    ) => {
      state.totalBookQuantity = action.payload;
    },
    setSearchParam: (state: IBooksInfo, action: PayloadAction<string>) => {
      state.searchParam = action.payload;
    },
    setCurrentBook: (state: IBooksInfo, action: PayloadAction<string>) => {
      state.currentBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksBySearchParam.fulfilled, (state, action) => {
      state.books = missingData(action.payload);
    });
    builder.addCase(getBooksByGenre.fulfilled, (state, action) => {
      state.books = missingData(action.payload);
    });
    builder.addCase(getCurrentBookInfo.fulfilled, (state, action) => {
      state.currentBook = bookAdapter(action.payload);
    });
    builder.addCase(getFavouriteBooksInfo.fulfilled, (state, action) => {
      state.favouriteBooks = action.payload;
    });
    builder.addCase(getLastReadBooksInfo.fulfilled, (state, action) => {
      state.lastReadBooks = action.payload;
    });
  },
});

export const { setTotalBooksQuantity, setSearchParam, setCurrentBook } =
  getBookSlice.actions;

export default getBookSlice.reducer;
