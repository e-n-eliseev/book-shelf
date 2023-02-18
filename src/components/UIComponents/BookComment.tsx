import { Divider } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { getBookComments } from "../../store/selectors/bookSelectors";
import { IBook2 } from "../../types/types";


const BookComment: FC<IBook2> = ({ userNick }) => {

    const comment = useAppSelector(getBookComments);

    return (
        <>
            <div className="comment">
                <p className="comment__nick">{userNick}: </p>
                <p className="comment__text">"{comment[`${userNick}`]}"</p>
            </div>
            <Divider />
        </>

    )
}

export default BookComment;