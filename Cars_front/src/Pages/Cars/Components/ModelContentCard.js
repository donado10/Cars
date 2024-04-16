import React from "react";
import classes from "../Styles/ModelContentCard.module.css";

const ModelContentCard = (props) => {
  return (
    <div className={classes.model}>
      <h1>{props.model}</h1>
    </div>
  );
};

export default ModelContentCard;
