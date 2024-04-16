import React from "react";
import classes from "../Styles/PriceContentCard.module.css";

const PriceContentCard = (props) => {
  return (
    <div className={classes.price}>
      <span>$</span>
      <h1>{props.price}</h1>
    </div>
  );
};

export default PriceContentCard;
