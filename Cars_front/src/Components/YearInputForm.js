import React from "react";
import classes from "./Styles/YearInputForm.module.css";

const YearInputForm = React.forwardRef((props, ref) => {
  return (
    <div className={classes["year__input"]}>
      <label className={classes.label} htmlFor="brand">
        {props.label}
      </label>
      <input
        className={classes.field}
        type="number"
        name="brand"
        defaultValue={props.defaultValue}
        ref={ref}
      />
    </div>
  );
});

export default YearInputForm;
