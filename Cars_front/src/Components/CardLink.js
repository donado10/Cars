import React from "react";
import classes from "./Styles/CardLink.module.css";
import { Link } from "react-router-dom";

const CardLink = (props) => {
  const className = `${classes.cta} ${
    props.customStyle ? props.customStyle : ""
  }`;
  let anchor = null;
  if (props.onClick) {
    anchor = (
      <Link to={props.link} onClick={props.onClick}>
        {props.title}
      </Link>
    );
  } else {
    anchor = <Link to={props.link}>{props.title}</Link>;
  }
  return <div className={className}>{anchor}</div>;
};

export default CardLink;
