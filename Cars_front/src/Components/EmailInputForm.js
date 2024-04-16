import React from "react";
import classes from "./Styles/EmailInputForm.module.css";

const EmailInputForm = React.forwardRef((props, ref) => {
  return (
    <div className={classes["email__input"]}>
      <label className={classes.label} htmlFor={props.label}>
        {props.label}
      </label>
      <input
        className={classes.field}
        type="email"
        name={props.label}
        value={props.value}
        ref={ref}
      />
    </div>
  );
});

export default EmailInputForm;
