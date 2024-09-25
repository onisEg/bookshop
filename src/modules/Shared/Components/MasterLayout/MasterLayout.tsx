import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function MasterLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}
