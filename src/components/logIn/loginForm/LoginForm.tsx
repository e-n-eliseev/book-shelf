import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import FormBody from "../../UIComponents/FormBody";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import { ISubmit } from "../../../types/types";
import { FC } from "react";

const LoginForm: FC<ISubmit> = ({ onSubmit }) => {
    //локально сохраняем данные инпутов
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    //обработчики изменения инпутов
    const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogin(event.target.value);
    };


    const handleChangePass = (event: ChangeEvent<HTMLInputElement>): void => {
        setPass(event.target.value);
    };


    //обработчик отправки формы
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        onSubmit({ login, pass });
        setLogin("");
        setPass("");
    };

    return (
        <FormBody onSubmit={handleSubmit}>
            <div className="logIn__input-wrapper">
                <TextField
                    type="email"
                    name="email"
                    value={login}
                    onChange={handleChangeLogin}
                    label="Почта"
                    variant="outlined"
                />
            </div>
            <div className="logIn__input-wrapper">
                <TextField
                    type="password"
                    name="password"
                    value={pass}
                    onChange={handleChangePass}
                    label="Пароль"
                    variant="outlined"
                />
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
            >
                Войти!
            </Button>
        </FormBody >
    );
};

export default LoginForm;