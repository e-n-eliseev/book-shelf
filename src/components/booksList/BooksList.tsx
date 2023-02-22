import uniqid from "uniqid";
import { shallowEqual } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Loader from "../UIComponents/Loader";
import { translate } from "../../helpers/genres";
import { IBookBase } from "../../types/types";
import { getError, getLoading } from "../../store/selectors/commonSelectors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getBooks, getSearchName, getSortParam, getTotalQuantity } from "../../store/selectors/bookSelectors";
import { getBooksByGenre, getBooksBySearchParam } from "../../store/slices/getBookSlice";
import { BookCard } from "../card/BookCard";
import SortBar from "./sortBar/SortBar";

export const BooksList: FC<IBookBase> = ({ genre }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const books = useAppSelector(getBooks, shallowEqual);
    const error = useAppSelector(getError);
    const loading = useAppSelector(getLoading);
    const sortParam = useAppSelector(getSortParam);
    const searchName = useAppSelector(getSearchName);
    const totalBookQuantity = useAppSelector(getTotalQuantity);

    const pages = Math.ceil(totalBookQuantity / 27);
    const currentPage = genre ? +location.pathname.slice(7) : +location.pathname.slice(11);

    const [page, setPage] = useState(currentPage ? currentPage : 1);

    useEffect(() => {
        genre
            ? dispatch(getBooksByGenre({ searchParam: searchName, startIndex: (27 * (page - 1) + 1), sortParam }))
            : dispatch(getBooksBySearchParam({ searchParam: searchName, startIndex: (27 * (page - 1) + 1), sortParam }))
    }, [searchName])

    useEffect(() => {
        if (!currentPage || currentPage > pages) {
            setPage(1);
            genre ? navigate(`/genre/1`) : navigate(`/bookslist/1`);
        }
        if (currentPage < page) {
            setPage(1);
        }
    }, [currentPage])

    useEffect(() => {
        if (error) navigate(`/404`)
    }, [error])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        genre
            ? dispatch(getBooksByGenre({ searchParam: searchName, startIndex: (27 * (value - 1) + 1), sortParam }))
            : dispatch(getBooksBySearchParam({ searchParam: searchName, startIndex: (27 * (value - 1) + 1), sortParam }))
        genre ? navigate(`/genre/${value}`) : navigate(`/bookslist/${value}`);
    };

    return (
        <main className='books-list'>
            <div className="books-list__content">
                {loading === "pending"
                    ? <Loader />
                    : error
                        ? null
                        : books?.length
                            ? <>
                                {!genre
                                    ? <h2 className="books-list__heading">
                                        Результаты поиска по запросу <span>{searchName}</span>  представлены ниже.
                                    </h2>
                                    : <h2 className="books-list__heading">
                                        Результаты поиска по жанру <span>{translate[searchName]}</span>  представлены ниже.
                                    </h2>
                                }
                                <SortBar genre={genre} />
                                <div className="books-list__list">
                                    {books.map((book: any) => (
                                        <BookCard key={uniqid()} book={book} />
                                    ))}
                                </div>
                                {pages === 1
                                    ? null
                                    : < Pagination
                                        color="secondary"
                                        count={pages}
                                        page={page}
                                        onChange={handleChange}
                                        size="medium"
                                        variant="outlined" />
                                }
                            </>
                            : <h2 className="books-list__heading">
                                По данному запросу не найдено ни одной книги.
                            </h2>
                }
            </div>
        </main>

    )
}