import classes from "./Header.module.css";
import mealsImage from "../../assests/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import { Fragment } from "react";
const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt='meals image' />
            </div>
        </Fragment>
    );
};

export default Header;
