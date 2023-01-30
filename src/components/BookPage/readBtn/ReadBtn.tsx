import { FC } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../UIComponents/BasicButton";

const ReadBtn: FC<any> = ({ book }) => {

    const navigate = useNavigate();

    const onRead = () => navigate(`/read/${book.id}`)
    const vision = book.accessInfo.viewability === "NO_PAGES";

    return (
        <BasicButton textBtn={"ЧИТАТЬ"} vision={vision} handleDoing={onRead} />
    )
}

export default ReadBtn;