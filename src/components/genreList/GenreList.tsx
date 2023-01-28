import uniqid from "uniqid";
import { FC, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { genres } from "../../helpers/genres";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import GenreItem from "../genreItem/GenreItem";

export const GenreList: FC = () => {

    //количество старниц
    const pages = Math.ceil(genres.length / 9);

    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();

    const currentPage: number = +location.pathname.slice(8);

    const [page, setPage] = useState<number>(currentPage ? currentPage : 1);

    useEffect(() => {
        if (!currentPage || currentPage > pages) {
            setPage(1);
            navigate(`/genres/1`);
        }
        if (currentPage < page) {
            setPage(1);
        }
    }, [currentPage])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        navigate(`/genres/${value}`)
    };

    return (
        <main className="genre-list">
            <div className="genre-list__content">
                <h1 className="genre-list__heading">
                    Доступные жанры произведений.
                </h1>
                <div className="genre-list__list">
                    {genres.slice((page - 1) * 9, 9 * page).map(genre => <GenreItem key={uniqid()} genre={genre} />)}
                </div>
                <Pagination
                    color="secondary"
                    count={pages}
                    page={page}
                    onChange={handleChange}
                    size="large"
                    variant="outlined" />
            </div>
        </main >
    )
}