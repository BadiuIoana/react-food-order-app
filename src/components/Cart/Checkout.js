import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length == 6;
const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isSixChars(enteredPostal);
        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid,
        });
        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        }

        //Submit the cart data
    };

    const nameControllClasses = `${classes.control} ${
        formInputValidity.name ? "" : classes.invalid
    }`;
    const streetControllClasses = `${classes.control} ${
        formInputValidity.street ? "" : classes.invalid
    }`;
    const postalCodeControllClasses = `${classes.control} ${
        formInputValidity.postalCode ? "" : classes.invalid
    }`;
    const cityControllClasses = `${classes.control} ${
        formInputValidity.city ? "" : classes.invalid
    }`;
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControllClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetControllClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && (
                    <p>Please enter a valid street</p>
                )}
            </div>
            <div className={postalCodeControllClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formInputValidity.postalCode && (
                    <p>Please enter a valid postal code</p>
                )}
            </div>
            <div className={cityControllClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
