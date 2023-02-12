import uniqid from "uniqid";
import { useEffect, FC } from 'react';
import FavouriteBookCard from "../favouriteBookCard/FavouriteBookCard";
import Loader from "../../UIComponents/Loader";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getFavouriteBooksInfo, getLastReadBooksInfo } from "../../../store/slices/getBookSlice";
import { getLoading } from "../../../store/selectors/commonSelectors";
import { getFavouriteBooks, getLastReadBooks } from "../../../store/selectors/bookSelectors";
import { IFavourite } from "../../../types/types";
import { shallowEqual } from "react-redux";

const Favourites: FC<IFavourite> = ({ path }) => {

    const data = useAppSelector(path === "recent" ? getLastReadBooks : getFavouriteBooks, shallowEqual);
    const loading = useAppSelector(getLoading);
    const dispatch = useAppDispatch();

    let books = path === "recent" ? data : Object?.values(data)

    useEffect(() => {
        dispatch(path === "recent" ? getLastReadBooksInfo() : getFavouriteBooksInfo())
    }, [])

    return (
        <div className={`favourites__${path}`}>
            <h2 className={`favourites__${path}-heading`}>
                {path === "favourites" ? `Избранное` : `Недавно открытые для чтения`}
            </h2>

            <div className={`favourites__${path}-list`}>
                {loading === "pending"
                    ? <Loader />
                    : books?.length
                        ? books.map((book: any) => (
                            <FavouriteBookCard key={uniqid()} book={book} />
                        ))
                        : "Список пуст"
                }
            </div>
        </div >
    )
}

export default Favourites;