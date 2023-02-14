import { FC } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../UIComponents/BasicButton";

const ReadBtn: FC<any> = ({ book }) => {

    const navigate = useNavigate();
    //обработчик клика по кнопке чтения
    const onRead = () => navigate(`/read/${book.id}`);
    //параметр установки активного состояния кнопки
    const vision = book.accessInfo.viewability === "NO_PAGES";

    return (
        <BasicButton textBtn={"ЧИТАТЬ"} vision={vision} handleDoing={onRead} />
    )
}

export default ReadBtn;

