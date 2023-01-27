import type { RootState } from "../store";

export const getError = (state: RootState) => state.common.error;
export const getLoading = (state: RootState) => state.common.loading;
