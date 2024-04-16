import React, { useEffect, useState } from "react";
import TitlePage from "../../Components/TitlePage";
import CarsForm from "../../Components/CarsForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditCarPage = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isAuth, setIsAuth] = useState(false);
  const authState = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    setIsAuth(authState.isAuth);

    const car_id = params.car_id;

    const url = `http://localhost:4000/cars/view/${car_id}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [authState.isAuth]);
  return (
    <>
      {!isAuth && <h1>404 not found</h1>}
      {isAuth && (
        <>
          <TitlePage title="Edit Car" />
          {isLoading || <CarsForm car={data.car} method="PUT" />}
        </>
      )}
    </>
  );
};

export default EditCarPage;
