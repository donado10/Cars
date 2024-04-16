import React from "react";
import classes from "./Styles/CallToActionPrimary.module.css";
import { Link, NavLink } from "react-router-dom";

const CallToActionPrimary = (props) => {
  const className = `${classes.cta} ${
    props.customStyle ? props.customStyle : ""
  }`;
  let anchor = null;
  if (props.onClick) {
    anchor = (
      <NavLink
        to={props.link}
        className={({ isActive }) => {
          return isActive ? classes.active : undefined;
        }}
        onClick={props.onClick}
      >
        {props.title}
      </NavLink>
    );
  } else {
    anchor = (
      <NavLink
        to={props.link}
        className={({ isActive }) => {
          return isActive ? classes.active : undefined;
        }}
      >
        {props.title}
      </NavLink>
    );
  }
  return <div className={className}>{anchor}</div>;
};

export default CallToActionPrimary;
