import { FC } from "react";
import BookSliders from "./BookSliders/BookSliders";
import Genre from "./genre/Genre";

const MainPage: FC = () => {
    return (
        <main className='main'>
            <div className="main__content">
                <h1 className="main__heading">
                    Добро пожаловать в онлайн библиотку Google API!
                </h1>
                <BookSliders />
                <Genre />
            </div>
        </main>
    )
}


export default MainPage;
