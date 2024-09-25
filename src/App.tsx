import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFouned from "./modules/HomeModule/Components/NotFouned/NotFouned";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./modules/Shared/Components/AuthLayout/AuthLayout";
import Login from "./modules/AuthModule/Components/Login/Login";
import Register from "./modules/AuthModule/Components/Register.tsx/Register";
import ChangePass from "./modules/AuthModule/Components/ChangePass/ChangePass";
import Forgetpass from "./modules/AuthModule/Components/Forgetpass/Forgetpass";
import Resetpass from "./modules/AuthModule/Components/Resetpass/Resetpass";
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout";
import Home from "./modules/HomeModule/Components/Home/Home";
import CartDetails from "./modules/CartModule/Components/Cart/CartDetails";

import "react-toastify/dist/ReactToastify.css";
import About from "./modules/HomeModule/Components/About/About";
import ContactUs from "./modules/HomeModule/Components/ContactUs/ContactUs";
import Blog from "./modules/HomeModule/Components/Blog/Blog";
import ProtectedRoute from "./modules/Shared/Components/ProtectedRoute/ProtectedRoute";
import BookDetails from "./modules/HomeModule/Components/BookDetails/BookDetails";
import ProductPage from "./modules/ListingPageModel/Components/ProductPage/ProductPage";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Confirmation from "./modules/CartModule/Components/Confirmation/Confirmation";

const stripe = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

function App() {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFouned />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <Forgetpass /> },
        { path: "resetpssword", element: <Resetpass /> },
        { path: "changePass", element: <ChangePass /> },
      ],
    },
    {
      path: "/dashbord",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFouned />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "cart", element: <CartDetails /> },
        { path: "books", element: <ProductPage /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <ContactUs /> },
        { path: "blog", element: <Blog /> },
        { path: "book/:bookId", element: <BookDetails /> },
        { path: "confirmation", element: <Confirmation /> },
      ],
    },
  ]);
  return (
    <>
      <div>
        <ToastContainer />
        <Elements stripe={stripe}>
          <RouterProvider router={routing}></RouterProvider>
        </Elements>
      </div>
    </>
  );
}

export default App;
