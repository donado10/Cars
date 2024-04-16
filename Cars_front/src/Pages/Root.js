import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Outlet, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import Main from "../Layouts/Main";

const RootLayout = () => {
  const [isAuth, setIsAuth] = useState(false);

  const authState = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    setIsAuth(authState.isAuth);
  }, [authState.isAuth]);
  return (
    <>
      <Header isAuth={isAuth} />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default RootLayout;
