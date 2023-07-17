import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function CarouselComponent({ stories }) {

    return (
        <div className="carousel-wrapper">
            

            <Carousel showThumbs={false}>
                {stories.map(story => {
                    return <img src={story.imgUrls} className="img-preview" alt="" key={story.id} />
                })}
            </Carousel>
            
        </div>
    );
}