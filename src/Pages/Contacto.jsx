import React from "react";
import Navbar from "../Components/Global/Navbar";
import Footer from "../Components/Global/Footer";
import ContactoForm from "../Components/Contacto/ContactoForm";
import FooterHome from "../Components/Home/FooterHome";

const Contacto = () => {
  return (
    <div>
      <Navbar activo={5} />
      <div className="pt-16">
        <ContactoForm />
        <FooterHome />
      </div>
    </div>
  );
};

export default Contacto;
