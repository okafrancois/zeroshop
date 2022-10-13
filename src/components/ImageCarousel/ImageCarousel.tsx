import React, {useState} from "react";
import "./image-carousel.scss";
import {RichImage} from "../types";

type ImageCarouselProps = {
    items: any[];
    startIndex: number;
}

const ImageCarousel = ({items, startIndex}: ImageCarouselProps) => {
    const [activeIndex, setActiveIndex] = useState((startIndex));

    const carouselStyle = {
        width: `${items.length * 100}%`,
        transform: `translateX(-${activeIndex * (100 / items.length)}%)`
    }

    const handleImageClick = (index: number) => {
        setActiveIndex(index);
    }

    const formatSrcSet = (index: number) => {
        let result = '';
        for (const format in items[index].formats) {
            result += `${import.meta.env.VITE_API_URL}${items[index].formats[format].url} ${items[index].formats[format].width}w,`
        }
        return result;
    }

    return (
            <div className={"image-carousel"}>
                <div className={"image-carousel__container"} style={carouselStyle}>
                    {
                        items.map((item, index) => (
                            <img
                                key={`items-${index}`}
                                src={`${import.meta.env.VITE_API_URL}${item.formats.large?.url ?? item.formats.medium?.url ?? item.formats.small?.url ?? item.formats.thumbnail?.url}`}
                                alt={`${item.altText}`}
                                srcSet={`${formatSrcSet(index)}`}
                            />
                        ))
                    }
                </div>
                <div className="image-carousel__commands">
                    {
                        items.map((item, index) => (
                            <button
                                key={`commands-${index}`}
                                onClick={() => {
                                    handleImageClick(index);}
                                }
                            >
                            </button>
                            )
                        )
                    }
                </div>
            </div>
    )
}

export default ImageCarousel;
