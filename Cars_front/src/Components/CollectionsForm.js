import { useRef, useState } from "react";

import TextInputForm from "./TextInputForm";
import LongTextInputForm from "./LongTextInputForm";
import FileInputForm from "./FileInputForm";
import FormButtons from "../Pages/Add/Components/FormButtons";

import classes from "./Styles/CollectionsForm.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmModal from "./ConfirmModal";
import Form from "../Layouts/Form";

const CollectionsForm = (props) => {
  const [enableModal, setEnableModal] = useState(false);
  const brandInput = useRef();
  const logoInput = useRef();
  const descriptionInput = useRef();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  const collectionData = props.collection;
  const brandValue = collectionData?.name ? collectionData.name : "";
  const descriptionValue = collectionData?.description
    ? collectionData.description
    : "";

  const fetchHelper = (url, method, data) => {
    return fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
      body: data,
    }).then((res) => {
      return res.json();
    });
  };

  const submitPostHandler = (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("brand", brandInput.current.value.toString());
    form.append("image", logoInput.current.files[0]);
    form.append("description", descriptionInput.current.value.toString());

    let url = "http://localhost:4000/collections/addBrand";
    const method = "POST";

    fetchHelper(url, method, form).then((res) => {
      if (res.status === 200) {
        navigate("/collections");
      }
    });
  };
  const submitPutHandler = (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("brand_id", collectionData.id);
    form.append("brand", brandInput.current.value.toString());
    form.append("image", logoInput.current.files[0]);
    form.append("description", descriptionInput.current.value.toString());

    let url = "http://localhost:4000/collections/updateBrand";
    const method = "PUT";

    fetchHelper(url, method, form).then((res) => {
      if (res.status === 200) {
        navigate("/collections");
      }
    });
  };

  const confirmHandler = (e) => {
    e.preventDefault();
    props.method === "POST" ? submitPostHandler(e) : submitPutHandler(e);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setEnableModal(true);
  };

  return (
    <>
      <Form customStyle={classes.custom}>
        <TextInputForm
          label="Brand"
          ref={brandInput}
          defaultValue={brandValue}
        />
        <FileInputForm label="Image" ref={logoInput} />
        <LongTextInputForm
          label="Description"
          ref={descriptionInput}
          defaultValue={descriptionValue}
        />
        <FormButtons onSubmit={submitHandler} />
      </Form>
      {enableModal && (
        <ConfirmModal
          message={"Are you sure ?"}
          onConfirm={confirmHandler}
          onCancel={(e) => {
            e.preventDefault();
            setEnableModal(false);
          }}
        />
      )}
    </>
  );
};

export default CollectionsForm;
