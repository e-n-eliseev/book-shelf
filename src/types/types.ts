import { FormEventHandler, Dispatch, SetStateAction } from "react";
import { RootState } from "../store/store";

export interface IAuthProps {
  authed?: string | boolean;
}

export interface IState {
  common: IStatus;
  getBooks: IBooksInfo;
  manageUserInfo: IUserInfo;
}
export interface ILogIn {
  email: string;
  pasw: string;
}
export enum ILoadingStatus {
  IDLE = "idle",
  SUCCESS = "success",
  ERROR = "error",
  PENDING = "pending",
}

export interface IStatus {
  loading: string;
  error: null | string;
}
export interface IBooksInfo {
  books: any;
  favouriteBooks: any;
  currentBook: any;
  lastReadBooks: any;
  feedBack: Array<string>;
  searchParam: string;
  totalBookQuantity: number;
}
export type Info = string | boolean | number;
export type DBInfo = string | null | undefined;

export interface IBook1 {
  [key: string]: Info;
}
export interface IBook {
  [key: string]: any;
}

export interface ISubmit {
  onSubmit: ({ email, pasw }: ILogIn) => Promise<void>;
}

export interface IForm {
  children: React.ReactNode;
  onSubmit: FormEventHandler;
}

export interface IGetInfoDB {
  setFunction: Dispatch<SetStateAction<[]>>;
  setLoading: Dispatch<SetStateAction<string>> | null;
  path: string;
}
export interface ISetState {
  [key: string]: Dispatch<SetStateAction<string>>;
}

export interface ISubmitBtn {
  isValid: boolean;
  isChanging: boolean;
  setIsChanging: Dispatch<SetStateAction<boolean>>;
}

export interface IModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmFunction?: any;
  profile?: any;
}

export interface IGEnre {
  key: string;
  genre: string[];
}

export interface IImage {
  id: string | number;
  imgPath: string;
  label: string;
}

export interface ISlider {
  category: string;
  images: IImage[];
  delay: number;
}

export interface IGetBook {
  searchParam: string;
  startIndex: number;
}
export interface IGetCurrentBook {
  id: string;
}

export interface IButton extends IAuthProps {
  textBtn?: string;
  vision?: boolean | string;
  handleDoing?: () => void;
  children?: React.ReactNode;
}
export interface IButtonDwn extends IAuthProps {
  link: string;
}
export interface IButtonFvt extends IAuthProps {
  book: any;
}
export interface IFavouriteBookInfo {
  id: string;
  title: string;
  thumbnail: string;
}
export interface IUserInfo {
  userId: string;
  phoneNumber: string;
  nick: string;
  email: string;
  photoURL: string;
}

export interface IFavourite {
  path: string;
}
export interface IFavouriteBook {
  book: any;
}
