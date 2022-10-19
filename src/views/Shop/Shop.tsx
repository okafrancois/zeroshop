import React, {useState} from 'react';
import './shop.scss';
import {ShopCategory, ShopProduct} from "../../components/types";
import ProductCard from "../../components/ProductCard/ProductCard";

interface ShopProps {
    products: ShopProduct[];
    categories: ShopCategory[];
    currency: string;
    onLikeClick: (id: number) => void;
}

const Shop = ({products, categories, currency, onLikeClick}: ShopProps) => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categoryChangeHandler = (category: string): void => {
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
                        categories.map((category: ShopCategory, index) => {
                            return (
                                <li key={index}>
                                    <button
                                        className={`filters__option ${activeCategory === category.name ? "--active" : ""}`}
                                        onClick={() => {
                                            categoryChangeHandler(category.name)
                                        }}
                                    >
                                        {category.name}
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
                                product={product}
                                currency={currency}
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
