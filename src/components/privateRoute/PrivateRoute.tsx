import { Navigate, Outlet } from "react-router";
import { IAuthProps } from "../../types/types";
import { FC } from "react";

export const PrivateRoute: FC<IAuthProps> = ({ authed }) =>
  authed ? <Outlet /> : <Navigate to="/LogIn" />;
