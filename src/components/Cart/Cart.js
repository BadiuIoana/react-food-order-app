import React, { Fragment } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHanler = () => {
        setIsCheckout(true);
    };
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch(
            "https://react-food-order-app-f0c97-default-rtdb.firebaseio.com/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
            }
        );
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onCancel={props.onClose}
                    onConfirm={submitOrderHandler}
                />
            )}
            {!isCheckout && (
                <div className={classes.actions}>
                    <button
                        className={classes["button--alt"]}
                        onClick={props.onClose}
                    >
                        Close
                    </button>
                    {hasItems && (
                        <button
                            className={classes.button}
                            onClick={orderHanler}
                        >
                            Order
                        </button>
                    )}
                </div>
            )}
        </Fragment>
    );
    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = (
        <Fragment>
            <p> Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes["button"]} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </Fragment>
    );
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
