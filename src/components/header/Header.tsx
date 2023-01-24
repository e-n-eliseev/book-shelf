import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { FC } from "react"

import { Link } from "react-router-dom";

import logo from "../../assets/bookLogo.svg";
import { useState } from 'react';

export const Header: FC = () => {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <header className="header">
            <div className="header__content">
                <ul className="header__left">
                    <li className="header__logo">
                        <img className="header__img" src={logo} alt="Logo" />
                    </li>
                    <li className="header__heading">
                        <Tooltip title="Нажмите для перехода на главную страницу ">
                            <Link className="header__link" to={"/"}>
                                BookLib
                            </Link >
                        </Tooltip>
                    </li>
                    <li className="header__genre">
                        <Tooltip title="Нажмите для перехода на страницу с полным списком жанров">
                            <Link className="header__link" to={"/"}>
                                Жанры
                            </Link >
                        </Tooltip>
                    </li>
                </ul>
                <div className="header__right">
                    <Tooltip title="Нажмите для входа в профиль">
                        <Link to={"/"}>
                            <IconButton sx={{ size: "large", color: 'white' }}>
                                <LoginIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </header >
    );
};
