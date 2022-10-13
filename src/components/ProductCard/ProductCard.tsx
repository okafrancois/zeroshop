import React, {MutableRefObject, useEffect, useRef} from 'react';
import {CardProps} from "../types";
import './product-card.scss';
import {Link} from "react-router-dom";

const ProductCard = ({product, onLikeClick, currency, hidden}: CardProps) => {
    const {id, title, price, isInWishList, cover, slug} = product;
    const handleLikeClick = () => {
        onLikeClick(id);
    };

    let cardImage: MutableRefObject<any | undefined> = useRef<HTMLElement>();
    let cardContent: MutableRefObject<any | undefined> = useRef<HTMLElement>();

    useEffect(() => {
        cardImage.current.classList.add('fadeInUp');
        cardContent.current.classList.add('fadeInUp');
    });

    const formatSrc = (): string => {
        let result = '';
        for (const format in cover.formats) {
            result += `${import.meta.env.VITE_API_URL}${cover.formats[format].url} ${cover.formats[format].width}w,`
        }

        return result;
    }

    const imageSrcSet: string = formatSrc();

    return (
        <div className={`product-card ${hidden ? "--is-hidden": ""}`}>
            <div className="product-card__image" ref={cardImage}>
                <div className="product-card__actions">
                    <button className={"fav-btn"} onClick={handleLikeClick}>
                        {isInWishList ? <i className="fas fa-heart"/> : <i className="far fa-heart"/>}
                    </button>
                </div>

                <Link to={`/shop/${slug}`}>
                    <img
                        src={`${import.meta.env.VITE_API_URL}${cover.formats.large?.url ?? cover.formats.medium?.url ?? cover.formats.small?.url ?? cover.formats.thumbnail?.url}`}
                        srcSet={imageSrcSet}
                        alt={`${cover.altText}`}/>
                </Link>
            </div>
            <Link className="product-card__content" to={`${slug}`} ref={cardContent}>
                <div className="product-card__price">
                    <span className={"product-card__price-currency"}>{currency}</span>
                    <span className={"product-card__price-value"}>{price}</span>
                </div>
                <p className={"product-card__title"}>{title}</p>
            </Link>
        </div>
    );
};

export default ProductCard;
