import { FC } from "react"
import { IBookBase } from "../../../types/types";
import BasicSelect from "../../UIComponents/BasicSelect";


const SortBar: FC<IBookBase> = ({ genre }) => {
    return (
        <section className="sortbar">
            <p className="sortbar__text">Выберите доступные варианты фильтрации:</p>
            <BasicSelect genre={genre} />
        </section>
    )
}

export default SortBar;