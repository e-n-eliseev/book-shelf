
import { useState, FC } from "react";
import { updateProfile } from "firebase/auth";
import SubmitButtons from '../../UIComponents/SubmitButtons';
import { nameValidation } from "../../../helpers/vars";
import { ISetState, IBookBase } from '../../../types/types';
import { auth } from "../../../firebase/firebaseAuth";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setNick } from "../../../store/slices/manageUserInfoSlice";
import { getNick } from "../../../store/selectors/manageUserInfoSelectors";


const ChangeNameForm: FC<ISetState> = ({ setError }) => {

    const dispatch = useAppDispatch();
    const name = useAppSelector(getNick);

    const [isChanging, setIsChanging] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<IBookBase>({
        mode: "all"
    });

    //обработчик отправки формы
    const handleSubmitName = async (data: IBookBase) => {
        if (auth.currentUser) {
            try {
                // setName(data.nick);
                await updateProfile(auth.currentUser, {
                    displayName: `${data.nick}`,
                });
                dispatch(setNick(`${data.nick}`))
            } catch (error: any) {
                setError(error!.code.split(",")[0]);
            } finally {
                setIsChanging(false);
                reset();
            }
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