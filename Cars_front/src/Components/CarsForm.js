import React, { useEffect, useState, useRef } from "react";

import SelectInputForm from "./SelectInputForm";
import TextInputForm from "./TextInputForm";
import LongTextInputForm from "./LongTextInputForm";
import FileInputForm from "./FileInputForm";
import YearInputForm from "./YearInputForm";
import PriceInputForm from "./PriceInputForm";
import FormButtons from "../Pages/Add/Components/FormButtons";
import ConfirmModal from "./ConfirmModal";
import Form from "../Layouts/Form";

import classes from "./Styles/CarsForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CarsForm = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [enableModal, setEnableModal] = useState(false);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  const CarData = props.car;

  const params = useParams();

  const brandRef = useRef();
  const modelRef = useRef();
  const yearRef = useRef();
  const priceRef = useRef();
  const fileRef = useRef();
  const descriptionRef = useRef();

  const brandValue = CarData?.["collection.name"]
    ? CarData["collection.name"]
    : "";
  const modelValue = CarData?.model ? CarData.model : "";
  const yearValue = CarData?.year ? CarData.year : "";
  const priceValue = CarData?.price ? CarData.price : "";

  const descriptionValue = CarData?.description ? CarData.description : "";

  useEffect(() => {
    const url = "http://localhost:4000/collections/names";

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData([...data.Collections_names]);
      });
  }, []);

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

    const formData = new FormData();
    formData.append("brand", brandRef.current.value.toString());
    formData.append("model", modelRef.current.value.toString());
    formData.append("year", yearRef.current.value.toString());
    formData.append("price", priceRef.current.value.toString());
    formData.append("description", descriptionRef.current.value.toString());
    formData.append("image", fileRef.current.files[0]);

    const url = "http://localhost:4000/cars/addCar";
    const method = "POST";
    fetchHelper(url, method, formData).then((res) => {
      if (res.status === 200) {
        navigate("/cars");
      }
    });
  };
  const submitPutHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("brand", brandRef.current.value.toString());
    formData.append("model", modelRef.current.value.toString());
    formData.append("year", yearRef.current.value.toString());
    formData.append("price", priceRef.current.value.toString());
    formData.append("description", descriptionRef.current.value.toString());
    formData.append("image", fileRef.current.files[0]);

    const url = `http://localhost:4000/cars/updateCar/${CarData.id}`;
    const method = "PUT";
    fetchHelper(url, method, formData).then((res) => {
      if (res.status === 200) {
        navigate("/cars");
      }
    });
  };

  let submit = null;

  if (props.method === "POST") {
    submit = submitPostHandler;
  }

  if (props.method === "PUT") {
    submit = submitPutHandler;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setEnableModal(true);
  };
  const confirmHandler = (e) => {
    e.preventDefault();
    submit(e);
  };
  return (
    <>
      {isLoading || (
        <Form customStyle={classes.custom}>
          <SelectInputForm
            label="Brand"
            options={data}
            ref={brandRef}
            defaultValue={brandValue}
          />
          <TextInputForm
            label="Model"
            ref={modelRef}
            defaultValue={modelValue}
          />
          <YearInputForm label="Year" ref={yearRef} defaultValue={yearValue} />
          <PriceInputForm
            label="Price"
            ref={priceRef}
            DefaultValue={priceValue}
          />
          <LongTextInputForm
            label="Description"
            ref={descriptionRef}
            defaultValue={descriptionValue}
          />
          <FileInputForm label="Image" ref={fileRef} />
          <FormButtons onSubmit={submitHandler} />
        </Form>
      )}
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

export default CarsForm;
