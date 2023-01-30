import { BookCard } from "../card/BookCard";
import uniqid from "uniqid";
import { useEffect, useState } from "react";

const RecommendedBooks = ({ title = "Рекомендуем:", categories = "" }) => {
    const someData = {
        searchName: categories,
        maxResults: 3,
        startIndex: 1
    }

    const [recommendedBooks, setRecommendedBooks] = useState([]);

    // useEffect(() => {
    //     postData('http://localhost:5000/api/booksearch/sortbook', someData)
    //         .then(data => {
    //             setRecommendedBooks(data.items);
    //         })
    // }, []);

    return (
        <>
            {
                recommendedBooks?.length
                    ? <>
                        <div className="recommended-books">
                            <h2 className="recommended-books__title genre__heading">{title}</h2>
                            <div className="recommended-books__items">
                                {recommendedBooks?.length && recommendedBooks.map(book => <BookCard key={uniqid()} book={book} />)}
                            </div>
                        </div>
                    </>
                    : null
            }
        </>
    );
}

export default RecommendedBooks;