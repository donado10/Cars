import React from "react";
import classes from "./Styles/Nav.module.css";

const Nav = (props) => {
  const className = `${classes.nav} ${
    props.customStyle ? props.customStyle : ""
  }`;
  return <nav className={className}>{props.children}</nav>;
};

export default Nav;
