import React from "react";
import classes from "./Styles/SelectInputForm.module.css";

const SelectInputForm = React.forwardRef((props, ref) => {
  const options = props.options;
  return (
    <div className={classes["select__input"]}>
      <label className={classes.label} htmlFor="brand">
        {props.label}
      </label>
      <select className={classes.field} name="brand" ref={ref}>
        {options.map((option, i) => {
          if (props.defaultValue === option) {
            return (
              <option key={i} value={option} selected="selected">
                {option}
              </option>
            );
          }
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
});

export default SelectInputForm;
