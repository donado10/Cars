import React from "react";
import classes from "./Styles/FileInputForm.module.css";

const FileInputForm = React.forwardRef((props, ref) => {
  return (
    <div className={classes["file__input"]}>
      <label htmlFor={props.label}>{props.label}</label>
      <input type="file" name={props.label.toLowerCase()} ref={ref} />
    </div>
  );
});

export default FileInputForm;
