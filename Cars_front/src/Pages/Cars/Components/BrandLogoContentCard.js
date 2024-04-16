import React from "react";
import classes from "../Styles/BrandLogoContentCard.module.css";
import { Link } from "react-router-dom";

const BrandLogoContentCard = (props) => {
  const formatPath = props.image.replace("\\", "/");
  const imagePath = `http://localhost:4000/${formatPath}`;

  return (
    <Link
      to={`/cars/view/${props.brandName}`}
      className={classes["brand__logo"]}
    >
      <img src={imagePath} alt="" />
    </Link>
  );
};

export default BrandLogoContentCard;
