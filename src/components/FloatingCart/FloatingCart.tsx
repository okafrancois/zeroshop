import React from 'react';
import './floating-cart.scss';
import {Link, useLocation} from "react-router-dom";
import {CartType} from "../types";
import ProductCard from "../ProductCard/ProductCard";
import bagIcon from '../../assets/img/bag-icon.svg';

type FloatingCartProps = {
    cart: CartType;
    currencySymbol: string;
    onLikeClick: (id: number) => void;
    openHandler: () => void;
    closeHandle: () => void;
    openState: boolean;
}

const FloatingCart = ({cart, currencySymbol, onLikeClick, closeHandle, openHandler, openState}: FloatingCartProps) => {
    const {items, productsCount, totalPrice} = cart;

    const handleModalClick: any = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target && !target.closest('.cart-modal__content')) {
            closeHandle();
        }
    };

    const location = useLocation();

    return (
        <div className={`floating-cart ${openState ? "--is-open" : ""} ${location.pathname === '/' ? '--disabled': ''}`}>
            <button className="floating-cart__icon" onClick={openHandler}>
                <span className="floating-cart__count">
                    {productsCount}
                </span>
                <i>
                    <img src={bagIcon} alt=""/>
                </i>
            </button>

            <div className="floating-cart__modal cart-modal" onClick={handleModalClick}>
                <div className="cart-modal__content">
                    <div className="cart-modal__header">
                        <h3 className="title">Cart</h3>
                        <button className="close-btn" onClick={closeHandle}>
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <div className="cart-modal__items">
                        {
                            items.map((item: any, index: number) => (
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
                            items.length === 0 &&
                            <p>Nothing in the cart 🫥 <br/> try to add some product from the <Link to={"/shop"} onClick={closeHandle}><span
                                className={"link-btn"}>shop page</span></Link></p>
                        }
                    </div>
                    <div className="cart-modal__footer">
                        <div className="cart-modal__total">
                            <span className="cart-modal__total-label">Total: </span><br/>
                            <span className="cart-modal__total-value">{currencySymbol}{totalPrice}</span>
                        </div>
                        <div className="actions">
                            <Link to="/checkout" className="btn --primary --block"
                                  onClick={closeHandle}>Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingCart;
