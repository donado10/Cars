import React from "react";

import CallToActionPrimary from "./CallToActionPrimary";

import classes from "./Styles/Header.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/index";
import Nav from "../Layouts/Nav";
import HeaderLinks from "./HeaderLinks";

const Header = (props) => {
  const dispatch = useDispatch();
  const isAuth = props.isAuth;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expires");
    localStorage.removeItem("isAuth");
    dispatch(
      authActions.setAuthStatus({
        token: "",
        userId: "",
        expires: 0,
        isAuth: false,
      })
    );
  };
  return (
    <Nav customStyle={classes.nav}>
      <HeaderLinks isAuth={isAuth} />

      <div className={classes["nav__ctas"]}>
        {!isAuth && (
          <>
            <CallToActionPrimary
              link="/sign-in"
              title="Sign In"
              customStyle={classes["nav__cta"]}
            />
            <CallToActionPrimary
              link="/sign-up"
              title="Sign Up"
              customStyle={classes["nav__cta"]}
            />
          </>
        )}
        {isAuth && (
          <CallToActionPrimary
            link="/sign-in"
            title="Logout"
            customStyle={classes["nav__cta"]}
            onClick={logoutHandler}
          />
        )}
      </div>
    </Nav>
  );
};

export default Header;
