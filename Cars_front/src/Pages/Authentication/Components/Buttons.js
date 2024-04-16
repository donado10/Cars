import React from "react";

import classes from "../Styles/Buttons.module.css";

const Buttons = () => {
  return (
    <div className={classes["buttons"]}>
      <button className={classes.btn}>Submit</button>
    </div>
  );
};

export default Buttons;
