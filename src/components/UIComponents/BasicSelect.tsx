import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getBooksByGenre, getBooksBySearchParam, setSortParam } from '../../store/slices/getBookSlice';
import { getSearchName, getSortParam } from '../../store/selectors/bookSelectors';
import { FC } from 'react';
import { IBookBase } from '../../types/types';
import { useNavigate } from 'react-router-dom';

const BasicSelect: FC<IBookBase> = ({ genre }) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const sortParam = useAppSelector(getSortParam);
    const searchName = useAppSelector(getSearchName);


    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setSortParam(event.target.value as string));
        genre
            ? dispatch(getBooksByGenre({ searchParam: searchName, startIndex: 0, sortParam: event.target.value }))
            : dispatch(getBooksBySearchParam({
                searchParam: searchName, startIndex: 0, sortParam: event.target.value
            }));
        genre ? navigate(`/genre/1`) : navigate(`/bookslist/1`);
    }
    return (
        <Box sx={{ width: 200, borderRadius: "5px", bgcolor: "#F4F8FF" }}>
            <FormControl fullWidth>
                <InputLabel id="sort-param-select-label">Доступные фильтры</InputLabel>
                <Select
                    labelId="sort-param-select-label"
                    id="sort-param-select"
                    value={sortParam}
                    label="SortParam"
                    variant="outlined"
                    onChange={handleChange}
                >
                    <MenuItem value={"&download=epub"}>Доступные для скачивания в формате epub</MenuItem>
                    <MenuItem value={"&filter=full"}>Доступные для чтения</MenuItem>
                    <MenuItem value={"&filter=partial"}>Доступные для ознакомления</MenuItem>
                    <MenuItem value={"&printType=books"}>Книги</MenuItem>
                    <MenuItem value={"&printType=magazines"}>Журналы</MenuItem>
                    <MenuItem value={"&orderBy=newest"}>Недавно опубликованные</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default BasicSelect;