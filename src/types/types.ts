import { FormEventHandler } from "react";

export interface IAuthProps {
  authed?: boolean;
}

export interface ILogIn {
  login: string;
  pass: string;
}

export interface ISubmit {
  onSubmit: ({ login, pass }: ILogIn) => Promise<void>;
}

export interface IForm {
  children: React.ReactNode;
  onSubmit: FormEventHandler;
}
