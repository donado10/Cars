import { useEffect, useState } from "react";
import TitlePage from "../../Components/TitlePage";
import AddToggle from "./Components/AddToggle";
import CollectionsForm from "../../Components/CollectionsForm";
import CarsForm from "../../Components/CarsForm";
import { useSelector } from "react-redux";

const AddPage = () => {
  const [activeCollectionsForm, setActiveCollectionsForm] = useState(false);
  const [activeCarsForm, setActiveCarsForm] = useState(false);

  const authState = useSelector((state) => {
    return state.auth;
  });
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (authState.isAuth) {
      return setIsAuth(authState.isAuth);
    }

    return setIsAuth(authState.isAuth);
  }, [authState.isAuth]);

  const formChoiceHandler = (collections, cars) => {
    if (collections) {
      setActiveCollectionsForm(true);
      setActiveCarsForm(false);
    } else {
      setActiveCollectionsForm(false);
    }

    if (cars) {
      setActiveCarsForm(true);
      setActiveCollectionsForm(false);
    } else {
      setActiveCarsForm(false);
    }
  };
  return (
    <>
      {!isAuth && <h1>404 not found</h1>}
      {isAuth && (
        <>
          <TitlePage title="Add Items" />
          <AddToggle onFormToggle={formChoiceHandler} />
          {activeCollectionsForm && <CollectionsForm method="POST" />}
          {activeCarsForm && <CarsForm method="POST" />}
        </>
      )}
    </>
  );
};

export default AddPage;
