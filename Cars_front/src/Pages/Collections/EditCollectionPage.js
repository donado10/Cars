import React, { useEffect, useState } from "react";
import classes from "./Styles/EditCollection.module.css";
import TitlePage from "../../Components/TitlePage";
import CollectionCard from "./Components/CollectionCard";
import CollectionsForm from "../../Components/CollectionsForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Error500, Error404 } from "../../Components/Error";

const EditCollectionPage = () => {
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [isAuth, setIsAuth] = useState(false);
  const authState = useSelector((state) => {
    return state.auth;
  });

  const classname = `${classes["cards"]} ${classes["card__list"]}`;
  const params = useParams();

  useEffect(() => {
    setIsAuth(authState.isAuth);
    const url = `http://localhost:4000/collections/view/${params.collection_id}`;
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
      {+data?.status === 500 && <Error500 />}
      {!isAuth && <Error404 />}
      {isAuth && (
        <>
          <TitlePage title="Edit Collection" />
          {isloading || (
            <div className={classname}>
              {data && (
                <CollectionsForm collection={data.Collection} method="PUT" />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditCollectionPage;
