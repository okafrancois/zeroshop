import React, {MutableRefObject, useEffect, useRef} from 'react';
import {CardProps} from "../types";
import './product-card.scss';
import {Link} from "react-router-dom";

const ProductCard = ({id, title, price, currency, likeState, imageUrl, onLikeClick, hidden}: CardProps) => {
    const handleLikeClick = () => {
        onLikeClick(id);
    };

    let cardImage: MutableRefObject<any | undefined> = useRef<HTMLElement>();
    let cardContent: MutableRefObject<any | undefined> = useRef<HTMLElement>();

    useEffect(() => {
        cardImage.current.classList.add('fadeInUp');
        cardContent.current.classList.add('fadeInUp');
    });

    return (
        <div className={`product-card ${hidden ? "--is-hidden": ""}`}>
            <div className="product-card__image" ref={cardImage}>
                <div className="product-card__actions">
                    <button className={"fav-btn"} onClick={handleLikeClick}>
                        {likeState ? <i className="fas fa-heart"/> : <i className="far fa-heart"/>}
                    </button>
                </div>
                <Link to={`/shop/${id}`}>
                    <img src={`${import.meta.env.VITE_API_URL}${imageUrl}`} alt={title}/>
                </Link>
            </div>
            <Link className="product-card__content" to={`${id}`} ref={cardContent}>
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
