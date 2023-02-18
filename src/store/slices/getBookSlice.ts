import {
  IBook,
  IBooksInfo,
  IGetBook,
  IGetBooks,
  IGetCurrentBook,
  ICommonInfo,
  IBookComment,
  IObjectBase,
} from "./../../types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { bookApiKey } from "../../firebase/firebaseConfig";
import { maxResults } from "../../helpers/vars";
import {
  setError,
  setIdle,
  setLoading,
  setSuccessLoading,
} from "./commonSlice";
import { bookAdapter, missingData } from "../../helpers/bookSearch";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const getBooksBySearchParam = createAsyncThunk(
  "getBooks/getBooksBySearchParam",
  async ({ searchParam, startIndex, sortParam }: IGetBooks, { dispatch }) => {
    dispatch(setLoading());
    try {
      const booksData = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchParam}${sortParam}&key=${bookApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
      );
      dispatch(setTotalBooksQuantity(booksData.data.totalItems));
      dispatch(setSearchParam(searchParam));
      dispatch(setSuccessLoading());
      return booksData.data;
    } catch (error) {
      console.log(error);
      dispatch(setError(`${error}`));
    } finally {
      setTimeout(() => dispatch(setIdle()), 2000);
    }
  }
);
export const getBooksByGenre = createAsyncThunk(
  "getBooks/getBooksByGenre",
  async ({ searchParam, startIndex, sortParam }: IGetBooks, { dispatch }) => {
    dispatch(setLoading());
    try {
      const booksData = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${searchParam}${sortParam}&key=${bookApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
      );
      dispatch(setTotalBooksQuantity(booksData.data.totalItems));
      dispatch(setSearchParam(searchParam));
      dispatch(setSuccessLoading());
      return booksData.data;
    } catch (error) {
      console.log(error);
      dispatch(setError(`${error}`));
    } finally {
      setTimeout(() => dispatch(setIdle()), 2000);
    }
  }
);
export const getBooksByCategory = createAsyncThunk(
  "getBooks/getBooksByCategory",
  async ({ searchParam, startIndex }: IGetBook, { dispatch }) => {
    try {
      const booksData = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${searchParam}&key=${bookApiKey}&maxResults=3&startIndex=${startIndex}`
      );
      return booksData.data;
    } catch (error) {
      console.log(error);
      dispatch(setError(`${error}`));
    } finally {
      setTimeout(() => dispatch(setIdle()), 2000);
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
      return currentBookInfo.data;
    } catch (error) {
      console.log(error);
      dispatch(setError(`${error}`));
    } finally {
      setTimeout(() => dispatch(setIdle()), 2000);
    }
  }
);
export const getFavouriteBooksInfo = createAsyncThunk(
  "getBooks/getFavouriteBooksInfo",
  async (_, { getState }) => {
    try {
      const state = getState() as ICommonInfo;
      const userId =
        localStorage.getItem("userID") || state.manageUserInfo.userId;
      if (!userId) return {};
      const favouriteBooks = await getDoc(
        doc(db, `users/${userId}/favourites/items`)
      );
      return favouriteBooks?.data() ? favouriteBooks.data() : {};
    } catch (error) {
      console.log(error);
    }
  }
);
export const getLastReadBooksInfo = createAsyncThunk(
  "getBooks/getLastReadBooksInfo",
  async (_, { dispatch, getState }) => {
    dispatch(setLoading());
    try {
      const state = getState() as ICommonInfo;
      const userId =
        localStorage.getItem("userID") || state.manageUserInfo.userId;
      if (!userId) return [];
      const lastReadBooks = await getDoc(
        doc(db, `users/${userId}/recent/items`)
      );
      dispatch(setSuccessLoading());
      return lastReadBooks.data()?.recent ? lastReadBooks.data()!.recent : [];
    } catch (error) {
      console.log(error);
    }
  }
);
export const setLastReadBooksFB = createAsyncThunk(
  "getBooks/setLastReadBooksFB",
  async (book: IBook, { dispatch, getState }) => {
    try {
      dispatch(getLastReadBooksInfo());
      const state = getState() as ICommonInfo;
      const lastRead = state.getBooks.lastReadBooks;
      const userId =
        localStorage.getItem("userID") || state.manageUserInfo.userId;
      if (!userId) return;
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
export const setBookCommentFB = createAsyncThunk(
  "getBooks/setBookCommentFB",
  async ({ bookId, comment }: IObjectBase, { dispatch, getState }) => {
    try {
      const state = getState() as ICommonInfo;
      const userNick = state.manageUserInfo.nick || "UFO";
      const userId =
        localStorage.getItem("userID") || state.manageUserInfo.userId;
      await setDoc(
        doc(db, `books/${bookId}`),
        { [userId]: [userNick, comment] },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  }
);
export const getBookCommentsFB = createAsyncThunk(
  "getBooks/getBookCommentsFB",
  async (bookId: string, { dispatch }) => {
    try {
      const bookComments = await getDoc(doc(db, `books/${bookId}`));
      const comments = bookComments?.data() || {};
      dispatch(setBookComment(comments));
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: IBooksInfo = {
  lastReadBooks: [],
  books: [],
  currentBook: {},
  searchParam: "",
  totalBookQuantity: 0,
  favouriteBooks: {},
  sortParam: "",
  currentBookComment: {},
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
    setCurrentBook: (state: IBooksInfo, action: PayloadAction<IBook>) => {
      state.currentBook = action.payload;
    },
    setSortParam: (state: IBooksInfo, action: PayloadAction<string>) => {
      state.sortParam = action.payload;
    },
    setBookComment: (
      state: IBooksInfo,
      action: PayloadAction<IBookComment>
    ) => {
      state.currentBookComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksBySearchParam.fulfilled, (state, action) => {
      state.books = missingData(action.payload);
    });
    builder.addCase(getBooksByGenre.fulfilled, (state, action) => {
      state.books = missingData(action.payload);
    });
    builder.addCase(getBooksByCategory.fulfilled, (state, action) => {
      state.books = missingData(action.payload);
    });
    builder.addCase(getCurrentBookInfo.fulfilled, (state, action) => {
      state.currentBook = bookAdapter(action.payload);
    });
    builder.addCase(getFavouriteBooksInfo.fulfilled, (state, action) => {
      state.favouriteBooks = action.payload || {};
    });
    builder.addCase(getLastReadBooksInfo.fulfilled, (state, action) => {
      state.lastReadBooks = action.payload;
    });
  },
});

export const {
  setTotalBooksQuantity,
  setSearchParam,
  setCurrentBook,
  setSortParam,
  setBookComment,
} = getBookSlice.actions;

export default getBookSlice.reducer;
