
import { useEffect, useState, FC } from "react";
import { db } from "../../../firebase/firebase";
import SubmitButtons from '../../UIComponents/SubmitButtons';
import { phoneValidation } from "../../../helpers/vars";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { IBook1, Info, ISetState } from "../../../types/types";
//import { auth, docRef, userId } from "../../../firebase/firebaseAuth";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebase/firebaseAuth";


const ChangePhoneForm: FC<ISetState> = ({ setError }) => {

    const [phoneNumber, setPhoneNumber] = useState<Info | null>("");

    const [isChanging, setIsChanging] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<IBook1>({
        mode: "all"
    });


    const userId = auth.currentUser?.uid;
    const docRef = doc(db, "users", `${userId}`);

    useEffect(() => {
        //получаем номер телефона из базы
        getDoc(docRef)
            .then((data) => {
                console.log(data.data()!)
                setPhoneNumber(data.data()!.phoneNumber)
            })
            .catch((error) => {
                console.log("No such document!", error);
            })
    }, []);

    const handleSubmitPhone = async (data: IBook1) => {
        setPhoneNumber(data.phoneNumber);
        setIsChanging(false);
        await setDoc(docRef, { phoneNumber: data.phoneNumber });
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