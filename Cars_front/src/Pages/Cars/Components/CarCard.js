import React, { useEffect, useState } from "react";
import Card from "../../../Layouts/Card";
import ImageContentCard from "./ImageContentCard";
import ModelContentCard from "./ModelContentCard";
import YearContentCard from "./YearContentCard";
import PriceContentCard from "./PriceContentCard";
import BrandLogoContentCard from "./BrandLogoContentCard";
import CallToActionContentCard from "./CallToActionContentCard";
import DescriptionContentCard from "./DescriptionContentCard";

import ConfirmModal from "../../../Components/ConfirmModal";

import classes from "../Styles/CarCard.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CarCard = (props) => {
  const navigate = useNavigate();
  const [enableModal, setEnableModal] = useState(false);
  const car_data = props.car_data;
  const authState = useSelector((state) => state.auth);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    return setIsAuth(authState.isAuth);
  }, [authState.isAuth]);

  const confirmHandler = (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/cars/deleteCar";
    const method = "DELETE";
    fetch(url, {
      headers: {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify({ model_id: car_data.id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/cars");
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
        <ImageContentCard image={car_data.image} />
        <div className={classes.card_header}>
          <ModelContentCard model={car_data.model} />
          <YearContentCard year={car_data.year} />
        </div>
        <PriceContentCard price={car_data.price} />
        <DescriptionContentCard description={car_data.description} />
        <footer className={classes.card_footer}>
          {isAuth &&
            props.toggleState === "edit" &&
            car_data.userId === authState.userId && (
              <CallToActionContentCard
                card_id={car_data.id}
                onDelete={deleteHandler}
              />
            )}
          <BrandLogoContentCard
            image={car_data["collection.logo"]}
            brandName={car_data["collection.name"]}
          />
        </footer>
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

export default CarCard;
