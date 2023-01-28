import { Link } from "react-router-dom";
import sample from "../../assets/sample.jpg";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/hooks";


export const BookCard: FC<any> = ({ book }) => {

  const dispatch = useAppDispatch();

  const { id } = book;
  const { title, categories, authors, publishedDate } = book.volumeInfo;

  return (
    <figure className="book" >
      <div className="book__wrapper">
        <img className="book__img" src={book.volumeInfo.imageLinks?.thumbnail || sample} alt="BookImage" />
      </div>

      <figcaption className="book__description" >
        <h3 className="book__heading">{title ? title : "Нет информации"}</h3>
        <p className="book__text">Категория: {categories ? categories : "Нет информации"}</p>
        <p className="book__text">Авторы: {authors ? authors : "Нет информации"}</p>
        <p className="book__text">Год: {publishedDate ? publishedDate : "Нет информации"}</p>
      </figcaption>
      <Link className="book__link" to={`/book/${id}`} onClick={() =>
        //dispatch(currentBook(book))
        console.log("перейти на страницу книги")
      }>
        Подробнее...
      </Link>
    </figure >
  );
}
