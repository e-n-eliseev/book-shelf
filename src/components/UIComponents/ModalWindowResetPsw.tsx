import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { FC } from 'react';
import { IModal } from '../../types/types';
import { auth, logOut } from '../../firebase/firebaseAuth';


const ModalWindowResetPsw: FC<IModal> = ({
    open,
    setOpen }) => {

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

    const handleClose = () => {
        setOpen(false);
    }

    const handleResetPsw = async () => {
        await sendPasswordResetEmail(auth, `${auth.currentUser!.email}`);
        console.log("Password reset email sent");
        handleClose();
        logOut()
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
                    <p className="modal__content-main">Для изменения пароля перейдите по ссылке в письме, отправленном на адрес электронной почты, указанной при регистрации</p>
                </div>

                <div className="modal__actions">
                    <IconButton className="profile__submit"
                        color="primary" onClick={handleResetPsw}>
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

export default ModalWindowResetPsw;