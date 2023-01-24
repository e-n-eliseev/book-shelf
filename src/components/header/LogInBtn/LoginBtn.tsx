import { FC } from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom";


const LogInBtn: FC = () => {
    return (
        <Tooltip title="Нажмите для входа в профиль">
            <Link to={"/login"}>
                <IconButton sx={{ size: "large", color: 'white' }}>
                    <LoginIcon />
                </IconButton>
            </Link>
        </Tooltip>
    )
}

export default LogInBtn;