import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IFavouriteBook, IGetCurrentBook } from "../../../types/types";


const FavouriteBookCard: FC<IFavouriteBook> = ({ book }) => {

    const navigate = useNavigate();

    const { id, title, thumbnail } = book;
    const handleClick = (id: IGetCurrentBook) => navigate(`/book/${id}`);

    return (
        <figure className="favourite-book" onClick={() => handleClick(id)} >
            <div className="favourite-book__wrapper">
                <img className="favourite-book__img" src={thumbnail} alt="BookImage" />
            </div>

            <figcaption className="favourite-book__description" >
                <h3 className="favourite-book__heading">{title ? title : "Нет информации"}</h3>
            </figcaption>
        </figure >
    );
}

export default FavouriteBookCard;