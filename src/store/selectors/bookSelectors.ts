import type { RootState } from "../store";

export const getBooks = (state: RootState) => state.getBooks.books;
export const getTotalQuantity = (state: RootState) =>
  state.getBooks.totalBookQuantity;
export const getSearchName = (state: RootState) => state.getBooks.searchParam;
export const getCurrentBook = (state: RootState) => state.getBooks.currentBook;
export const getFavouriteBooks = (state: RootState) =>
  state.getBooks.favouriteBooks;
export const getLastReadBooks = (state: RootState) =>
  state.getBooks.lastReadBooks;
export const getSortParam = (state: RootState) => state.getBooks.sortParam;
export const getBookComments = (state: RootState) =>
  state.getBooks.currentBookComment;
