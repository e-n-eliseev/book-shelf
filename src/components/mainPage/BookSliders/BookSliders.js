import { images1 } from "../../../helpers/randomBooks";
import { images2 } from "../../../helpers/randomBooks";
import { images3 } from "../../../helpers/randomBooks";
import Slider from "./slider/Slider";



const BookSliders = () => {
    return (
        <section className="sliders">
            <h2 className="sliders__heading">
                Популярные произведения
            </h2>
            <div className="sliders__content">
                <Slider images={images1} category={" компьютеры"} delay={2300} />
                <Slider images={images2} category={" детективы"} delay={3100} />
                <Slider images={images3} category={" романы"} delay={4200} />
            </div>
        </section>
    )
}

export default BookSliders;