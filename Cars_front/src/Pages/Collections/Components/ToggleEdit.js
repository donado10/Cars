import React, { useState } from "react";
import classes from "../Styles/ToggleEdit.module.css";

const ToggleEdit = (props) => {
  const [allButtonActive, setAllButtonActive] = useState(true);
  const [editButtonActive, setEditButtonActive] = useState(false);

  const allButtonHandler = (e) => {
    e.preventDefault();

    setAllButtonActive((prev) => {
      return !prev;
    });

    setEditButtonActive((prev) => {
      return !prev;
    });

    if (allButtonActive) {
      props.onState("edit");
    } else {
      props.onState("all");
    }
  };

  const editButtonHandler = (e) => {
    e.preventDefault();
    setEditButtonActive((prev) => {
      return !prev;
    });

    setAllButtonActive((prev) => {
      return !prev;
    });

    if (editButtonActive) {
      props.onState("all");
    } else {
      props.onState("edit");
    }
  };
  return (
    <div className={classes.toggle}>
      <button
        onClick={allButtonHandler}
        className={`${allButtonActive ? classes.active : ""}`}
      >
        All
      </button>
      <button
        onClick={editButtonHandler}
        className={`${editButtonActive ? classes.active : ""}`}
      >
        Edit
      </button>
    </div>
  );
};

export default ToggleEdit;
