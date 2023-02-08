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
    setLoading: (state: IStatus) => {
      state.loading = ILoadingStatus.PENDING;
      state.error = null;
    },
    setError: (state: IStatus, action: PayloadAction<string>) => {
      state.loading = ILoadingStatus.ERROR;
      state.error = action.payload;
    },
    setSuccessLoading: (state: IStatus) => {
      state.loading = ILoadingStatus.SUCCESS;
    },
    setIdle: (state: IStatus) => {
      state.loading = ILoadingStatus.IDLE;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setSuccessLoading, setIdle } =
  commonSlice.actions;

export default commonSlice.reducer;
