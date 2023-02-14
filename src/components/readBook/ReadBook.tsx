import { FC, useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { adapter } from "../../helpers/getInfoFromFB";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCurrentBook } from "../../store/selectors/bookSelectors";
import { getCurrentBookInfo, getFavouriteBooksInfo, setLastReadBooksFB } from "../../store/slices/getBookSlice";
import Loader from "../UIComponents/Loader";

const ReadBook: FC = () => {
    //содаем ссылку для Google Book Viewer
    const canvasRef = useRef<HTMLDivElement>(null);
    //получаем данные о адресной строке
    const params = useParams();
    //переменная для отслеживания состояния загрузки скрипта Google Book Viewer
    const [loaded, setLoaded] = useState(false);
    const dispatch = useAppDispatch();
    //получаем информацию о текущей книге
    const currentBook = useAppSelector(getCurrentBook, shallowEqual);
    //отправляем данные в FB о полседней прочитанной книге
    useEffect(() => {
        if (Object.keys(currentBook).length) {
            dispatch(setLastReadBooksFB(adapter(currentBook)))
        } else {
            dispatch(getCurrentBookInfo({ id: `${params.id}` }));
            dispatch(getFavouriteBooksInfo());
        }
    }, [currentBook])
    //вставка скрипта Google Book Viewer
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/books/jsapi.js";
        script.addEventListener('load', () => setLoaded(true));
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        }
    }, [])
    //запуск скрипта Google Book Viewer, после его полной загрузки загрузится
    const initialize = () => {
        var viewer = new window.google.books.DefaultViewer(canvasRef.current);
        viewer.load(params.id);
    }
    useEffect(() => {
        if (loaded) {
            if (window.viewer) {
                console.log("old")
                let viewer = new window.google.books.DefaultViewer
                    (canvasRef.current);
                viewer.load(params.id);
            }
            else {
                console.log("new")
                window.google.books.load()
                window.google.books.setOnLoadCallback(
                    initialize
                )

            }
        }
    }, [loaded])

    return (
        <main className="read-book">
            <div className="read-book__content">
                {loaded
                    ? <div className="read-book__book-wrapper">
                        <div ref={canvasRef} className="read-book__book" ></div>
                    </div>
                    : <Loader />
                }
            </div >
        </main >
    )
}

export default ReadBook;