import { FC } from "react";
import { IButtonDwn } from "../../../types/types";
import BasicButton from "../../UIComponents/BasicButton";


const DownloadBtn: FC<IButtonDwn> = ({ authed, link }) => {

    const onDownload = () => window.location.assign(link);;

    return (
        <BasicButton textBtn={"СКАЧАТЬ"} authed={authed} vision={!link} handleDoing={onDownload} />
    )
}





export default DownloadBtn;