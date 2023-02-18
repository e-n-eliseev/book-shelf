import IconButton from '@mui/material/IconButton';
import { Button, Tooltip } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState, FC } from "react";
import { updatePassword } from "firebase/auth";
import ModalWindow from '../../UIComponents/ModalWindow';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { passwordValidation } from '../../../helpers/vars';
import ModalWindowResetPsw from '../../UIComponents/ModalWindowResetPsw';
import { IBookBase, Info, ISetState } from '../../../types/types';
import { useForm } from "react-hook-form";
import { reauthenticate } from '../../../firebase/firebaseAuth';

const ChangePswForm: FC<ISetState> = ({ setError }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<Info>("");
    const [repeatPassword, setRepeatPassword] = useState<Info>("");

    const handleOpen = () => {
        const { newPassword, repeatPassword } = getValues()
        setNewPassword(newPassword);
        setRepeatPassword(repeatPassword);
        setOpen(true);
        reset();
    }
    const [openReset, setOpenReset] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors, isValid }
    } = useForm<IBookBase>({
        mode: "all"
    });

    const handleChangePwd = async (data: IBookBase) => {
        try {
            const authData = await reauthenticate(`${data}`);
            if (newPassword === repeatPassword) {
                await updatePassword(authData!.user, `${newPassword}`);
            } else {
                setError("Введенные пароли не совпадают");
            }
            console.log(newPassword, repeatPassword)
            console.log('Password updated!', data)
        } catch (error) {
            console.log('An error ocurred', error);
            setError("Вы неверно ввели текущий пароль");
        }
    }

    return (
        <>
            <div>

                <form className="profile__form " onSubmit={handleSubmit(handleChangePwd)}>
                    <div className="profile__form-content profile__form-content--input">
                        <div className="profile__container">
                            <div className="profile__left">
                                <p className="profile__info">Новый пароль:</p>
                                <div className="profile__input-wrapper">
                                    <input className={errors?.newPassword ? "profile__input profile__input--invalid" : "profile__input profile__input--valid"}
                                        placeholder="Введите новый пароль"
                                        type="password"
                                        {...register("newPassword", {
                                            required: 'Поле обязательно для заполнения!',
                                            pattern: {
                                                value: passwordValidation,
                                                message: 'Введен невалидный пароль (см.подсказку)'
                                            }
                                        })
                                        }
                                    />
                                    {errors?.newPassword && <p className="profile__input-error">{errors?.newPassword.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="profile__container">
                            <div className="profile__left">
                                <p className="profile__info">Новый пароль:</p>
                                <div className="profile__input-wrapper">
                                    <input className={errors?.repeatPassword ? "profile__input profile__input--invalid" : "profile__input profile__input--valid"}
                                        placeholder="Повторно введите новый пароль"
                                        type="password"
                                        {...register("repeatPassword", {
                                            required: 'Поле обязательно для заполнения!',
                                            pattern: {
                                                value: passwordValidation,
                                                message: 'Введен невалидный пароль (см.подсказку)'
                                            }
                                        })
                                        }
                                    />
                                    {errors?.repeatPassword && <p className="profile__input-error">{errors?.repeatPassword?.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="profile__submit">
                            <IconButton
                                color="primary"
                                disabled={!isValid}
                                onClick={handleOpen} >
                                <Tooltip title="Нажмите для сохранения информации ">
                                    <FileDownloadIcon sx={{
                                        fontSize: "30px"
                                    }} />
                                </Tooltip>
                            </IconButton>
                            <IconButton color="primary" >
                                <Tooltip title="Пароль не может быть короче восьми символов и должен содержать хотя бы одну цифру, одну маленькую и одну большую латинскую букву">
                                    <QuestionMarkIcon sx={{
                                        fontSize: "30px"
                                    }} />
                                </Tooltip>
                            </IconButton>

                        </div>

                        <ModalWindow
                            confirmFunction={handleChangePwd}
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>
                </form>
                <div className="profile__reset">
                    <Button variant="contained" onClick={() => setOpenReset(true)}>Забыли пароль?</Button>
                    <ModalWindowResetPsw
                        open={openReset}
                        setOpen={setOpenReset}
                    />
                </div>
            </div >
        </>
    )
}

export default ChangePswForm;