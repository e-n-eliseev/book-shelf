import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { FC } from "react";

const HomeButton: FC = () => {
    return (
        <Tooltip title="На главную страницу">
            <Link to={"/"}>
                <HomeIcon color='secondary' sx={{ fontSize: "50px" }} />
            </Link>
        </Tooltip>
    )
}

export default HomeButton;