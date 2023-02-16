import { IBook, IBook2 } from "../types/types";
import sample from "../assets/sample.jpg";

export const bookInfoAdapter = (currentBook: IBook): IBook2 => {
  return {
    title: currentBook?.volumeInfo?.title || "Нет информации",
    categories: currentBook?.volumeInfo?.categories || "Нет информации",
    authors: currentBook?.volumeInfo?.authors || "Нет информации",
    publishedDate: currentBook?.volumeInfo?.publishedDate || "Нет информации",
    description:
      currentBook?.volumeInfo?.description ||
      currentBook!.volumeInfo.subtitle ||
      "Нет информации",
    thumbnail: currentBook?.volumeInfo?.imageLinks?.thumbnail || sample,
    id: currentBook?.id,
    link: currentBook?.accessInfo.epub?.downloadLink,
    averageRating: currentBook?.volumeInfo?.averageRating || 0,
    ratingsCount: currentBook?.volumeInfo.ratingsCount || 0,
    vision: currentBook.accessInfo.viewability,
  };
};
