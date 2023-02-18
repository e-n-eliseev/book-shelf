
import { useState, FC } from "react";
import { db } from "../../../firebase/firebase";
import SubmitButtons from '../../UIComponents/SubmitButtons';
import { phoneValidation } from "../../../helpers/vars";
import { doc, setDoc } from "firebase/firestore";
import { IBook1, ISetState } from "../../../types/types";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getPhoneNumber, getUserId } from "../../../store/selectors/manageUserInfoSelectors";
import { setPhoneNumber } from "../../../store/slices/manageUserInfoSlice";

const ChangePhoneForm: FC<ISetState> = () => {

    const dispatch = useAppDispatch();
    const phoneNumber = useAppSelector(getPhoneNumber);
    const userId = useAppSelector(getUserId);

    const [isChanging, setIsChanging] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<IBook1>({
        mode: "all"
    });

    const handleSubmitPhone = async (data: IBook1) => {
        setIsChanging(false);
        await setDoc(doc(db, "users", userId), { phoneNumber: data.phoneNumber });
        dispatch(setPhoneNumber(`${data.phoneNumber}`));
        reset();
    }

    return (
        <>
            <form className="profile__form " onSubmit={handleSubmit(handleSubmitPhone)}>
                <div className="profile__form-content profile__form-content--input">
                    <div className="profile__container">
                        <div className="profile__left">
                            <p className="profile__info">Номер телефона:</p>
                            {!isChanging
                                ? <p className="profile__info">{phoneNumber ? phoneNumber : "Нет данных"}</p>
                                : <div className="profile__input-wrapper">
                                    <input className={errors?.phoneNumber ? "profile__input profile__input--invalid" : "profile__input profile__input--valid"}
                                        placeholder="Телефон +XXXXXXXXXXX"
                                        type="tel"
                                        {...register("phoneNumber", {
                                            required: 'Поле обязательно для заполнения!',
                                            pattern: {
                                                value: phoneValidation,
                                                message: 'Введите валидный номер телефона'
                                            }
                                        })}
                                    />
                                    {errors?.phoneNumber && <p className="profile__input-error">{errors?.phoneNumber?.message}</p>}
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

export default ChangePhoneForm;