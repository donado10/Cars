import React from "react";
import classes from "./Styles/PasswordInputForm.module.css";

const PasswordInputForm = React.forwardRef((props, ref) => {
  return (
    <div className={classes["password__input"]}>
      <label className={classes.label} htmlFor={props.label}>
        {props.label}
      </label>
      <input
        className={classes.field}
        type="password"
        name={props.label}
        value={props.value}
        ref={ref}
      />
    </div>
  );
});

export default PasswordInputForm;
