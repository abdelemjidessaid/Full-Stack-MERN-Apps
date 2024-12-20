import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { dialogDisplay } = useAppContext();

  return (
    <div
      className={`flex flex-col items-center w-full min-h-screen ${
        dialogDisplay ? "fixed" : "relative"
      }`}
    >
      <Navbar />
      <ToastContainer theme="dark" position="top-left" />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
