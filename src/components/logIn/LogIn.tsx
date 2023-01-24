import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./loginForm/LoginForm";
import { FirebaseError } from "firebase/app";
import { logIn, signUp } from "../../firebase/firebaseAuth";
import HomeButton from "../UIComponents/HomeButton";
import { IAuthProps, ILogIn } from "../../types/types";
import { FC } from "react";

const LogIn: FC<IAuthProps> = ({ authed }) => {
    const navigate = useNavigate();
    //сообщание ошибки
    const [error, setError] = useState<string>("");

    //авторизация
    const handleSubmit = async ({ login, pass }: ILogIn): Promise<void> => {
        try {
            if (authed) {
                await signUp(login, pass);
                navigate(-1);
            } else {
                await logIn(login, pass);
                navigate(-1);
            }
        }
        catch (error) {
            if (error instanceof FirebaseError)
                setError(error.code.split("/")[1]);
        }
    };
    //сброс ошибки авторизации через 2 сек
    useEffect(() => {
        const timeout = setTimeout(() => setError(""), 2000);
        return () => clearTimeout(timeout)
    }, [error])

    return (
        <main className="logIn">
            <div className="logIn__wrapper">
                {authed
                    ? <h2 className="logIn__heading">
                        Пожалуйста, введите адрес электроной почты и пароль для регистрации и входа.
                    </h2>
                    : <h2 className="logIn__heading">
                        Пожалуйста, введите адрес электроной почты и пароль указанный при регистрации.
                    </h2>
                }
                <LoginForm onSubmit={handleSubmit} />
                {!authed
                    ? <Link className="logIn__link" to={"/signup"}>
                        Если вы не зарегистрированы , пожалуйста, нажмите <span className="logIn__redirect">здесь</span> для перехода на страницу регистрации.
                    </Link>
                    : null}
                <p className="logIn__text">
                    <HomeButton />
                </p>
            </div>
            {error && <h2 className="error">{error}</h2>}
        </main>
    )
}

export default LogIn;