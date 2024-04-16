import React from "react";

import classes from "../Styles/FormButtons.module.css";

const FormButtons = (props) => {
  return (
    <div className={classes["btns"]}>
      <button className={classes.btn} onClick={props.onSubmit}>
        Submit
      </button>
      <button className={classes.btn}>Cancel</button>;
    </div>
  );
};

export default FormButtons;
