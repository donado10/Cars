import RootLayout from "../Pages/Root";
import HomePage from "../Pages/Home/HomePage";

import CollectionsPage from "../Pages/Collections/CollectionsPage";
import { loader as collectionsPageLoader } from "../Pages/Collections/CollectionsPage";
import EditCollectionPage from "../Pages/Collections/EditCollectionPage";

import CarsPage from "../Pages/Cars/CarsPage";
import { loader as CarsPageLoader } from "../Pages/Cars/CarsPage";
import EditCarPage from "../Pages/Cars/EditCarPage";

import AddPage from "../Pages/Add/AddPage";
import SignInPage from "../Pages/Authentication/SignIn/SignInPage";
import SignUpPage from "../Pages/Authentication/SignUp/SignUpPage";
import CollectionCarsPage from "../Pages/Cars/CollectionCarsPage";

import { Error403, Error404, Error500 } from "../Components/Error";

const route_default = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, path: "", element: <HomePage /> },
      {
        path: "collections",
        element: <CollectionsPage />,
        id: "collections-data",
        loader: collectionsPageLoader,
      },
      {
        path: "collections/edit/:collection_id",
        element: <EditCollectionPage />,
      },
      {
        path: "cars",
        element: <CarsPage />,
        id: "cars-data",
        loader: CarsPageLoader,
      },
      { path: "cars/edit/:car_id", element: <EditCarPage /> },
      { path: "cars/view/:collection_name", element: <CollectionCarsPage /> },
      { path: "add", element: <AddPage /> },
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "403", element: <Error403 /> },
      { path: "404", element: <Error404 /> },
      { path: "500", element: <Error500 /> },
    ],
  },
];

export default route_default;
