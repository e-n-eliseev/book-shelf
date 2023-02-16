import { BookCard } from "../card/BookCard";
import uniqid from "uniqid";
import { FC, useEffect } from "react";
import { IBook2 } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getBooks } from "../../store/selectors/bookSelectors";
import { getBooksByCategory } from "../../store/slices/getBookSlice";

const RecommendedBooks: FC<IBook2> = ({ categories }) => {

    const recomendedBooks = useAppSelector(getBooks)
    const dispatch = useAppDispatch();

    const startIndex = Math.floor(Math.random() * 5 + 1)
    useEffect(() => {
        dispatch(getBooksByCategory({ searchParam: categories, startIndex }))
    }, []);

    return (
        <>
            {
                recomendedBooks?.length
                    ? <section className="recomended-books">
                        <h2 className="recomended-books__title">Вам могут быть интересны:</h2>
                        <div className="recomended-books__items">
                            {recomendedBooks?.length && recomendedBooks.map((book: any) => <BookCard key={uniqid()} book={book} />)}
                        </div>
                    </section>
                    : null
            }
        </>
    );
}

export default RecommendedBooks;