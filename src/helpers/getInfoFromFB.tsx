import sample from "../assets/sample.jpg";
import { IFavouriteBookInfo } from "../types/types";

export const adapter = (book: any): IFavouriteBookInfo => {
    const { id } = book;
    const { title } = book.volumeInfo;
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || sample

    const currentBook = {
        id,
        title,
        thumbnail
    }

    return currentBook
}