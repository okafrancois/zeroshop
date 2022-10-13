import React, {useState} from 'react';
import './single-product.scss';
import {Link, useParams} from "react-router-dom";
import {Product} from "../../components/types";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";

type SingleProductParams = {
    products: Product[];
    addToCart: (product: Product) => void;
    currencySymbol: string;
    onLikeClick: (id: number) => void;
}

const SingleProduct = ({products, addToCart, currencySymbol, onLikeClick}: SingleProductParams) => {
    const {slug} = useParams<string>();
    const product: Product | undefined = products.find((product: Product) => product.slug === slug);

    if (product) {
        const {id, title, description, price, cover, colors, sizes, images, isInWishList } = product as Product;
        const [galleryImage, setGalleryImage] = useState(images);
        const [activeColor, setActiveColor] = useState(colors[0].name);
        const [activeSize, setActiveSize] = useState(sizes[0].name);
        const formatSrc = (): string => {
            let result = '';
            for (const format in cover.formats) {
                result += `${import.meta.env.VITE_API_URL}${cover.formats[format].url} ${cover.formats[format].width}w,`
            }

            return result;
        }
        const imageSrcSet: string = formatSrc();

        const optionChangeHandler = (optionName: string, value: string) => {
            switch (optionName) {
                case 'color':
                    setActiveColor(value);
                    break;
                case 'size':
                    setActiveSize(value);
                    break;
                default:
                    break;
            }
        };

        return (
            <div className={"single-product-view container"}>
                <div className="page-headers">
                    <Link className="back-btn" to={"/shop"}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <h1 className="title">Details</h1>
                    <div/>
                </div>
                <div className="product">
                    <div className="product__cover">
                        <ImageCarousel items={[cover, ...images]} startIndex={0}/>
                    </div>
                    <div className="product__content">
                        <h1 className={"product__title"}>{title}</h1>
                        <div className="product__desc">
                            <p>{description}</p>
                        </div>
                        <div className="product__colors color-options">
                            {
                                colors.map((color: { name: string, code: string }, index: number) => {
                                    return (
                                        <button
                                            onClick={() => optionChangeHandler("color", color.name)}
                                            key={`color-${index}`}
                                            className={`color-options__item ${color.name === activeColor ? "--active" : ""}`}
                                            style={{color: color.code}}>
                                            <span></span>
                                        </button>
                                    )

                                })
                            }
                        </div>
                        <div className="product__sizes size-options">
                            <h3 className={"size-options__title"}>Sizes</h3>
                            <div className="size-options__list">
                                {
                                    sizes.map((size: { name: string, shortname: string }, index: number) => {
                                        return (
                                            <span
                                                onClick={() => optionChangeHandler("size", size.name)}
                                                key={`size-${index}`}
                                                className={`size-options__item ${size.name === activeSize ? "--active" : ""}`}>
                                        <span>{size.shortname}</span>
                                    </span>
                                        )

                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="product__actions">
                        <div className="product__price">
                            <span className={"product__price-currency"}>{currencySymbol}</span>
                            <span className={"product__price-value"}>{price}</span>
                            <i className="fa-solid fa-tag"></i>
                        </div>
                        <button className={"fav-btn"} onClick={() => {
                            onLikeClick(id);
                        }}>
                            {isInWishList ? <i className="fas fa-heart"/> : <i className="far fa-heart"/>}
                        </button>
                        <button className={"btn --primary"} onClick={() => {
                            if (product !== undefined && product !== null) {
                                addToCart(product)
                            }
                        }}>Add to Bag
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} className="single-product-view container">
            <h1>Product not found</h1>
            <Link to={"/shop"}>Go back to Shop</Link>
        </div>
    }
};

export default SingleProduct;
