import BasicButton from "../../UIComponents/BasicButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, FC } from "react";
import { IButtonFvt, IFavouriteBookInfo } from "../../../types/types";
import { db } from "../../../firebase/firebase";
import { useAppSelector } from "../../../hooks/hooks";
import { getFavouriteBooks } from "../../../store/selectors/bookSelectors";
import { getUserId } from "../../../store/selectors/manageUserInfoSelectors";


const FavoriteBtn: FC<IButtonFvt> = ({ book, authed }) => {
    //переменная хранящая информацию о том находится книга в избранном или нет
    const [isFavorite, setIsFavourite] = useState(false);
    //получаем ID пользователя
    const userId = useAppSelector(getUserId);
    //получаем список избранных книг
    const favouriteBooks = useAppSelector<{ [key: string]: IFavouriteBookInfo }>(getFavouriteBooks);
    const { id, title, thumbnail } = book;
    const sendBookInfo = { id, title, thumbnail }
    //определяем находится ли книга в списке избранного
    useEffect(() => {
        if (Object.keys(favouriteBooks).length) {
            const isInTheList = Object.keys(favouriteBooks).includes(id);
            isInTheList ? setIsFavourite(true) : setIsFavourite(false)
        }
    }, [id, favouriteBooks])
    //функция обработчик клика по кнопке избраного, добавляющая в список избранного в FB
    const addToFavourites = async () => {
        try {
            setIsFavourite(!isFavorite)
            if (!isFavorite) {
                await setDoc(doc(db, "users", `${userId}/favourites/items`), { [id]: sendBookInfo }, { merge: true });
            } else {
                await updateDoc(doc(db, `users/${userId}/favourites/items`), { [id]: deleteField() })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <BasicButton textBtn={"В ИЗБРАННОЕ"} authed={authed} handleDoing={addToFavourites} >
            {!isFavorite
                ? <FavoriteIcon sx={{
                    marginRight: "10px",
                    color: "white"
                }} />
                : <FavoriteIcon sx={{
                    marginRight: "10px",
                    color: "red"
                }} />}
        </BasicButton>
    )
}

export default FavoriteBtn;