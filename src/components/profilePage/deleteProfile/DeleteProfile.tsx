import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from "firebase/auth";
import { FC, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import ModalWindow from '../../UIComponents/ModalWindow';
import { ISetState } from '../../../types/types';
import { reauthenticate } from '../../../firebase/firebaseAuth';

export const DeleteProfile: FC<ISetState> = ({ setError }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const deleteProfile = async (data: string) => {
        try {
            const authData = await reauthenticate(data);
            await deleteUser(authData!.user);
        } catch (error) {
            console.log('An error ocurred', error);
            setError('Неверный пароль')
        }
    }
    return (
        <div>
            <IconButton className="profile__submit"
                color="primary" onClick={handleOpen}>
                <Tooltip title="Нажмите для удаления профиля ">
                    <DeleteIcon sx={{
                        fontSize: "30px"
                    }} />
                </Tooltip>
            </IconButton>
            <ModalWindow
                confirmFunction={deleteProfile}
                open={open}
                setOpen={setOpen}
                profile />
        </div >
    );
};






