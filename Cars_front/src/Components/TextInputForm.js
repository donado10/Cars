import React from "react";
import classes from "./Styles/TextInputForm.module.css";

const TextInputForm = React.forwardRef((props, ref) => {
  return (
    <div className={classes["text__input"]}>
      <label className={classes.label} htmlFor={props.label}>
        {props.label}
      </label>
      <input
        className={classes.field}
        type="text"
        name={props.label.toLowerCase()}
        defaultValue={props.defaultValue}
        ref={ref}
      />
    </div>
  );
});

export default TextInputForm;
