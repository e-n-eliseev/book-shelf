import uniqid from "uniqid";
import { FC } from "react";

export const GenreList: FC = () => {

    return (
        <main className="genre-list">
            <div className="genre-list__content">
                <h1 className="genre-list__heading">
                    Доступные жанры произведений.
                </h1>
            </div>
        </main>
    )
}