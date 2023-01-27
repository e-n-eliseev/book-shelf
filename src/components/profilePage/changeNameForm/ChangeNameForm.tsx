
import { useEffect, useState, FC } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import SubmitButtons from '../../UIComponents/SubmitButtons';
import { nameValidation } from "../../../helpers/vars";
import { ISetState, IBook1, Info } from '../../../types/types';
import { auth } from "../../../firebase/firebaseAuth";
import { useForm } from "react-hook-form";


const ChangeNameForm: FC<ISetState> = ({ setError }) => {

    const [name, setName] = useState<Info | null>("");

    const [isChanging, setIsChanging] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<IBook1>({
        mode: "all"
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setName(user!.displayName));
        return unsubscribe;
    }, []);
    //обработчик отправки формы
    const handleSubmitName = async (data: IBook1) => {
        const currentUser: any = auth.currentUser
        try {
            setName(data.nick);
            await updateProfile(currentUser, {
                displayName: `${data.nick}`,
            });
        } catch (error: any) {
            setError(error!.code.split(",")[0]);
        } finally {
            setIsChanging(false);
            reset();
        }
    }

    return (
        <>
            <form className="profile__form " onSubmit={handleSubmit(handleSubmitName)}>
                <div className="profile__form-content profile__form-content--input">
                    <div className="profile__container">
                        <div className="profile__left">
                            <p className="profile__info">Никнэйм:</p>
                            {!isChanging
                                ? <p className="profile__info">{name ? name : "Нет данных"}</p>
                                : <div className="profile__input-wrapper">
                                    <input className={errors?.nick ? "profile__input profile__input--invalid" : "profile__input profile__input--valid"}
                                        placeholder="Введите никнэйм"
                                        type="text"
                                        {...register("nick", {
                                            required: 'Поле обязательно для заполнения!',
                                            pattern: {
                                                value: nameValidation,
                                                message: 'Введите корректный никнэйм!'
                                            }
                                        })}

                                    />
                                    {errors?.nick && <p className="profile__input-error">{errors?.nick?.message}</p>}
                                </div>
                            }
                        </div>
                        <SubmitButtons
                            isValid={isValid}
                            isChanging={isChanging}
                            setIsChanging={setIsChanging} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default ChangeNameForm;