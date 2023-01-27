import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

//состояние авторизации
export const auth = getAuth(firebaseApp);
export const userId = auth.currentUser?.uid;
console.log(userId);

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
