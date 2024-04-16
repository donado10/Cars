import Card from "../Layouts/Card";
import classes from "./Styles/ConfirmModal.module.css";
import ReactDom from "react-dom";

const ConfirmModal = (props) => {
  return ReactDom.createPortal(
    <>
      <div className={classes.overlay} onClick={props.onCancel}></div>
      <Card customStyle={classes.modal}>
        <h1>{props.message}</h1>
        <div className={classes.btns}>
          <button className={classes.btn} onClick={props.onConfirm}>
            confirm
          </button>
          <button className={classes.btn} onClick={props.onCancel}>
            cancel
          </button>
        </div>
      </Card>
    </>,
    document.getElementById("portal")
  );
};

export default ConfirmModal;
