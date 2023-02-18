
import { FC, useState } from "react";
import { updateEmail } from "firebase/auth";
import SubmitButtons from '../../UIComponents/SubmitButtons';
import ModalWindow from "../../UIComponents/ModalWindow";
import { emailValidation } from "../../../helpers/vars";
import { IBook1, ISetState } from "../../../types/types";
import { useForm } from "react-hook-form";
import { reauthenticate } from "../../../firebase/firebaseAuth";
import { getEmail } from "../../../store/selectors/manageUserInfoSelectors";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setEmail } from "../../../store/slices/manageUserInfoSlice";


const ChangeEmailForm: FC<ISetState> = ({ setError }) => {

    const dispatch = useAppDispatch();
    const email = useAppSelector(getEmail);
    const [open, setOpen] = useState<boolean>(false);

    let newEmail: string = "";

    const [isChanging, setIsChanging] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors, isValid }
    } = useForm<IBook1>({
        mode: "all"
    });

    const handleOpen = () => {
        const { email } = getValues()
        newEmail = `${email}`;
        setOpen(true);
        reset();
    }

    const handleSubmitEmail = async (data: string) => {
        try {
            const authData = await reauthenticate(data);
            if (authData) {
                await updateEmail(authData.user, newEmail);
                dispatch(setEmail(newEmail));
            }
        } catch (error) {
            setError("Вы неверно ввели пароль");
        } finally {
            setIsChanging(false);
        }
    }


    return (
        <>
            <form className="profile__form " onSubmit={handleSubmit(handleOpen)}>
                <div className="profile__form-content profile__form-content--input">
                    <div className="profile__container">
                        <div className="profile__left">
                            <p className="profile__info">Email:</p>
                            {!isChanging
                                ? <p className="profile__info">{email}</p>
                                :
                                <div className="profile__input-wrapper">
                                    <input className={errors?.email ? "profile__input profile__input--invalid" : "profile__input profile__input--valid"}
                                        placeholder="Почта sample@sample.sample"
                                        type="email"
                                        {...register("email", {
                                            required: 'Поле обязательно для заполнения!',
                                            pattern: {
                                                value: emailValidation,
                                                message: "Введите валидный адрес электронной почты!"
                                            }
                                        })
                                        }
                                    />
                                    {errors?.email && <p className="profile__input-error">{errors?.email.message}</p>}
                                </div>
                            }
                        </div>
                        <SubmitButtons
                            isValid={isValid}
                            isChanging={isChanging}
                            setIsChanging={setIsChanging}
                        />
                        <ModalWindow
                            confirmFunction={handleSubmitEmail}
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default ChangeEmailForm;