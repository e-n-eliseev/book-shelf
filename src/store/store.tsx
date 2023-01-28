import { configureStore } from '@reduxjs/toolkit'
import common from "./slices/commonSlice";
import getBooks from "./slices/getBookSlice";

export const store = configureStore({
  reducer: {
    common,
    getBooks
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch