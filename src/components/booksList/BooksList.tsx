import uniqid from "uniqid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import Pagination from '@mui/material/Pagination';
import Loader from "../UIComponents/Loader";
import { translate } from "../../helpers/genres";
import { IBook1 } from "../../types/types";
import { getError, getLoading } from "../../store/selectors/commonSelectors";

export const BooksList: FC<IBook1> = ({ genre }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const error = useSelector(getError);
    const loading = useSelector(getLoading);


    // const pages = Math.ceil(totalBookQuantity / 27);
    const pages = 1
    const currentPage = genre ? +location.pathname.slice(7) : +location.pathname.slice(11);

    const [page, setPage] = useState(currentPage ? currentPage : 1);

    const [sortParam, setSortParam] = useState('');

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

    // useEffect(() => {
    //     if (!books.length && loading === "idle") navigate(`/`)
    // }, [books.length, loading])

    // const handleChange = (event, value) => {
    //     genre
    //         ? dispatch(bookGenreSearchRequest(searchName, (27 * (currentPage - 1) + 1), sortParam))
    //         : dispatch(bookSearchRequest(searchName, (27 * (currentPage - 1) + 1), sortParam))
    //     setPage(value);
    //     genre ? navigate(`/genre/${value}`) : navigate(`/bookslist/${value}`);
    // };

    return (

        <main className='books-list'>
        </main>

    )
}