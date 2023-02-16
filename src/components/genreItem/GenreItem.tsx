
import { useNavigate } from "react-router-dom";
import { IGEnre } from '../../types/types';
import { FC } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { setSearchParam, setSortParam } from '../../store/slices/getBookSlice';

const GenreItem: FC<IGEnre> = ({ genre }) => {
    const [img, name] = genre;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSearchGenre = () => {
        dispatch(setSearchParam(name));
        dispatch(setSortParam(""));
        navigate(`/genre/1`);
    }
    return (
        <div className="genre-item" >
            <img className="genre-item__img" src={img} alt={`жанр ${name}`} onClick={handleSearchGenre} />
        </div>
    )
}

export default GenreItem;