import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, {useEffect, useState, useCallback} from 'react';
import Slider from "react-slick";
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from "framer-motion";
import { useAboutMe } from "../../hooks/useAboutMe";

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
    speed: 2000,
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

const YearCard = ({ item, isSelected, onClick }) => {
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
            {item.icon && <span className={`${item.icon} text-2xl mb-2`}></span>}
            <div className="font-bold text-xl mb-1">
                {item.date ? new Date(item.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) :""}
            </div>
            <div className="text-xs text-center font-medium line-clamp-2">{item.title}</div>
        </motion.div>
    );
};

const Historia = () => {
    const { items, loading } = useAboutMe('goals');
    const [selectedItem, setSelectedItem] = useState(null);
    const [copiedLink, setCopiedLink] = useState(false);

    const activeItems = items.filter(item => item.isActive).sort((a, b) => a.orderIndex - b.orderIndex);

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const navigateAchievement = (direction) => {
        const currentIndex = activeItems.findIndex(item => item.id === selectedItem.id);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % activeItems.length;
        } else {
            newIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
        }

        setSelectedItem(activeItems[newIndex]);
    };

    const handlePrint = useCallback(() => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Logro ${selectedItem.title} - VistaEcuador</title>
                    <style>
                        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                        h1 { color: #005F6B; }
                        img { max-width: 100%; height: auto; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <h1>${selectedItem.title}</h1>
                    ${selectedItem.image ? `<img src="${selectedItem.image}" alt="${selectedItem.title}">` : ''}
                    <p>${selectedItem.description}</p>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }, [selectedItem]);

    const handleShareClick = useCallback(() => {
        const shareData = {
            title: `Logro ${selectedItem.title} - VistaEcuador`,
            text: selectedItem.description,
            url: window.location.href + `#logro-${selectedItem.id}`
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successfully shared'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(shareData.url)
                .then(() => {
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                });
        }
    }, [selectedItem]);

    const handleDownload = useCallback(() => {
        const downloadContent = `Logro ${selectedItem.title} - VistaEcuador

Título: ${selectedItem.title}

Descripción:
${selectedItem.description}

Fuente: VistaEcuador.com
Fecha de logro: ${selectedItem.date ? new Date(selectedItem.date).toLocaleDateString() : 'N/A'}`;

        const blob = new Blob([downloadContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `LogroVistaEcuador_${selectedItem.title.replace(/\s+/g, '_')}.txt`);
    }, [selectedItem]);

    const renderModalContent = (item) => {
        if (item.url && (item.url.includes('youtube.com') || item.url.includes('youtu.be'))) {
            return (
                <div className="w-full h-full">
                    <iframe
                        width="100%"
                        height="100%"
                        src={item.url}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        }

        if (item.image) {
            return (
                <div className="w-full h-full">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            );
        }

        return null;
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!selectedItem) return;

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
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem]);

    if (loading) {
        return <div className="text-center py-8">Cargando historia...</div>;
    }

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
                        {activeItems.map((item) => (
                            <YearCard
                                key={item.id}
                                item={item}
                                isSelected={selectedItem?.id === item.id}
                                onClick={() => openModal(item)}
                            />
                        ))}
                    </Slider>
                </div>

                <div className="absolute -bottom-3 left-0 w-full flex justify-center">
                    <div className="h-1 bg-gradient-to-r from-transparent via-[#005F6B] to-transparent w-3/4"></div>
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
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
                                <span className="icon-[material-symbols--arrow-back-ios-new] text-2xl text-[#005F6B] h-6 w-6"></span>
                            </button>
                            <button
                                onClick={() => navigateAchievement('next')}
                                className="absolute top-1/2 right-20 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/75 rounded-full p-1 transition-all h-8 w-8"
                            >
                                <span className="icon-[material-symbols--arrow-forward-ios] text-2xl text-[#005F6B] h-6 w-6"></span>
                            </button>

                            <div className="h-96 md:h-auto">
                                {renderModalContent(selectedItem)}
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
                                    {selectedItem.icon && (
                                        <span className={`${selectedItem.icon} text-3xl text-[#96C121] mr-3`}></span>
                                    )}
                                    <h2 className="text-3xl font-bold text-[#96C121]">
                                        {selectedItem.date ? new Date(selectedItem.date).toLocaleDateString() : ""}
                                    </h2>
                                </div>

                                <h3 className="text-xl font-medium mb-4 text-gray-800">
                                    {selectedItem.title}
                                </h3>

                                <p className="text-gray-700 leading-relaxed">
                                    {selectedItem.description}
                                </p>

                                {selectedItem.location && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        📍 {selectedItem.location}
                                    </p>
                                )}

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