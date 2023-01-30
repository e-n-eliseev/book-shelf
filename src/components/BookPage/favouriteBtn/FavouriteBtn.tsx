import BasicButton from "../../UIComponents/BasicButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, FC } from "react";
import { IButtonFvt, IFavouriteBookInfo } from "../../../types/types";
import { adapter } from "../../../helpers/getInfoFromFB";
import { db } from "../../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getFavouriteBooksInfo } from "../../../store/slices/getBookSlice";
import { getFavouriteBooks } from "../../../store/selectors/bookSelectors";


const FavoriteBtn: FC<IButtonFvt> = ({ book, authed }) => {

    const [isFavorite, setIsFavourite] = useState(false);
    const favouriteBooks = useAppSelector<{ [key: string]: IFavouriteBookInfo }>(getFavouriteBooks);

    const dispatch = useAppDispatch();

    const currentBook = adapter(book);

    useEffect(() => {
        dispatch(getFavouriteBooksInfo())
    }, [])

    useEffect(() => {
        if (Object.keys(favouriteBooks).length) {
            const isInTheList = Object.keys(favouriteBooks).includes(currentBook.id);
            isInTheList ? setIsFavourite(true) : setIsFavourite(false)
        }
    }, [])

    const addToFavourites = async () => {
        try {
            setIsFavourite(!isFavorite)
            if (!isFavorite) {
                await setDoc(doc(db, "users", `Ecq6HrbY5cPKtGhcrJN7UrJkTxq2/favourites/items`), { [currentBook.id]: currentBook }, { merge: true });
            } else {
                await updateDoc(doc(db, `users/Ecq6HrbY5cPKtGhcrJN7UrJkTxq2/favourites/items`), { [currentBook.id]: deleteField() })
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