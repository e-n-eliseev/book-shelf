import { FC } from "react";
import { Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

const HeaderGenre: FC = () => {
    return (
        <li className="header__genre">
            <Tooltip title="Нажмите для перехода на страницу с полным списком жанров">
                <Link className="header__link" to={"/genres/:id"}>
                    Жанры
                </Link >
            </Tooltip>
        </li>
    )
}

export default HeaderGenre;