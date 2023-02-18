
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getNick } from '../../../store/selectors/manageUserInfoSelectors';
import { setBookComment, setBookCommentFB } from '../../../store/slices/getBookSlice';
import { ICommentProps } from '../../../types/types';
import BasicButton from '../../UIComponents/BasicButton';
import ModalWindowComment from '../../UIComponents/ModalWindowComment';

export const LeaveFeedback: FC<ICommentProps> = ({ authed, bookId, comments }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const dispatch = useAppDispatch();
    const userNick = useAppSelector(getNick) || "UFO";
    const userId = localStorage.getItem("userID") || "";

    const leaveComment = async (data: string) => {
        dispatch(setBookCommentFB({ bookId, comment: data }));
        dispatch(setBookComment({ ...comments, [userId]: [userNick, data] }))
    }
    return (
        <div>
            <BasicButton textBtn={"Отзыв"} authed={authed} handleDoing={handleOpen} />
            <ModalWindowComment
                confirmFunction={leaveComment}
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
};






