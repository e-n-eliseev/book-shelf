import { ILogIn } from "../../types/types";
import { IUserInfo } from "../../types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  setError,
  setIdle,
  setLoading,
  setSuccessLoading,
} from "./commonSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";

export const getSignUp = createAsyncThunk(
  "getBooks/getSignUp",
  async ({ email, pasw }: ILogIn, { rejectWithValue, dispatch }) => {
    dispatch(setLoading());
    try {
      await createUserWithEmailAndPassword(auth, email, pasw);
      dispatch(setSuccessLoading());
    } catch (error) {
      //rejectWithValue(error);
      dispatch(setError(`${error}`));
    } finally {
      setTimeout(() => dispatch(setIdle()), 2000);
    }
  }
);
export const getSignIn = createAsyncThunk(
  "getBooks/getSignIn",
  async ({ email, pasw }: ILogIn, { rejectWithValue, dispatch }) => {
    dispatch(setLoading());
    try {
      await signInWithEmailAndPassword(auth, email, pasw);
      dispatch(setSuccessLoading());
    } catch (error) {
      //rejectWithValue(error);
      dispatch(setError(`${error}`));
    } finally {
      setTimeout(() => dispatch(setIdle()), 2000);
    }
  }
);
export const getPhoneFromFb = createAsyncThunk(
  "getBooks/getPhoneFromFb",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const userId = auth.currentUser?.uid;
      const docRef = doc(db, "users", `${userId}`);
      const phoneDoc = await getDoc(docRef);
      if (phoneDoc) {
        dispatch(setPhoneNumber(phoneDoc.data()!.phoneNumber));
      }
    } catch (error) {
      //rejectWithValue(error);
      dispatch(setError(`${error}`));
    } finally {
      setTimeout(() => dispatch(setIdle()), 2000);
    }
  }
);

const initialState: IUserInfo = {
  userId: "",
  phoneNumber: "",
  nick: "",
  email: "",
  photoURL: "",
};

export const manageUserInfo = createSlice({
  name: "manageUserInfo",
  initialState,
  reducers: {
    setUserId: (state: IUserInfo, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setPhoneNumber: (state: IUserInfo, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setNick: (state: IUserInfo, action: PayloadAction<string>) => {
      state.nick = action.payload;
    },
    setEmail: (state: IUserInfo, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhotoURL: (state: IUserInfo, action: PayloadAction<string>) => {
      state.photoURL = action.payload;
    },
  },
});

export const { setUserId, setPhoneNumber, setNick, setEmail, setPhotoURL } =
  manageUserInfo.actions;

export default manageUserInfo.reducer;
