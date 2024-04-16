import React from "react";
import classes from "../Styles/ImageContentCard.module.css";

const ImageContentCard = (props) => {
  const imagePath = props.image.replace("\\", "/");
  const url = `http://localhost:4000/${imagePath}`;
  return (
    <div className={classes.image}>
      <img src={url} alt="" />
    </div>
  );
};

export default ImageContentCard;
