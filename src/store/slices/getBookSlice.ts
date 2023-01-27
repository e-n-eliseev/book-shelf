import { IBooksInfo } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IBooksInfo = {
  books: [],
  currentBook: {},
  feedBack: [],
  searchParam: "",
  totalBookQuantity: 0,
};

export const getBookSlice = createSlice({
  name: "getBook",
  initialState,
  reducers: {},
});

export const {} = getBookSlice.actions;

export default getBookSlice.reducer;
