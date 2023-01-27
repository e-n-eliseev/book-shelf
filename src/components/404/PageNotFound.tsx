import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/404.png";
import HomeButton from "../UIComponents/HomeButton";
import { FC } from "react";

const PageNotFound: FC = () => {

    const navigate = useNavigate();
    //перенаправление через 5 сек после ошибки роутинга
    useEffect(() => {
        let timeout = setTimeout(() => {
            navigate("/")
        }, 5000)
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    return (
        <main className="page-not-found">
            <h1 className="page-not-found__heading">
                Извините, произошла ошибка или страница не найдена!
            </h1>
            <img className="page-not-found__img" src={pic} alt="404" />
            <p className="page-not-found__text">Пожалуйста,ожидайте автоматической переадресации или нажмите
            </p>
            <HomeButton />
        </main>
    )
}

export default PageNotFound;