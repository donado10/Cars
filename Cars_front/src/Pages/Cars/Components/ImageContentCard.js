import React from "react";
import classes from "../Styles/ImageContentCard.module.css";

const ImageContentCard = (props) => {
  const formatPath = props.image.replace("\\", "/");
  const imagePath = `http://localhost:4000/${formatPath}`;

  return (
    <div className={classes.image}>
      <img src={imagePath} alt="" />
    </div>
  );
};

export default ImageContentCard;
