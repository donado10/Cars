import React from "react";
import classes from "./Styles/PriceInputForm.module.css";

const PriceInputForm = React.forwardRef((props, ref) => {
  return (
    <div className={classes["price__input"]}>
      <label className={classes.label} htmlFor="brand">
        {props.label}
      </label>
      <input
        className={classes.field}
        type="number"
        name="brand"
        defaultValue={props.DefaultValue}
        step="0.01"
        ref={ref}
      />
    </div>
  );
});

export default PriceInputForm;
