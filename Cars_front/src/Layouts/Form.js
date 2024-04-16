import React from "react";
import classes from "./Styles/Form.module.css";

const Form = (props) => {
  const submitHandler = props.onSubmit;
  const classnames = `${classes.form} ${props.customStyle}`;

  if (props?.onSubmit) {
    return (
      <form className={classnames} onSubmit={props.onSubmit}>
        {props.children}
      </form>
    );
  }
  return <form className={classnames}>{props.children}</form>;
};

export default Form;
