import BasicButton from "../UIComponents/BasicButton";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { shallowEqual } from "react-redux";
import ReadBtn from './readBtn/ReadBtn';
import FavoriteBtn from './favouriteBtn/FavouriteBtn';
import DownloadBtn from './downloadBtn/DownloadBtn';
import { getError, getLoading } from '../../store/selectors/commonSelectors';
import Loader from '../UIComponents/Loader';
import { FC, useEffect, useLayoutEffect } from 'react';
import { DBInfo, IAuthProps, IBook, IObjectBase } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getBookComments, getCurrentBook } from "../../store/selectors/bookSelectors";
import { getBookCommentsFB, getCurrentBookInfo, getFavouriteBooksInfo } from "../../store/slices/getBookSlice";
import { bookInfoAdapter } from "../../helpers/bookInfoAdapter";
import ProgressiveImage from "react-progressive-graceful-image";
import loadingImg from "../../assets/loading.gif";
import { BasicRating } from "../UIComponents/BasicRating";
import BasicTabs from "../UIComponents/BasicTabs";
import RecommendedBooks from "../recommendedBooks/recommendedBooks";
import { LeaveFeedback } from "./leaveFeedback/LeaveFeedback";


export const BookPage: FC<IAuthProps> = ({ authed }) => {

    const params: Readonly<Params<string>> = useParams();
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const error = useAppSelector<DBInfo>(getError);
    const loading = useAppSelector<string>(getLoading);
    const currentBook = useAppSelector<IBook>(getCurrentBook, shallowEqual);
    const comments = useAppSelector(getBookComments);

    let book: IObjectBase = {};

    useLayoutEffect(() => {
        dispatch(getCurrentBookInfo({ id: `${params.id}` }));
        dispatch(getFavouriteBooksInfo());
        dispatch(getBookCommentsFB(params?.id ? params?.id : ""));
    }, [params.id])


    if (Object.keys(currentBook).length) {
        book = bookInfoAdapter(currentBook);
    }

    useEffect(() => {
        if (error) navigate(`/404`)
    }, [error])

    return (
        <main className="bookPage">
            <div className="bookPage__wrapper">
                {
                    loading === "pending"
                        ? <Loader />
                        : Object.keys(book).length
                            ? <>
                                <section className="bookPage__info">
                                    <div className="bookPage__img-wrapper">
                                        <ProgressiveImage
                                            src={book.thumbnail}
                                            placeholder={loadingImg}
                                        >
                                            {(src, loading) => <img style={{ opacity: loading ? 0 : 1 }} className="bookPage__img" src={src} alt="BookImage" />}
                                        </ProgressiveImage>
                                    </div>
                                    <div className="bookPage__content" >
                                        <h1 className="bookPage__heading">{book.title}</h1>
                                        <p className="bookPage__text">Категория: {book.categories}</p>
                                        <p className="bookPage__text">Авторы: {book.authors}</p>
                                        <p className="bookPage__text">Год: {book.publishedDate}</p>
                                        <BasicRating
                                            averageRating={+book.averageRating}
                                        />
                                        <div className="bookPage__buttons">
                                            <FavoriteBtn authed={authed}
                                                book={book} />
                                            <ReadBtn book={book} />
                                            <DownloadBtn authed={authed}
                                                link={book.link ? book.link : ""} />
                                            <LeaveFeedback authed={authed} bookId={params?.id ? params?.id : ""} comments={comments} />
                                            <BasicButton textBtn={"КУПИТЬ"} authed={false} />
                                        </div>
                                    </div>
                                </section>
                                <BasicTabs
                                    authed={authed}
                                    data={book.description}
                                    comments={comments}
                                />
                                <RecommendedBooks
                                    categories={book.categories === "Нет информации" ? book.title : book.categories} />
                            </>
                            : null
                }
            </div>
        </main >
    )
}