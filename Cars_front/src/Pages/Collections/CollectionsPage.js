import React, { useState } from "react";
import classes from "./Styles/Collections.module.css";
import TitlePage from "../../Components/TitlePage";
import CollectionCard from "./Components/CollectionCard";
import ToggleEdit from "./Components/ToggleEdit";
import { Error500 } from "../../Components/Error";

import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CollectionsPage = () => {
  const data = useLoaderData("collections-data");
  const collections = data.Collections;
  const classname = `${classes["cards"]} ${classes["card__list"]}`;
  const [toggleState, setToggleState] = useState("all");
  const authState = useSelector((state) => state.auth);

  const stateToggleHandler = (state) => {
    setToggleState(state);
  };

  const allCollectionHandler = () => {
    return (
      <div className={classname}>
        {collections.map((collection) => {
          return (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              collection={collection}
              toggleState={toggleState}
            />
          );
        })}
      </div>
    );
  };
  const editCollectionHandler = () => {
    const collectionsFiltered = collections.filter((collection) => {
      return collection.userId === authState.userId;
    });
    return (
      <div className={classname}>
        {collectionsFiltered.map((collection) => {
          return (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              collection={collection}
              toggleState={toggleState}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      {+data.status === 500 && <Error500 />}
      {+data.status === 200 && (
        <>
          <TitlePage title="Collections" />
          {!authState.isAuth && (
            <div className={classname}>
              {collections.map((collection) => {
                return (
                  <CollectionCard
                    key={collection.id}
                    id={collection.id}
                    collection={collection}
                    toggleState={toggleState}
                  />
                );
              })}
            </div>
          )}
          {authState.isAuth && toggleState === "all" && allCollectionHandler()}
          {authState.isAuth &&
            toggleState === "edit" &&
            editCollectionHandler()}
          {authState.isAuth && <ToggleEdit onState={stateToggleHandler} />}
        </>
      )}
    </>
  );
};

export default CollectionsPage;

export async function loader() {
  const url = "http://localhost:4000/collections";
  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}
