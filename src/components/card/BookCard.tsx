import { Link } from "react-router-dom";
import { FC } from "react";
import { bookInfoAdapter } from "../../helpers/bookInfoAdapter";
import ProgressiveImage from "react-progressive-graceful-image";
import loadingImg from "../../assets/loading.gif";
import BasicRating from "../UIComponents/BasicRating";


export const BookCard: FC<any> = ({ book }) => {

  const { id, title, categories, authors, publishedDate, thumbnail, averageRating } = bookInfoAdapter(book);

  return (
    <figure className="book" >
      <div className="book__wrapper">
        <ProgressiveImage
          src={thumbnail}
          placeholder={loadingImg}
        >
          {(src, loading) => <img style={{ opacity: loading ? 0 : 1 }} className="book__img" src={src} alt="BookImage" />}
        </ProgressiveImage>
      </div>

      <figcaption className="book__description" >
        <h3 className="book__heading">{title}</h3>
        <p className="book__text">Категория: {categories}</p>
        <p className="book__text">Авторы: {authors}</p>
        <p className="book__text">Год: {publishedDate}</p>
        <BasicRating
          averageRating={+averageRating}
        />
      </figcaption>
      <Link className="book__link" to={`/book/${id}`} >
        Подробнее...
      </Link>
    </figure >
  );
}
