import { FC } from "react"
import { IBook1 } from "../../../types/types";
import BasicSelect from "../../UIComponents/BasicSelect";


const SortBar: FC<IBook1> = ({ genre }) => {
    return (
        <section className="sortbar">
            <p className="sortbar__text">Выберите доступные варианты фильтрации:</p>
            <BasicSelect genre={genre} />
        </section>
    )
}

export default SortBar;