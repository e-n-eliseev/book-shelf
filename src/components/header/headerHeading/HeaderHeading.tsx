import { FC } from "react";
import { Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

const HeaderHeading: FC = () => {
    return (
        <li className="header__heading">
            <Tooltip title="Нажмите для перехода на главную страницу ">
                <Link className="header__link" to={"/"}>
                    Book Shelf
                </Link >
            </Tooltip>
        </li>
    )
}

export default HeaderHeading;