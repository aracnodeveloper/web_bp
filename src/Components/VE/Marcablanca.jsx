import React from "react";
import Navbar from "../Global/Navbar";
import Footer from "../Global/Footer";
import FooterHome from "../Home/FooterHome";

const Ve = () => {
  return (
    <div className="overflow-y-hidden">
      <Navbar activo={4} />

      <iframe
        src="https://visitaecuador.com/marcablanca/PSPL1"
        width="100%"
        height="1500px"
        className="mt-8 "
      ></iframe>
      <FooterHome />
    </div>
  );
};
export default Ve;
