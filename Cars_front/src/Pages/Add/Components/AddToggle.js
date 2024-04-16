import React, { useState } from "react";
import classes from "../Styles/AddToggle.module.css";

const AddToggle = (props) => {
  const [collectionsChoiceToggle, setCollectionsChoiceToggle] = useState(false);
  const [carsChoiceToggle, setCarsChoiceToggle] = useState(false);

  const collectionsClass = `${classes["add__choice--collections"]} ${
    collectionsChoiceToggle ? classes.active : ""
  }`;

  const carsClass = `${classes["add__choice--cars"]} ${
    carsChoiceToggle ? classes.active : ""
  }`;

  const toggleChoiceCollectionsHandler = () => {
    if (carsChoiceToggle) {
      setCarsChoiceToggle(false);
    }

    if (collectionsChoiceToggle) {
      setCollectionsChoiceToggle(false);
      props.onFormToggle(false, carsChoiceToggle);
    } else {
      setCollectionsChoiceToggle(true);
      props.onFormToggle(true, false);
    }
  };
  const toggleChoiceCarsHandler = () => {
    if (collectionsChoiceToggle) {
      setCollectionsChoiceToggle(false);
    }

    if (carsChoiceToggle) {
      setCarsChoiceToggle(false);
      props.onFormToggle(collectionsChoiceToggle, false);
    } else {
      setCarsChoiceToggle(true);
      props.onFormToggle(false, true);
    }
  };
  return (
    <div className={classes["add__choice"]}>
      <button
        className={collectionsClass}
        onClick={toggleChoiceCollectionsHandler}
      >
        Collections
      </button>
      <button className={carsClass} onClick={toggleChoiceCarsHandler}>
        Cars
      </button>
    </div>
  );
};

export default AddToggle;
