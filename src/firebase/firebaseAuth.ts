import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";
import { db, firebaseApp } from "./firebase";

//состояние авторизации
export const auth = getAuth(firebaseApp);

//обработка  подписки
export const signUp = async (email: string, pass: string) => {
  await createUserWithEmailAndPassword(auth, email, pass);
};
//обработка авторизации
export const logIn = async (email: string, pass: string) => {
  await signInWithEmailAndPassword(auth, email, pass);
};
//выход
export const logOut = async () => {
  await signOut(auth);
};

//ссылка на документ пользователя
export const userId = auth.currentUser?.uid;
export const docRef = doc(db, "users", `${userId}`);
export const docRefFavourites = doc(db, "users", `${userId}/favourites/items`);

export const reauthenticate = async (password: string) => {
  const credential = EmailAuthProvider.credential(
    `${auth.currentUser!.email}`,
    password
  );
  if (auth.currentUser) {
    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );
    return result;
  }
};
