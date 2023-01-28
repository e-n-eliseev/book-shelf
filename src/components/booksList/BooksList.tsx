import uniqid from "uniqid";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Loader from "../UIComponents/Loader";
import { translate } from "../../helpers/genres";
import { IBook1 } from "../../types/types";
import { getError, getLoading } from "../../store/selectors/commonSelectors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getBooks, getSearchName, getTotalQuantity } from "../../store/selectors/bookSelectors";
import { getBooksBySearchParam } from "../../store/slices/getBookSlice";
import { BookCard } from "../card/BookCard";

export const BooksList: FC<IBook1> = ({ genre }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const books = useAppSelector(getBooks, shallowEqual);
    const error = useAppSelector(getError);
    const loading = useAppSelector(getLoading);
    const searchName = useSelector(getSearchName);
    const totalBookQuantity = useSelector(getTotalQuantity);

    const pages = Math.ceil(totalBookQuantity / 27);
    const currentPage = genre ? +location.pathname.slice(7) : +location.pathname.slice(11);

    const [page, setPage] = useState(currentPage ? currentPage : 1);

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

    useEffect(() => {
        if (!books.length && loading === "idle") navigate(`/`)
    }, [books.length, loading])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        // genre
        //     ? dispatch(bookGenreSearchRequest(searchName, (27 * (currentPage - 1) + 1)))
        //: 
        dispatch(getBooksBySearchParam({ searchParam: searchName, startIndex: (27 * (currentPage - 1) + 1) }))
        setPage(value);
        genre ? navigate(`/genre/${value}`) : navigate(`/bookslist/${value}`);
    };

    return (

        <main className='books-list'>
            <div className="books-list__content">
                {loading === "pending"
                    ? <Loader />
                    : error
                        ? null
                        : books.length
                            ? <>
                                {!genre
                                    ? <h2 className="books-list__heading">
                                        Результаты поиска по запросу "{searchName}" представлены ниже.
                                    </h2>
                                    : <h2 className="books-list__heading">
                                        Результаты поиска по жанру <span>{translate[searchName]}</span>  представлены ниже.
                                    </h2>
                                }
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
                            : null
                }
            </div>
        </main>

    )
}