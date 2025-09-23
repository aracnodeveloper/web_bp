import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useEffect, useState, useCallback} from 'react';
import Slider from "react-slick";
import { saveAs } from 'file-saver';
import Logo from "../../imagenes/logo_verde.png";
import { motion, AnimatePresence } from "framer-motion";
import imgP1 from "../../imagenes/the_bizz_2012.webp"
import imgP2 from "../../imagenes/galardon.webp"
import imgP3 from "../../imagenes/turismo_ecuador_2008.webp"
import imgP4 from "../../imagenes/diariolideres.webp"
import imgP5 from "../../imagenes/sabe2008.webp"
import imgP6 from "../../imagenes/sabe2009.webp"
import imgP7 from "../../imagenes/afiliado.webp"
import imgP8 from "../../imagenes/fuckup.webp"

const CustomNextArrow = (props) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white h-8 w-8 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            onClick={props.onClick}>
            <span className="icon-[material-symbols--arrow-forward-ios] h-4 w-4"></span>
        </div>
    );
};

const CustomPrevArrow = (props) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 left-3 z-10 cursor-pointer rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white h-8 w-8 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            onClick={props.onClick}>
            <span className="icon-[material-symbols--arrow-back-ios-new] h-4 w-4"></span>
        </div>
    );
};

const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                dots: true,
            },
        },
        {
            breakpoint: 1150,
            settings: {
                slidesToShow: 3,
                dots: true,
            },
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 4,
                dots: true,
            },
        },
    ]
};

const achievementsData = {
    "May 1994": {
        image: imgP7,
        description: "En mayo de 1994, El Ing. Bernardo Polo una vez más demuestra su presencia en el país al recibir un reconocimiento por lograr fomentar el turismo en nuestro país, este reconocimiento dado por el alcalde de Chordeleg el Dr. Flavio Barros Reinoso.",
        lab: "Certificado de la Camara del Comercio.",
        icon: "icon-[material-symbols--badge]"
    },
    "Dic 2004": {
        type: "icon",
        image: Logo,
        description: "En diciembre de 2004, durante la gestión de la ministra María Isabel Salvador, Ecuaventura.com cambia su nombre a VistaEcuador.com, reflejando un enfoque más amplio para promover el país a nivel internacional. Este cambio no solo representó un cambio de nombre, sino una transformación en la manera en que Ecuador se proyectaba al mundo.",
        lab: "Una historia más sobre nuestra marca impactando al mundo.",
        icon: "icon-[material-symbols--branding-watermark]"
    },
    "Dic 2006": {
        type: "video",
        videoId: "P2t4zP4ugPo",
        description: "En diciembre del 2006 bajo el nombre de Ecuaventura.com, la ministra Rocío Vásquez lo oficializó como el Portal Oficial de Turismo del Ecuador (2000-2004), estableciendo un precedente en la digitalización del sector turístico en el país.",
        lab: "Nombramiento como el Portal Oficial de Turismo del Ecuador.",
        icon: "icon-[material-symbols--travel-explore-rounded]"
    },
    "Mar 2007": {
        image: "https://www.visitaecuador.com/ve/img/contenido/informacion/hall/ministerio-turismo_02.jpg",
        description: "En marzo de 2007, El Portal Visita Ecuador recibe un reconocimiento por fomentar el turismo en Ecuador. Este reconocimiento dado al Ing. Bernardo Polo consolidó su trayectoria como pionero turístico, habiendo contribuido significativamente al desarrollo del turismo en Ecuador.",
        lab: "Reconoce al Pionero en Turismo de nuestro Ecuador.",
        icon: "icon-[material-symbols--award-star-rounded]"
    },
    "Jun 2008": {
        image: imgP3,
        description: "En junio de 2008, El Ing. Bernardo Polo una vez más demuestra su presencia en el país al recibir un reconocimiento por lograr fomentar el turismo en nuestro país, este reconocimiento dado por el alcalde de Chordeleg el Dr. Flavio Barros Reinoso.",
        lab: "Exporsitor de VI feria.",
        icon: "icon-[material-symbols--strategy]"
    },
    "Oct 2008": {
        image: imgP5,
        description: "En noviembre de 2008, El Ing. Bernardo Polo una vez más demuestra su presencia en el país al recibir un reconocimiento por lograr fomentar el turismo en nuestro país, este reconocimiento dado por el alcalde de Chordeleg el Dr. Flavio Barros Reinoso.",
        lab: "Reconocimiento de Sabe.",
        icon: "icon-[material-symbols--emoji-food-beverage]"
    },
    "Oct 2009": {
        image: imgP6,
        description: "En noviembre de 2009, El Ing. Bernardo Polo una vez más demuestra su presencia en el país al recibir un reconocimiento por lograr fomentar el turismo en nuestro país, este reconocimiento dado por el alcalde de Chordeleg el Dr. Flavio Barros Reinoso.",
        lab: "Reconocimiento de Sabe.",
        icon: "icon-[material-symbols--emoji-food-beverage]"
    },
    "Abr 2009": {
        image: "https://www.visitaecuador.com/ve/img/contenido/informacion/hall/municipio-chordeleg-org.jpg",
        description: "En febrero de 2009, El Ing. Bernardo Polo una vez más demuestra su presencia en el país al recibir un reconocimiento por una vez más lograr fomentar el turismo en nuestro país, este reconocimiento dado por el alcalde de Chordeleg el Dr. Flavio Barros Reinoso.",
        lab: "Reconocimiento de la alcaldía de Chordeleg.",
        icon: "icon-[material-symbols--location-city]"
    },
    "Jul 2012": {
        image: imgP1,
        description: "En julio de 2012, El Ing. Bernardo Polo recibe prestigioso reconocimiento internacional 'The Bizz Awards' como líder empresarial por su contribución al sector turístico y su visión innovadora que ha posicionado a VistaEcuador.com como referente en la promoción digital del turismo ecuatoriano.",
        lab: "World Business Leader.",
        icon: "icon-[material-symbols--language]"
    },
    "May 2017": {
        type: "video1",
        videoId: "QaL6cG4LCNU",
        description: "En mayo de 2017, En su búsqueda constante de innovación, VistaEcuador.com desarrolló la primera APP de reservas hoteleras en Ecuador, permitiendo a los usuarios acceder a descuentos y realizar reservas directas desde sus dispositivos móviles. Esta tecnología fue tan exitosa que sirvió de inspiración para Disney Concierge, una aplicación utilizada en los parques de Disney para gestionar la experiencia de los visitantes.",
        lab: "Conoce mi app, y disfruta de viajar con VistaEcuador.",
        icon: "icon-[material-symbols--smartphone]"
    },
    "Sept 2017": {
        image: imgP2,
        description: "En septiembre de 2017, VistaEcuador.com recibe el galardón de EcuaEmpresas por su destacada labor en la promoción digital del turismo ecuatoriano y su constante innovación tecnológica que ha permitido conectar a miles de turistas con los destinos más emblemáticos del país.",
        lab: "Galardón de EcuaEmpresas.",
        icon: "icon-[material-symbols--handshake]"
    },
    "Abr 2018": {
        image: "https://www.visitaecuador.com/ve/img/contenido/informacion/hall/mmecuador-org.jpg",
        description: "En abril de 2018, Vista Ecuador fue reconocida como una empresa triple A por Mucho Mejor Ecuador quien hoy es la garantía y el respaldo de las empresas Ecuatorianas, así demostrando una vez más la calidad que tiene VistaEcuador.",
        lab: "Reconocimiento como empresa Triple A.",
        icon: "icon-[material-symbols--verified]"
    },
    "Sep 2022": {
        image: imgP4,
        description: "En septiembre de 2022, Diario Líderes destaca a VistaEcuador.com como caso de éxito empresarial en el sector turístico digital, resaltando su trayectoria de más de dos décadas y su capacidad de adaptación a las nuevas tecnologías para seguir promoviendo los destinos ecuatorianos.",
        lab: "Reconocimiento en Diario Líderes.",
        icon: "icon-[material-symbols--newspaper]"
    },
    "Jun 2023": {
        image: imgP8,
        description: "En junio de 2023, El Ing. Bernardo Polo participa como ponente destacado en el evento Fuckup Nights, compartiendo valiosas lecciones aprendidas durante su trayectoria empresarial y cómo los desafíos enfrentados se convirtieron en oportunidades de crecimiento para VistaEcuador.com.",
        lab: "Participación en Fuckup Nights.",
        icon: "icon-[material-symbols--event-note]"
    }
};

const YearCard = ({ yearMonth, data, isSelected, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`flex flex-col p-4 m-2 items-center justify-center rounded-lg cursor-pointer shadow-md transition-all duration-300 h-32 ${
                isSelected
                    ? 'bg-[#96C121] text-white'
                    : 'bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 text-gray-800'
            }`}
        >
            <span className={`${data.icon} text-2xl mb-2`}></span>
            <div className="font-bold text-xl mb-1">{yearMonth}</div>
            <div className="text-xs text-center font-medium line-clamp-2">{data.lab}</div>
        </motion.div>
    );
};

const Historia = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [timelineYears] = useState(Object.keys(achievementsData));


    const openModal = (year) => {
        setSelectedYear(year);
    };

    const closeModal = () => {
        setSelectedYear(null);
    };

    const navigateAchievement = useCallback((direction) => {
        const currentIndex = timelineYears.indexOf(selectedYear);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % timelineYears.length;
        } else {
            newIndex = (currentIndex - 1 + timelineYears.length) % timelineYears.length;
        }

        setSelectedYear(timelineYears[newIndex]);
    }, [selectedYear, timelineYears]);

    const handlePrint = useCallback(() => {
        const achievement = achievementsData[selectedYear];
        const printWindow = window.open('', '_blank');

        printWindow.document.write(`
            <html>
                <head>
                    <title>Logro ${selectedYear} - VistaEcuador</title>
                    <style>
                        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                        h1 { color: #005F6B; }
                        img { max-width: 100%; height: auto; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <h1>${selectedYear} - ${achievement.lab}</h1>
                    ${achievement.image ? `<img src="${typeof achievement.image === 'string' ? achievement.image : achievement.image.src}" alt="Logro ${selectedYear}">` : ''}
                    <p>${achievement.description}</p>
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.print();
    }, [selectedYear]);

    const handleShareClick = useCallback(() => {
        const shareData = {
            title: `Logro ${selectedYear} - VistaEcuador`,
            text: achievementsData[selectedYear].description,
            url: window.location.href + `#logro-${selectedYear.replace(/\s+/g, '-')}`
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successfully shared'))
                .catch((error) => console.log('Error sharing', error));
        } 
    }, [selectedYear]);

    const handleDownload = useCallback(() => {
        const achievement = achievementsData[selectedYear];

        const downloadContent = `Logro ${selectedYear} - VistaEcuador

        Título: ${achievement.lab}

        Descripción:
            ${achievement.description}

        Fuente: VistaEcuador.com
            Fecha de logro: ${selectedYear}`;

        const blob = new Blob([downloadContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `LogroVistaEcuador_${selectedYear.replace(/\s+/g, '_')}.txt`);
    }, [selectedYear]);

    const renderModalContent = (year) => {
        const achievement = achievementsData[year];
        if (achievement.type === "video" || achievement.type === "video1") {
            return (
                <div className="w-full h-full">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${achievement.videoId}?autoplay=1`}
                        title={`Logro ${year}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        }
        if (achievement.type === "icon") {
            return (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <img
                        src={achievement.image}
                        alt={`Logro ${year}`}
                        className="max-w-full max-h-full object-contain p-6"
                    />
                </div>
            );
        }

        return (
            <div className="w-full h-full">
                <img
                    src={achievement.image}
                    alt={`Logro ${year}`}
                    className="w-full h-full object-cover"
                />
            </div>
        );
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!selectedYear) return;

            switch (event.key) {
                case 'ArrowRight':
                    navigateAchievement('next');
                    break;
                case 'ArrowLeft':
                    navigateAchievement('prev');
                    break;
                case 'Escape':
                    closeModal();
                    break;
                default:
                    // No action needed for other keys
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedYear, navigateAchievement]);

    return (
        <div id="logros" className="flex flex-col gap-4 relative bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm">
            <div className="text-center mb-4">
                <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]'>Trayectoria y Excelencia</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Sumérgete en la historia de Bernardo Polo, desde sus comienzos hasta los hitos más significativos
                    de su carrera. Esta cronología destaca su compromiso con la innovación y excelencia en el turismo
                    ecuatoriano.
                </p>
            </div>

            <div className="relative">
                <div className="overflow-hidden rounded-xl">
                    <Slider {...settings}>
                        {Object.keys(achievementsData).map((yearMonth) => (
                            <YearCard
                                key={yearMonth}
                                yearMonth={yearMonth}
                                data={achievementsData[yearMonth]}
                                isSelected={selectedYear === yearMonth}
                                onClick={() => openModal(yearMonth)}
                            />
                        ))}
                    </Slider>
                </div>

                <div className="absolute -bottom-3 left-0 w-full flex justify-center">
                    <div className="h-1 bg-gradient-to-r from-transparent via-[#005F6B] to-transparent w-3/4"></div>
                </div>
            </div>

            <AnimatePresence>
                {selectedYear && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            transition={{type: "spring", stiffness: 300, damping: 30}}
                            className="bg-white max-w-5xl w-full grid md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => navigateAchievement('prev')}
                                className="absolute top-1/2 left-16 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/75 rounded-full p-1 transition-all h-8 w-8"
                            >
                                <span
                                    className="icon-[material-symbols--arrow-back-ios-new] text-2xl text-[#005F6B] h-6 w-6"></span>
                            </button>
                            <button
                                onClick={() => navigateAchievement('next')}
                                className="absolute top-1/2 right-20 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/75 rounded-full p-1 transition-all h-8 w-8"
                            >
                                <span
                                    className="icon-[material-symbols--arrow-forward-ios] text-2xl text-[#005F6B] h-6 w-6"></span>
                            </button>

                            <div className="h-96 md:h-auto">
                                {renderModalContent(selectedYear)}
                            </div>
                            <div className="p-8 flex flex-col justify-center relative">
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-800 transition-colors"
                                        title="Cerrar"
                                    >
                                        <span className="icon-[material-symbols--close] text-2xl"></span>
                                    </button>
                                </div>

                                <div className="flex items-center mb-4">
                                    <span className={`${achievementsData[selectedYear].icon} text-3xl text-[#96C121] mr-3`}></span>
                                    <h2 className="text-3xl font-bold text-[#96C121]">{selectedYear}</h2>
                                </div>

                                <h3 className="text-xl font-medium mb-4 text-gray-800">
                                    {achievementsData[selectedYear].lab}
                                </h3>

                                <p className="text-gray-700 leading-relaxed">
                                    {achievementsData[selectedYear].description}
                                </p>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center text-sm text-[#005F6B]">
                                        <span className="icon-[material-symbols--history] mr-2"></span>
                                        <span>Parte de nuestra historia</span>
                                    </div>
                                    <div className="mt-5 flex gap-4">
                                        <button
                                            onClick={handlePrint}
                                            className="text-[#96C121] hover:text-[#005F6B] transition-colors"
                                            title="Imprimir"
                                        >
                                            <span className="icon-[material-symbols--print] text-2xl"></span>
                                        </button>


                                        <button
                                            onClick={handleShareClick}
                                            className="text-[#96C121] hover:text-[#96C121] transition-colors"
                                            title="Compartir"
                                        >
                                            <span className="icon-[material-symbols--share] text-2xl"></span>
                                        </button>


                                        <button
                                            onClick={handleDownload}
                                            className="text-[#96C121] hover:text-[#005F6B] transition-colors relative"
                                            title="Descargar"
                                        >
                                            <span className="icon-[material-symbols--download] text-2xl"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Historia;
