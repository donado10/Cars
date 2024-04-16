import React, { useState } from "react";
import CarCard from "./Components/CarCard";
import classes from "./Styles/Cars.module.css";
import TitlePage from "../../Components/TitlePage";
import ToggleEdit from "../Collections/Components/ToggleEdit";
import { useLoaderData } from "react-router-dom";
import { Error500 } from "../../Components/Error";
import { useSelector } from "react-redux";

const CarsPage = () => {
  const classname = `${classes["card__list"]}`;
  const data = useLoaderData("cars-data");
  const [toggleState, setToggleState] = useState("all");
  const authState = useSelector((state) => state.auth);

  const stateToggleHandler = (state) => {
    setToggleState(state);
  };

  const allCarHandler = () => {
    return (
      <div className={classname}>
        {data.cars.map((car) => {
          return <CarCard key={car.id} id={car.id} car_data={car} />;
        })}
      </div>
    );
  };

  const editCarHandler = () => {
    const carsFiltered = data.cars.filter((car) => {
      return car.userId === authState.userId;
    });
    return (
      <div className={classname}>
        {carsFiltered.map((car) => {
          return (
            <CarCard
              key={car.id}
              id={car.id}
              car_data={car}
              toggleState={toggleState}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      {data.status === 500 && <Error500 />}
      {data.status === 200 && (
        <>
          <TitlePage title="Cars" />
          {!authState.isAuth && (
            <div className={classname}>
              {data.cars.map((car) => {
                return (
                  <CarCard
                    key={car.id}
                    id={car.id}
                    car_data={car}
                    toggleState={toggleState}
                  />
                );
              })}
            </div>
          )}
          {authState.isAuth && toggleState === "all" && allCarHandler()}
          {authState.isAuth && toggleState === "edit" && editCarHandler()}
        </>
      )}
      {authState.isAuth && <ToggleEdit onState={stateToggleHandler} />}
    </>
  );
};

export default CarsPage;

export async function loader() {
  const url = "http://localhost:4000/cars";
  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}
