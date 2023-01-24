import { Link } from "react-router-dom";
import uniqid from "uniqid";
import { genres } from "../../../helpers/genres";
import GenreItem from "../../genreItem/GenreItem";

const Genre = () => {
    return (
        <section className="genre">
            <h2 className="genre__heading">
                Популярные жанры книг
            </h2>
            <div className="genre__list">
                {genres.slice(0, 6).map(genre => <GenreItem key={uniqid()} genre={genre} />)}
            </div>
            <Link className="genre__link" to={"/genres/1"}>
                Посмотреть все жанры
            </Link>
        </section>
    )
}

export default Genre;