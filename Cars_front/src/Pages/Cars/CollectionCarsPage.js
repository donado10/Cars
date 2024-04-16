import React, { useEffect, useState } from "react";

import CarCard from "./Components/CarCard";
import classes from "./Styles/Cars.module.css";
import TitlePage from "../../Components/TitlePage";
import { useLoaderData, useParams } from "react-router-dom";

const CollectionCarsPage = () => {
  const classname = `${classes["card__list"]}`;
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    const url = `http://localhost:4000/cars/view/collection/${params.collection_name}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.cars);
        return;
      });
  }, []);

  return (
    <>
      <TitlePage title={params.collection_name} />
      <div className={classname}>
        {data.length > 0 &&
          data?.map((car) => {
            return <CarCard key={car.id} id={car.id} car_data={car} />;
          })}
      </div>
    </>
  );
};

export default CollectionCarsPage;
