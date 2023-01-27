import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import { FC, useState } from 'react';
import { IModal } from '../../types/types';

const ModalWindow: FC<IModal> = ({
    open,
    setOpen,
    confirmFunction,
    profile }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 355,
        bgcolor: 'background.paper',
        border: '3px solid #FFCA42',
        boxShadow: 24,
        borderRadius: "18px",
        p: 4,

    };

    const [confirmPassword, setConfirmPassword] = useState("");
    const [vision, setVision] = useState(profile);

    const handleClose = () => {
        setVision(profile);
        setConfirmPassword("");
        setOpen(false);
    }
    const handleSubmit = () => {
        if (vision) {
            setVision(!profile);
            return
        }
        setVision(profile);
        confirmFunction(confirmPassword);
        handleClose();
    }



    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <div className="modal__content">
                    {!vision
                        ? <input className="modal__input"
                            placeholder="Введите текущий пароль"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword} />
                        : <>
                            <p className="modal__content-main">Вы действительно хотите удалить Ваш профиль?</p>
                            <p className="modal__content-sub">После удаления Вы не сможете восстановить сохраненые данные аккаунта </p>
                        </>
                    }
                </div>

                <div className="modal__actions">
                    <IconButton className="profile__submit"
                        color="primary" onClick={handleSubmit}>
                        <Tooltip title="Нажмите для подтверждения ">
                            <CheckIcon sx={{
                                fontSize: "30px"
                            }} />
                        </Tooltip>
                    </IconButton>
                    <IconButton className="profile__submit"
                        color="primary" onClick={handleClose}>
                        <Tooltip title="Нажмите для отмены ">
                            <ClearIcon sx={{
                                fontSize: "30px"
                            }} />
                        </Tooltip>
                    </IconButton>
                </div>
            </Box>
        </Modal >
    )
}

export default ModalWindow;