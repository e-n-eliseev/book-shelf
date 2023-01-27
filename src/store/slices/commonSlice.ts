import { ILoadingStatus, IStatus } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IStatus = {
  loading: ILoadingStatus.IDLE,
  error: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    loading: (state: IStatus, action: PayloadAction<string>) => ({
      loading: ILoadingStatus.PENDING,
      error: null,
    }),
    error: (state: IStatus, action: PayloadAction<string>) => ({
      loading: ILoadingStatus.ERROR,
      error: action.payload,
    }),
    successLoaing: (state: IStatus, action: PayloadAction<string>) => ({
      loading: ILoadingStatus.SUCCESS,
      error: null,
    }),
  },
});

export const { loading, error, successLoaing } = commonSlice.actions;

export default commonSlice.reducer;
