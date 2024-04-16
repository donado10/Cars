import React, { useEffect, useState } from "react";
import Card from "../../../Layouts/Card";

import ConfirmModal from "../../../Components/ConfirmModal";
import ImageContentCard from "./ImageContentCard";
import BrandContentCard from "./BrandContentCard";
import DescriptionContentCard from "./DescriptionContentCard";
import CallToActionContentCard from "./CallToActionContentCard";
import CardLink from "../../../Components/CardLink";

import classes from "../Styles/CollectionCard.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CollectionCard = (props) => {
  const [enableModal, setEnableModal] = useState(false);
  const authState = useSelector((state) => state.auth);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    return setIsAuth(authState.isAuth);
  }, [authState.isAuth]);

  const confirmHandler = (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/collections/deleteBrand";
    const method = "DELETE";
    fetch(url, {
      headers: {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify({ brand_id: props.collection.id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/collections");
        }
      });
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    setEnableModal(true);
  };
  return (
    <>
      <Card customStyle={classes.card}>
        <ImageContentCard image={props.collection.logo} />
        <BrandContentCard name={props.collection.name} />
        <DescriptionContentCard description={props.collection.description} />
        {isAuth &&
          props.toggleState === "edit" &&
          props.collection.userId === authState.userId && (
            <CallToActionContentCard
              card_id={props.collection.id}
              onDelete={deleteHandler}
            />
          )}
      </Card>
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

export default CollectionCard;
