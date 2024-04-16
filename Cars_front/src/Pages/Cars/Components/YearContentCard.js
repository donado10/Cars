import React from "react";
import classes from "../Styles/YearContentCard.module.css";

const YearContentCard = (props) => {
  return (
    <div className={classes.year}>
      <h1>{props.year}</h1>
    </div>
  );
};

export default YearContentCard;
