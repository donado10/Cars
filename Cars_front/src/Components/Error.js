import React from "react";
import classes from "./Styles/Error.module.css";

export const Error403 = () => {
  return (
    <h1 className={classes.error}>
      403
      <br />
      Unauthorized
    </h1>
  );
};

export const Error404 = () => {
  return (
    <h1 className={classes.error}>
      404
      <br />
      Not Found
    </h1>
  );
};

export const Error500 = () => {
  return (
    <h1 className={classes.error}>
      500
      <br />
      Server Error
    </h1>
  );
};
