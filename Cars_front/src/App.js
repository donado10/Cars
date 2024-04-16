import { RouterProvider, createBrowserRouter } from "react-router-dom";

import route_default from "./Routes/Default";

import "./Styles/App.css";

const router = createBrowserRouter([...route_default]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
