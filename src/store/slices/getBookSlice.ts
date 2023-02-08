import { IBooksInfo, IGetBook, IGetCurrentBook } from "./../../types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { bookApiKey } from "../../firebase/firebaseConfig";
import { maxResults } from "../../helpers/vars";
import { setError, setLoading, setSuccessLoading } from "./commonSlice";
import { bookAdapter, missingData } from "../../helpers/bookSearch";
import { doc, getDoc } from "firebase/firestore";
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
      console.log(booksData);
      return booksData.data;
    } catch (error) {
      //rejectWithValue(error);
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
      dispatch(setSuccessLoading());
      console.log(currentBookInfo);
      return currentBookInfo.data;
    } catch (error) {
      //rejectWithValue(error);
      dispatch(setError(`${error}`));
    }
  }
);
export const getFavouriteBooksInfo = createAsyncThunk(
  "getBooks/getFavouriteBooksInfo",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const favouriteBooks = await getDoc(
        doc(db, `users/Ecq6HrbY5cPKtGhcrJN7UrJkTxq2/favourites/items`)
      );
      console.log(favouriteBooks.data());
      return favouriteBooks.data();
    } catch (error) {
      //rejectWithValue(error);
      dispatch(setError(`${error}`));
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
  },
});

export const { setTotalBooksQuantity, setSearchParam, setCurrentBook } =
  getBookSlice.actions;

export default getBookSlice.reducer;
