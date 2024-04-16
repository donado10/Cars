import React from "react";
import classes from "./Styles/LongTextInputForm.module.css";

const LongTextInputForm = React.forwardRef((props, ref) => {
  return (
    <div className={classes["long-text__input"]}>
      <label className={classes.label} htmlFor={props.label}>
        {props.label}
      </label>
      <textarea
        className={classes.field}
        defaultValue={props.defaultValue}
        name={props.label.toLowerCase()}
        cols="30"
        rows="10"
        ref={ref}
      />
    </div>
  );
});

export default LongTextInputForm;
