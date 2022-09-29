import React from 'react';
import './shop.scss';
import {CartType, Product} from "../../components/types";
import ProductCard from "../../components/ProductCard/ProductCard";
import FloatingCart from "../../components/FloatingCart/FloatingCart";

interface ShopProps {
    products: Product[];
    categories: object[];
    currency: string;
    onLikeClick: (id: number) => void;
    currentCart: CartType;
}

const Shop = ({products, categories, currentCart, currency, onLikeClick}: ShopProps) => {
    const [activeCategory, setActiveCategory] = React.useState('All');

    const categoryChangeHandler = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <div className={"shop-view container"}>
            <div className="page-headers">
                <h1 className="title">Shop</h1>
                <FloatingCart cart={currentCart} currencySymbol={currency} onLikeClick={onLikeClick}/>
            </div>
            <h1 className={"title"}>Explore <br/> trendy cloths</h1>
            <div className="shop-content">
                <ul className="filters">
                    <li key={"01"}>
                        <button
                            className={`filters__option ${activeCategory === "All" ? "--active" : ""}`}
                            onClick={() => {
                                categoryChangeHandler("All")
                            }}
                        >All
                        </button>
                    </li>
                    {
                        categories.map((category: any, index) => {
                            return (
                                <li key={index}>
                                    <button
                                        className={`filters__option ${activeCategory === category ? "--active" : ""}`}
                                        onClick={() => {
                                            categoryChangeHandler(category)
                                        }}
                                    >
                                        {category}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="products">
                    {
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                currency={currency}
                                likeState={product.isInWishList}
                                imageUrl={product.thumbnail}
                                onLikeClick={onLikeClick}
                                hidden={!(activeCategory === "All" || activeCategory.toLowerCase() === product.category.toLowerCase())}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;
