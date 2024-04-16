import React from "react";
import classes from "./Styles/Card.module.css";

const Card = (props) => {
  const className = `${classes.card} ${
    props.customStyle ? props.customStyle : ""
  }`;

  return <div className={className}>{props.children}</div>;
};

export default Card;
