import Rating from '@mui/material/Rating';
import { FC } from 'react';
import { IRating } from '../../types/types';

export const BasicRating: FC<IRating> = ({ averageRating }) => {

  return (
    <div className='rating'>
      <p className='rating__heading'>Рейтинг книги на основе оценок пользователей:</p>
      <Rating name="book Rating" size="large" value={averageRating} readOnly />
    </div>
  );
}

export default BasicRating;