import BasicButton from "../../UIComponents/BasicButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, FC } from "react";
import { IButtonFvt, IFavouriteBookInfo } from "../../../types/types";
import { adapter } from "../../../helpers/getInfoFromFB";
import { db } from "../../../firebase/firebase";
import { useAppSelector } from "../../../hooks/hooks";
import { getFavouriteBooks } from "../../../store/selectors/bookSelectors";
import { getUserId } from "../../../store/selectors/manageUserInfoSelectors";


const FavoriteBtn: FC<IButtonFvt> = ({ book, authed }) => {

    const [isFavorite, setIsFavourite] = useState(false);
    const userId = useAppSelector(getUserId);
    const favouriteBooks = useAppSelector<{ [key: string]: IFavouriteBookInfo }>(getFavouriteBooks);

    const currentBook = adapter(book);

    useEffect(() => {
        if (Object.keys(favouriteBooks).length) {
            const isInTheList = Object.keys(favouriteBooks).includes(currentBook.id);
            isInTheList ? setIsFavourite(true) : setIsFavourite(false)
        }
    }, [favouriteBooks])

    const addToFavourites = async () => {
        try {
            setIsFavourite(!isFavorite)
            if (!isFavorite) {
                await setDoc(doc(db, "users", `${userId}/favourites/items`), { [currentBook.id]: currentBook }, { merge: true });
            } else {
                await updateDoc(doc(db, `users/${userId}/favourites/items`), { [currentBook.id]: deleteField() })
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