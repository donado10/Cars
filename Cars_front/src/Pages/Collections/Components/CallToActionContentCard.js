import React from "react";
import CardLink from "../../../Components/CardLink";

import classes from "../Styles/CallToActionContentCard.module.css";

const CallToActionContentCard = (props) => {
  const link = `/collections/edit/${props.card_id}`;
  return (
    <div className={classes.ctas}>
      <CardLink title="Edit" link={link} />
      <button className={classes.btn} onClick={props.onDelete}>
        Delete
      </button>
    </div>
  );
};

export default CallToActionContentCard;
