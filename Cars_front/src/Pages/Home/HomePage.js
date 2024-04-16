import TitlePage from "../../Components/TitlePage";
import classes from "./Styles/Home.module.css";
import { useSelector } from "react-redux";

const HomePage = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });

  return (
    <>
      <TitlePage
        title="Welcome to the cars collections"
        centered={classes.centered}
      />
    </>
  );
};

export default HomePage;
