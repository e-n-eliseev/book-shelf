import { Divider } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { getBookComments } from "../../store/selectors/bookSelectors";
import { IObjectBase } from "../../types/types";


const BookComment: FC<IObjectBase> = ({ userId }) => {

    const comment = useAppSelector(getBookComments);

    return (
        <>
            <div className="comment">
                <p className="comment__nick">{comment[userId][0]}: </p>
                <p className="comment__text">"{comment[userId][1]}"</p>
            </div>
            <Divider />
        </>

    )
}

export default BookComment;