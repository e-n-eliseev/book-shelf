import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./loginForm/LoginForm";
import { FirebaseError } from "firebase/app";
import HomeButton from "../UIComponents/HomeButton";
import { IAuthProps, ILogIn } from "../../types/types";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getError, getLoading } from "../../store/selectors/commonSelectors";
import { setError, setIdle } from "../../store/slices/commonSlice";
import Loader from "../UIComponents/Loader";
import { getSignIn, getSignUp } from "../../store/slices/manageUserInfo";

const LogIn: FC<IAuthProps> = ({ authed }) => {
    const navigate = useNavigate();
    //сообщание ошибки
    // const [error, setError] = useState<string>("");

    const dispatch = useAppDispatch();

    const error = useAppSelector(getError);
    const loading = useAppSelector(getLoading);



    //авторизация
    const handleSubmit = async ({ email, pasw }: ILogIn): Promise<void> => {
        // try {
        //     if (authed) {
        //         await signUp(email, pasw);
        //         navigate(-1);
        //     } else {
        //         await logIn(email, pasw);
        //         navigate(-1);
        //     }
        // }
        // catch (error) {
        //     if (error instanceof FirebaseError)
        //         setError(error.code.split("/")[1]);
        authed ? dispatch(getSignUp({ email, pasw })) : dispatch(getSignIn({ email, pasw }))
        //navigate(-1);
        // }
    };
    //сброс ошибки авторизации через 2 сек
    useEffect(() => {
        const timeout = setTimeout(() => dispatch(setIdle()), 2000);
        return () => clearTimeout(timeout)
    }, [error])

    return (
        <main className="logIn">
            {!loading
                ? <Loader />
                : <div className="logIn__wrapper">
                    {
                        authed
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
                    {error && <h2 className="error">{error}</h2>}
                </div>
            }
        </main >
    )
}

export default LogIn;