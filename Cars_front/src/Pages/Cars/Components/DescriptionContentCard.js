import React from "react";
import classes from "../Styles/DescriptionContentCard.module.css";

const DescriptionContentCard = (props) => {
  return (
    <div className={classes.description}>
      <p>{props.description}</p>
    </div>
  );
};

export default DescriptionContentCard;
