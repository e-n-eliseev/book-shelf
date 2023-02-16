import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/hooks";
import { setLastReadBooksFB } from "../../../store/slices/getBookSlice";
import BasicButton from "../../UIComponents/BasicButton";

const ReadBtn: FC<any> = ({ book }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id, title, thumbnail, vision } = book;
    const sendBookInfo = { id, title, thumbnail }
    //обработчик клика по кнопке чтения
    const onRead = () => {
        dispatch(setLastReadBooksFB(sendBookInfo))
        navigate(`/read/${book.id}`);
    }
    return (
        <BasicButton textBtn={"ЧИТАТЬ"} vision={vision === "NO_PAGES"} handleDoing={onRead} />
    )
}

export default ReadBtn;

