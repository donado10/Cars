import React from "react";
import classes from "../Styles/BrandContentCard.module.css";

const BrandContentCard = (props) => {
  return (
    <div className={classes.brand}>
      <h1>{props.name}</h1>
    </div>
  );
};

export default BrandContentCard;
