import { Navigate, Outlet } from "react-router";
import { IAuthProps } from "../../types/types";
import { FC } from "react";

export const PublicRoute: FC<IAuthProps> = ({ authed }) =>
    !authed ? <Outlet /> : <Navigate to="/" replace />;