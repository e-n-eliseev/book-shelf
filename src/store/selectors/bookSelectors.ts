import type { RootState } from "../store";

export const getBooks = (state: RootState) => state.getBooks.books;
export const getTotalQuantity = (state: RootState) =>
  state.getBooks.totalBookQuantity;
export const getSearchName = (state: RootState) => state.getBooks.searchParam;
// export const getCurrentBook = (state: RootState) => state.getBook.currentBook;
