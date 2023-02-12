import { FC, useEffect } from "react";
import { shallowEqual } from "react-redux";
import { adapter } from "../../helpers/getInfoFromFB";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCurrentBook } from "../../store/selectors/bookSelectors";
import { setLastReadBooksFB } from "../../store/slices/getBookSlice";

const ReadBook: FC = () => {

    const dispatch = useAppDispatch();
    const currentBook = useAppSelector(getCurrentBook, shallowEqual);

    useEffect(() => {
        dispatch(setLastReadBooksFB(adapter(currentBook)))
    }, [])

    return (
        <main className="read-book">
            <div className="read-book__content">
            </div >
        </main >
    )
}

export default ReadBook;