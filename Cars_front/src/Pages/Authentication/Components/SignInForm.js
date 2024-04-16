import React, { useRef } from "react";
import EmailInputForm from "../../../Components/EmailInputForm";
import PasswordInputForm from "../../../Components/PasswordInputForm";
import Form from "../../../Layouts/Form";

import Buttons from "../Components/Buttons";
import classes from "../Styles/SignInForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../Store/index";
import { useNavigate } from "react-router-dom";

import { calculRemainingTime } from "../../../helpers/MyLib";

const SignInForm = () => {
  const mailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state.auth;
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const mailValue = mailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const url = "http://localhost:4000/auth/sign-in";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: mailValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            authActions.setAuthStatus({
              token: res.token,
              isAuth: true,
              userId: res.userId,
              expires: res.expires,
            })
          );

          navigate("/");
          setTimeout(() => {
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
            navigate("/sign-in");
          }, calculRemainingTime(res.expires));
        }
      })
      .catch((err) => {});
  };

  return (
    <Form customStyle={classes.custom} onSubmit={submitHandler}>
      <EmailInputForm label="Email" ref={mailRef} />
      <PasswordInputForm label="Password" ref={passwordRef} />
      <Buttons />
    </Form>
  );
};

export default SignInForm;
