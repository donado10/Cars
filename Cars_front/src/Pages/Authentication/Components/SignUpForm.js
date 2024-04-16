import React, { useRef } from "react";
import EmailInputForm from "../../../Components/EmailInputForm";
import PasswordInputForm from "../../../Components/PasswordInputForm";
import Buttons from "../Components/Buttons";
import classes from "../Styles/SignUpForm.module.css";
import { useNavigate } from "react-router-dom";

import Form from "../../../Layouts/Form";

const SignUpForm = () => {
  const mailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const url = "http://localhost:4000/auth/sign-up";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: mailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          navigate("/sign-in");
        }
      });
  };

  return (
    <Form customStyle={classes.custom} onSubmit={submitHandler}>
      <EmailInputForm label="Email" ref={mailRef} />
      <PasswordInputForm label="Password" ref={passwordRef} />
      <PasswordInputForm label="ConfirmPassword" ref={confirmPasswordRef} />
      <Buttons />
    </Form>
  );
};

export default SignUpForm;
