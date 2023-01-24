import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { auth } from "./firebaseAuth";
import { firebaseConfig } from "./firebaseConfig";

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);

//эндпоинты обращения к данным базы
export const getUserByUserId = (userId: string) => ref(db, `user/${userId}`);
export const getUserInfoByUserId = (userId: string) =>
  ref(db, `user/${userId}/info`);
export const getUserFavouritesByUserId = (userId: string) =>
  ref(db, `user/${userId}/favourites`);
export const getUserLastReadByUserId = (userId: string) =>
  ref(db, `user/${userId}/last`);
export const getCommentsByBookId = (bookId: string) =>
  ref(db, `book/${bookId}`);
