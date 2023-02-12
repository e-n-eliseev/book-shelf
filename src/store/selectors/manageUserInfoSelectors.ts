import type { RootState } from "../store";

export const getUserId = (state: RootState) => state.manageUserInfo.userId;
export const getPhoneNumber = (state: RootState) =>
  state.manageUserInfo.phoneNumber;
export const getNick = (state: RootState) => state.manageUserInfo.nick;
export const getEmail = (state: RootState) => state.manageUserInfo.email;
export const getPhotoURL = (state: RootState) => state.manageUserInfo.photoURL;
