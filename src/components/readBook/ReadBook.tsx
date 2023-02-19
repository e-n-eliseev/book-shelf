import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../UIComponents/Loader";

const ReadBook: FC = () => {
    //содаем ссылку для Google Book Viewer
    const canvasRef = useRef<HTMLDivElement>(null);
    //получаем данные о адресной строке
    const params = useParams();
    //переменная для отслеживания состояния загрузки скрипта Google Book Viewer
    const [loaded, setLoaded] = useState(false);

    //вставка скрипта Google Book Viewer
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/books/jsapi.js";
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [])
    //запуск скрипта Google Book Viewer, после его полной загрузки загрузится
    const initialize = () => {
        let viewer = new window.google.books.DefaultViewer(canvasRef.current);
        viewer.load(params.id);
    }

    useEffect(() => {
        if (loaded) {
            if (window.viewer) {
                let viewer = new window.google.books.DefaultViewer
                    (canvasRef.current);
                viewer.load(params.id);
            }
            else {
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
                        <div ref={canvasRef} className="read-book__book" >
                            <button className="read-book__btn" onClick={() => window.location.reload()}>Если книга не отображается, пожалуйста, нажмите для загрузки программы просмотра книги.</button>
                        </div>
                    </div>
                    : <Loader />
                }
            </div >
        </main >
    )
}

export default ReadBook;