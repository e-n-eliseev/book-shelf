import BasicButton from "../UIComponents/BasicButton";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { shallowEqual } from "react-redux";
import ReadBtn from './readBtn/ReadBtn';
import FavoriteBtn from './favouriteBtn/FavouriteBtn';
import RecommendedBooks from "../recommendedBooks/recommendedBooks";
import DownloadBtn from './downloadBtn/DownloadBtn';
import { getError, getLoading } from '../../store/selectors/commonSelectors';
import Loader from '../UIComponents/Loader';
import { FC, useEffect } from 'react';
import sample from "../../assets/sample.jpg";
import { DBInfo, IAuthProps, IBook } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getCurrentBook } from "../../store/selectors/bookSelectors";
import { getCurrentBookInfo } from "../../store/slices/getBookSlice";

export const BookPage: FC<IAuthProps> = ({ authed }) => {

    const params: Readonly<Params<string>> = useParams();
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const error = useAppSelector<DBInfo>(getError);
    const loading = useAppSelector<string>(getLoading);
    const currentBook = useAppSelector<IBook>(getCurrentBook, shallowEqual);

    let title, categories, authors, publishedDate, description, img, id, link, averageRating, ratingsCount;
    useEffect(() => {
        dispatch(getCurrentBookInfo({ id: `${params.id}` }))
    }, [])

    if (Object.keys(currentBook).length) {
        title = currentBook?.volumeInfo.title;
        categories = currentBook?.volumeInfo.categories;
        authors = currentBook?.volumeInfo.authors;
        publishedDate = currentBook?.volumeInfo.publishedDate;
        description = currentBook?.volumeInfo?.description || currentBook!.volumeInfo.subtitle;
        img = currentBook?.volumeInfo.imageLinks?.thumbnail || sample;
        id = currentBook?.id;
        link = currentBook?.accessInfo.epub?.downloadLink;
        averageRating = currentBook?.volumeInfo.averageRating;
        ratingsCount = currentBook?.volumeInfo.ratingsCount;
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
                        : Object.keys(currentBook).length
                            ? <>
                                <div className="bookPage__info">
                                    <div className="bookPage__img-wrapper">
                                        <img className="bookPage__img" src={img} alt="BookImage" />
                                    </div>
                                    <div className="bookPage__content" >
                                        <h1 className="bookPage__heading">{title ? title : "Нет информации"}</h1>
                                        <p className="bookPage__text">Категория: {categories ? categories : "Нет информации"}</p>
                                        <p className="bookPage__text">Авторы: {authors ? authors : "Нет информации"}</p>
                                        <p className="bookPage__text">Год: {publishedDate ? publishedDate : "Нет информации"}</p>
                                        <div className="bookPage__buttons">
                                            <FavoriteBtn authed={authed}
                                                book={currentBook} />
                                            <ReadBtn book={currentBook} />
                                            <DownloadBtn authed={authed}
                                                link={link ? link : ""} />
                                            <BasicButton textBtn={"КУПИТЬ"} />
                                        </div>
                                    </div>
                                </div>
                                {/* <RecommendedBooks
                                    categories={categories}
                                    title={"Похожие книги"} /> */}

                            </>
                            : null
                }
            </div>
        </main >
    )
}