
import { FC } from "react";
import { IAuthProps } from '../../types/types';
import HeaderLogo from './headerLogo/HeaderLogo';
import HeaderHeading from './headerHeading/HeaderHeading';
import HeaderGenre from './headerGenre/HeaderGenre';
import ProfileBtn from "./profileBtn/ProfileBtn";
import LogInBtn from "./LogInBtn/LoginBtn";

export const Header: FC<IAuthProps> = ({ authed }) => {
    return (
        <header className="header">
            <div className="header__content">
                <ul className="header__left">
                    <HeaderLogo />
                    <HeaderHeading />
                    <HeaderGenre />
                </ul>
                <div className="header__right">
                    {authed
                        ? <ProfileBtn />
                        : <LogInBtn />
                    }
                </div>
            </div>
        </header >
    );
};
