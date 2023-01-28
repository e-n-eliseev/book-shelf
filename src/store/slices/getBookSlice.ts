import { IBooksInfo, IGetBook, Info } from "./../../types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { bookApiKey } from "../../firebase/firebaseConfig";
import { maxResults } from "../../helpers/vars";
import { setError, setLoading, setSuccessLoading } from "./commonSlice";
import { missingData } from "../../helpers/bookSearch";

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

const initialState: IBooksInfo = {
  books: [],
  currentBook: {},
  feedBack: [],
  searchParam: "",
  totalBookQuantity: 0,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksBySearchParam.fulfilled, (state, action) => {
      state.books = missingData(action.payload);
    });
  },
});

export const { setTotalBooksQuantity, setSearchParam } = getBookSlice.actions;

export default getBookSlice.reducer;
