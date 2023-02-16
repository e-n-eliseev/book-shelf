import { FC } from "react"
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { logOut } from "../../../firebase/firebaseAuth";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from "react-router-dom";


const ProfileBtn: FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const navigate = useNavigate()

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        navigate("/");
        logOut();
    }
    return (
        <>
            <Tooltip title="Открыть меню профиля">
                <IconButton onClick={handleOpenUserMenu} sx={{ size: "large", color: 'white' }}>
                    <AccountBoxIcon />
                </IconButton>
            </Tooltip><Tooltip title="Нажмите для выхода из профиля">
                <IconButton onClick={handleLogOut} sx={{ size: "large", color: 'white' }}>
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Link className="header__profile-link" to={"/profilepage"}>
                        Профиль
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Link className="header__profile-link" to={"/favourites"}>
                        Избранное
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileBtn;