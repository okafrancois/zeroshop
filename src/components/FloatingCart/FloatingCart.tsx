import React, {useState} from 'react';
import './floating-cart.scss';
import {Link} from "react-router-dom";
import {CartType} from "../types";
import ProductCard from "../ProductCard/ProductCard";

type FloatingCartProps = {
    cart: CartType;
    currencySymbol: string;
    onLikeClick: (id: number) => void;
}

const FloatingCart = ({cart, currencySymbol, onLikeClick}: FloatingCartProps) => {
    const [cartData, setCart] = useState(cart);
    const [isOpen, setIsOpen] = useState(false);

    const handleCartToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleModalClick = (e: any) => {
        if (e.target.closest('.cart-modal__content') === null) {
            setIsOpen(false);
        }
    };

    return (
        <div className={`floating-cart ${isOpen ? "--is-open" : ""}`}>
            <button className="floating-cart__icon" onClick={handleCartToggle}>
                <span className="floating-cart__count">
                    {cart.productsCount}
                </span>
                <i className="fa-solid fa-bag-shopping"></i>
            </button>

            <div className="floating-cart__modal cart-modal" onClick={handleModalClick}>
                <div className="cart-modal__content">
                    <div className="cart-modal__header">
                        <h3 className="title">Cart</h3>
                        <button className="close-btn" onClick={handleCartToggle}>
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <div className="cart-modal__items">
                        {
                            cartData.items.map((item: any, index: number) => (
                                <ProductCard
                                    key={`cart-item-${index}`}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    imageUrl={item.thumbnail}
                                    currency={currencySymbol}
                                    likeState={item.isInWishList}
                                    onLikeClick={onLikeClick}
                                    hidden={false}
                                />
                            ))
                        }

                        {
                            cartData.items.length === 0 &&
                            <p>Nothing in the cart 🫥 <br/> try to add some product from the <Link to={"/shop"}
                                                                                                  onClick={handleCartToggle}><span
                                className={"link-btn"}>shop page</span></Link></p>
                        }
                    </div>
                    <div className="cart-modal__footer">
                        <div className="cart-modal__total">
                            <span className="cart-modal__total-label">Total: </span><br/>
                            <span className="cart-modal__total-value">{currencySymbol}{cart.totalPrice}</span>
                        </div>
                        <div className="actions">
                            <Link to="/checkout" className="btn --primary --block"
                                  onClick={handleCartToggle}>Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingCart;
