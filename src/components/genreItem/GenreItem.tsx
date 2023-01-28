
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { IGEnre } from '../../types/types';
import { FC } from 'react';

const GenreItem: FC<IGEnre> = ({ genre }) => {
    const [img, name] = genre;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchGenre = () => {
        //dispatch(bookGenreSearchRequest(name, 0));
        navigate(`/genre/${name}`);
    }
    return (
        <div className="genre-item" >
            <img className="genre-item__img" src={img} alt={`жанр ${name}`} onClick={handleSearchGenre} />
        </div>
    )
}

export default GenreItem;