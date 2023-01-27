import { FormEventHandler, Dispatch, SetStateAction } from "react";

export interface IAuthProps {
  authed?: boolean;
}

export interface ILogIn {
  login: string;
  pass: string;
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
  books: any[];
  currentBook: any;
  feedBack: Array<string>;
  searchParam: string;
  totalBookQuantity: number;
}
export type Info = string | boolean | number;
export type DBInfo = string | null | undefined;

export interface IBook1 {
  [key: string]: Info;
}

export interface ISubmit {
  onSubmit: ({ login, pass }: ILogIn) => Promise<void>;
}

export interface IForm {
  children: React.ReactNode;
  onSubmit: FormEventHandler;
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
