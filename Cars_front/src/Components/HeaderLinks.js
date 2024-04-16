import React from "react";

import { NavLink } from "react-router-dom";
import classes from "./Styles/HeaderLinks.module.css";

const HeaderLinks = (props) => {
  return (
    <ul className={classes.nav__links}>
      <li className={classes.nav__link}>
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? classes.active : undefined;
          }}
          end
        >
          Home
        </NavLink>
      </li>
      <li className={classes.nav__link}>
        <NavLink
          to="/collections"
          className={({ isActive }) => {
            return isActive ? classes.active : undefined;
          }}
        >
          Collections
        </NavLink>
      </li>
      <li className={classes.nav__link}>
        <NavLink
          to="/cars"
          className={({ isActive }) => {
            return isActive ? classes.active : undefined;
          }}
        >
          Cars
        </NavLink>
      </li>
      {props.isAuth && (
        <li className={classes.nav__link}>
          <NavLink
            to="/add"
            className={({ isActive }) => {
              return isActive ? classes.active : undefined;
            }}
          >
            Add
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default HeaderLinks;
