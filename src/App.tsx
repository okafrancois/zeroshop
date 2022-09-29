import React, {useState} from 'react';
import SingleProduct from "./views/SingleProduct/SingleProduct";
import {Route, Routes} from "react-router-dom";
import Home from "./views/Home/Home";
import Shop from "./views/Shop/Shop";
import {AppPropsType, CartType, Product} from "./components/types";
import './app.scss';
import FloatingCart from "./components/FloatingCart/FloatingCart";

const App = ({products, categories, currency}: AppPropsType) => {
    const [shopData, setShopData] = useState({
        products: products,
        categories: categories,
        currency: currency
    });

    const [cart, setCart] = useState<CartType>({
        items: [],
        productsCount: 0,
        totalPrice: 0,
    });

    const [floatingCartOpen, setFloatingCartOpen] = useState(false);

    const addProductToCart = (product: Product) => {
        const currentCart = cart;

        const isProductInCart = currentCart.items.find((item: Product) => item.id === product.id);

        if (isProductInCart) {
            return;
        } else {
            setCart({
                items: [...currentCart.items, product],
                productsCount: currentCart.productsCount + 1,
                totalPrice: currentCart.totalPrice + product.price,
            });

            setFloatingCartOpen(true);
        }
    };

    const handleLikeClick = (id: number) => {
        const updatedProducts = shopData.products.map((product: Product) => {
            if (product.id === id) {
                product.isInWishList = !product.isInWishList;
            }
            return product;
        });

        const updatedShopData = {
            ...shopData,
            products: updatedProducts,
        };

        setShopData(updatedShopData);
    };

    const onFloatingCartOpen = () => {
        setFloatingCartOpen(true);
    }

    const onFCartClose = () => {
        setFloatingCartOpen(false);
    }

    return (
        <div className="App">
            <FloatingCart cart={cart} currencySymbol={currency} openHandler={onFloatingCartOpen} closeHandle={onFCartClose} onLikeClick={handleLikeClick} openState={floatingCartOpen}/>
            <Routes>
                <Route
                    path="/"
                    element={<Home/>}
                />
                <Route
                    path="shop"
                    element={<Shop
                        categories={shopData.categories}
                        currency={shopData.currency}
                        products={shopData.products}
                        onLikeClick={handleLikeClick}
                    />}/>
                <Route
                    path="shop/:paramId"
                    element={<SingleProduct
                        products={shopData.products}
                        addToCart={addProductToCart}
                        currencySymbol={shopData.currency}
                        onLikeClick={handleLikeClick}
                    />}/>
            </Routes>
        </div>
    )
};

export default App;
