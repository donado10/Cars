import React from "react";
import classes from "./Styles/TitlePage.module.css";

const TitlePage = (props) => {
  const className = `${classes.title} ${props.centered ? props.centered : ""}`;

  return (
    <div className={className}>
      <h1>{props.title}</h1>
    </div>
  );
};

export default TitlePage;
