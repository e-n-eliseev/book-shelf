import { Button, TextField } from "@mui/material";
import FormBody from "../../UIComponents/FormBody";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import { ILogIn, ISubmit } from "../../../types/types";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "../../../helpers/vars";

const LoginForm: FC<ISubmit> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<ILogIn>({
        mode: "all"
    });
    //обработчик отправки формы
    const onSubmitForm = (data: ILogIn) => {
        const { email, pasw } = data
        onSubmit({ email, pasw });
        reset();
    };

    return (
        <FormBody onSubmit={handleSubmit(onSubmitForm)}>
            <div className="logIn__input-wrapper">
                <TextField
                    type="email"
                    label="Почта"
                    variant="outlined"
                    {...register("email", {
                        required: 'Поле обязательно для заполнения!',
                        pattern: {
                            value: emailValidation,
                            message: 'Введите корректный адрес электронной почты'
                        }
                    })}
                />
                {errors?.email && <p className="logIn__input-error">{errors?.email?.message}</p>}
            </div>
            <div className="logIn__input-wrapper">
                <TextField
                    type="password"
                    label="Пароль"
                    variant="outlined"
                    {...register("pasw", {
                        required: 'Пароль не может быть пустым',
                        pattern: {
                            value: passwordValidation,
                            message: 'Невалидный пароль (см.подсказку)'
                        }
                    })}
                />
                {errors?.pasw && <p className="logIn__input-error">{errors?.pasw?.message}</p>}
            </div>
            <IconButton color="primary"
                sx={{
                    position: "absolute",
                    top: "7px",
                    right: "7px"
                }}>
                <Tooltip title="Пароль не может быть короче восьми символов и должен содержать хотя бы одну цифру, одну маленькую и одну большую латинскую букву">
                    <QuestionMarkIcon sx={{
                        fontSize: "20px"
                    }} />
                </Tooltip>
            </IconButton>

            <Button
                type="submit"
                sx={{
                    backgroundColor: "#1B3764",
                    padding: "15px 82px",
                    border: "3px solid #FFCA42",
                    borderRadius: "8px"
                }}
                variant='contained'
                disabled={!isValid}
            >
                Войти!
            </Button>
        </FormBody >
    );
};

export default LoginForm;