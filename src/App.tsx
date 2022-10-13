import React, {useState} from 'react';
import SingleProduct from "./views/SingleProduct/SingleProduct";
import {Route, Routes, useLocation, useParams} from "react-router-dom";
import Home from "./views/Home/Home";
import Shop from "./views/Shop/Shop";
import {AppPropsType, CartType, Product} from "./components/types";
import './app.scss';
import FloatingCart from "./components/FloatingCart/FloatingCart";

const App = ({products, categories, currency}: AppPropsType) => {

    const [cart, setCart] = useState<CartType>({
        items: [],
        productsCount: 0,
        totalPrice: 0,
    });
    const [floatingCartOpen, setFloatingCartOpen] = useState(false);
    const [productsItems, setProductsItems] = useState(products);

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
        const updatedProducts = products.map((product: Product) => {
            if (product.id === id) {
                product.isInWishList = !product.isInWishList;
            }
            return product;
        });

        setProductsItems(updatedProducts);
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
                        categories={categories}
                        currency={currency}
                        products={productsItems}
                        onLikeClick={handleLikeClick}
                    />}/>
                <Route
                    path="shop/:slug"
                    element={<SingleProduct
                        products={productsItems}
                        addToCart={addProductToCart}
                        currencySymbol={currency}
                        onLikeClick={handleLikeClick}
                    />}/>
            </Routes>
        </div>
    )
};

export default App;
