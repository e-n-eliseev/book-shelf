
import { FC } from "react";
import Favourites from "./favourites/Favourites";

const FavouritesPage: FC = () => {

    return (
        <main className="favourites">
            <div className="favourites__content">
                <h1 className='favourites__heading'>
                    Мои книги
                </h1>
                <Favourites path={"favourites"} />
                <Favourites path={"recent"} />

            </div>
        </main>
    )
};

export default FavouritesPage;