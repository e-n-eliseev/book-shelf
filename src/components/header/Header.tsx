
import { FC, memo } from "react";
import { IAuthProps } from '../../types/types';
import HeaderLogo from './headerLogo/HeaderLogo';
import HeaderHeading from './headerHeading/HeaderHeading';
import HeaderGenre from './headerGenre/HeaderGenre';
import ProfileBtn from "./profileBtn/ProfileBtn";
import LogInBtn from "./LogInBtn/LoginBtn";
import SearchForm from "../UIComponents/SearchForm";

export const Header: FC<IAuthProps> = memo(({ authed }) => {
    return (
        <header className="header">
            <div className="header__content">
                <ul className="header__left">
                    <HeaderLogo />
                    <HeaderHeading />
                    <HeaderGenre />
                </ul>
                <div className="header__right">
                    <SearchForm />
                    {authed
                        ? <ProfileBtn />
                        : <LogInBtn />
                    }
                </div>
            </div>
        </header >
    );
});
