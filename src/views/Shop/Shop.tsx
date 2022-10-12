import React, {useState} from 'react';
import './shop.scss';
import {Product} from "../../components/types";
import ProductCard from "../../components/ProductCard/ProductCard";

interface ShopProps {
    products: Product[];
    categories: object[];
    currency: string;
    onLikeClick: (id: number) => void;
}

const Shop = ({products, categories, currency, onLikeClick}: ShopProps) => {
    const [activeCategory, setActiveCategory] = useState('All');

    console.log(categories);

    const categoryChangeHandler = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <div className={"shop-view container"}>
            <div className="page-headers">
                <h1 className="title">Shop</h1>
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
                                hidden={!((activeCategory === "All") ||  product.categories.map(item => item.name).includes(activeCategory))}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;
