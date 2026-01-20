import React, { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = ({ activo }) => {
  const [subVE, setSubVE] = useState(false);
  const [subSobremi, setSubSobreMi] = useState(false);
  const [subSocial, setSubSocial] = useState(false);
  const [subProyectos, setSubProyectos] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const rutas = [
    "/",
    "/sobre-mi",
    "/redes-sociales",
    "/proyectos",
    "/ve",
    "/contacto",
  ];
  const navigation = useNavigate();

  const hanldeClick = (id) => {
    if (activo != id) {
      navigation(rutas[id]);
    }
    setMobileMenuOpen(false);
  };

  const handleC = () => {
    navigation("/");
    setMobileMenuOpen(false);
  };

  const handleSectionClick = (route, section) => {
    navigation(`${route}`, { state: { scrollTo: section } });
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex bg-[#92B509] h-16 items-center shadow-md">
      <div className="flex flex-row justify-between mx-auto max-w-6xl py-2 px-4 sm:px-6 lg:px-8 w-full items-center">
        <img
          src="./images/logo_horizontal.webp"
          onClick={handleC}
          className="cursor-pointer h-10 md:h-auto"
          alt="Logo"
        />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 lg:gap-10 justify-end font-bold text-base lg:text-lg">
          <div
            className={`${activo == 0 ? "text-white" : ""} border border-transparent rounded-full px-3 cursor-pointer`}
            onClick={() => hanldeClick(0)}
          >
            Inicio
          </div>

          <div
            onMouseEnter={() => setSubSobreMi(true)}
            onMouseLeave={() => setSubSobreMi(false)}
            className={`${activo == 1 ? "text-white" : ""} border border-transparent rounded-full px-3 cursor-pointer relative`}
            onClick={() => hanldeClick(1)}
          >
            Sobre Mí
            {subSobremi && (
              <div className="absolute -left-9 pt-2">
                <div className="bg-[#6e8b00] text-gray-500 font-light text-xs flex flex-col gap-1 px-2 py-2 rounded-xl">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick("/sobre-mi", "introduccion");
                    }}
                    className="bg-white flex gap-1 items-center w-32 py-1 rounded-full px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="icon-[fluent--document-person-16-regular]"></span>
                    <label className="cursor-pointer">Biografía</label>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick("/sobre-mi", "logros");
                    }}
                    className="bg-white flex gap-1 items-center w-32 py-1 rounded-full px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="icon-[solar--cup-star-linear]"></span>
                    <label className="cursor-pointer">Logros</label>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick("/sobre-mi", "galeria");
                    }}
                    className="bg-white flex gap-1 items-center w-32 py-1 rounded-full px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="icon-[solar--gallery-round-line-duotone]"></span>
                    <label className="cursor-pointer">Galeria</label>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick("/sobre-mi", "blog");
                    }}
                    className="bg-white flex gap-1 items-center w-32 py-1 rounded-full px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="icon-[carbon--blog]"></span>
                    <label className="cursor-pointer">Blog</label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            onMouseEnter={() => setSubSocial(true)}
            onMouseLeave={() => setSubSocial(false)}
            className={`${activo == 2 ? "text-white" : ""} border border-transparent rounded-full px-3 cursor-pointer relative`}
            onClick={() => hanldeClick(2)}
          >
            Redes Sociales
            {subSocial && (
              <div className="absolute -left-1.5 pt-2">
                <div className="bg-[#6e8b00] text-gray-500 font-light text-xs flex flex-col gap-1 px-2 py-2 rounded-xl">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick("/redes-sociales", "contenido");
                    }}
                    className="bg-white flex gap-1 items-center w-32 py-1 rounded-full px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="icon-[material-symbols--search-insights-rounded]"></span>
                    <label className="cursor-pointer">Explora</label>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick("/redes-sociales", "metricas");
                    }}
                    className="bg-white flex gap-1 items-center w-32 py-1 rounded-full px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="icon-[nimbus--stats]"></span>
                    <label className="cursor-pointer">Metricas</label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            onMouseEnter={() => setSubProyectos(true)}
            onMouseLeave={() => setSubProyectos(false)}
            className={`${activo == 3 ? "text-white" : ""} border border-transparent rounded-full px-3 cursor-pointer relative`}
            onClick={() => hanldeClick(3)}
          >
            Proyectos
            {subProyectos && (
              <div className="absolute -left-1.5 pt-2">
                <div className="bg-[#6e8b00] text-gray-500 font-light text-xs flex flex-col gap-1 px-2 py-2 rounded-xl">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick("/proyectos", "Social");
                    }}
                    className="bg-white flex gap-1 items-center w-32 py-1 rounded-full px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="icon-[material-symbols--search-insights-rounded]"></span>
                    <label className="cursor-pointer">Impacto Social</label>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick("/proyectos", "Influencers");
                    }}
                    className="bg-white flex gap-1 items-center w-32 py-1 rounded-full px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="icon-[nimbus--stats]"></span>
                    <label className="cursor-pointer">Influencers</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`${activo == 4 ? "text-white" : ""} border border-transparent rounded-full px-3 cursor-pointer`}
            onClick={() => hanldeClick(4)}
          >
            VisitaEcuador
          </div>
          <div
            className={`${activo == 5 ? "text-white" : ""} border border-transparent rounded-full px-3 cursor-pointer`}
            onClick={() => hanldeClick(5)}
          >
            Contacto
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#92B509] shadow-lg">
          <div className="flex flex-col px-4 py-2 space-y-2 font-bold">
            <div
              className={`${activo == 0 ? "text-white" : ""} py-2 px-3 cursor-pointer`}
              onClick={() => hanldeClick(0)}
            >
              Inicio
            </div>

            <div className={`${activo == 1 ? "text-white" : ""} py-2 px-3`}>
              <div className="cursor-pointer" onClick={() => hanldeClick(1)}>
                Sobre Mí
              </div>
              <div className="pl-4 mt-1 space-y-1 text-sm">
                <div
                  onClick={() =>
                    handleSectionClick("/sobre-mi", "introduccion")
                  }
                  className="py-1 cursor-pointer"
                >
                  Biografía
                </div>
                <div
                  onClick={() => handleSectionClick("/sobre-mi", "logros")}
                  className="py-1 cursor-pointer"
                >
                  Logros
                </div>
                <div
                  onClick={() => handleSectionClick("/sobre-mi", "galeria")}
                  className="py-1 cursor-pointer"
                >
                  Galeria
                </div>
                <div
                  onClick={() => handleSectionClick("/sobre-mi", "blog")}
                  className="py-1 cursor-pointer"
                >
                  Blog
                </div>
              </div>
            </div>

            <div className={`${activo == 2 ? "text-white" : ""} py-2 px-3`}>
              <div className="cursor-pointer" onClick={() => hanldeClick(2)}>
                Redes Sociales
              </div>
              <div className="pl-4 mt-1 space-y-1 text-sm">
                <div
                  onClick={() =>
                    handleSectionClick("/redes-sociales", "contenido")
                  }
                  className="py-1 cursor-pointer"
                >
                  Explora
                </div>
                <div
                  onClick={() =>
                    handleSectionClick("/redes-sociales", "metricas")
                  }
                  className="py-1 cursor-pointer"
                >
                  Metricas
                </div>
              </div>
            </div>

            <div className={`${activo == 3 ? "text-white" : ""} py-2 px-3`}>
              <div className="cursor-pointer" onClick={() => hanldeClick(3)}>
                Proyectos
              </div>
              <div className="pl-4 mt-1 space-y-1 text-sm">
                <div
                  onClick={() => handleSectionClick("/proyectos", "Social")}
                  className="py-1 cursor-pointer"
                >
                  Impacto Social
                </div>
                <div
                  onClick={() =>
                    handleSectionClick("/proyectos", "Influencers")
                  }
                  className="py-1 cursor-pointer"
                >
                  Influencers
                </div>
              </div>
            </div>

            <div
              className={`${activo == 4 ? "text-white" : ""} border border-transparent rounded-full px-3 cursor-pointer`}
              onClick={() => hanldeClick(4)}
            >
              VisitaEcuador
            </div>
            <div
              className={`${activo == 5 ? "text-white" : ""} py-2 px-3 cursor-pointer`}
              onClick={() => hanldeClick(5)}
            >
              Contacto
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
