import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";
import { useAboutMe } from "../../hooks/useAboutMe";

const ReconocimientoModal = ({ isOpen, onClose, reconocimiento, reconocimientosData, onNavigate }) => {
    const modalContentRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (reconocimiento) {
            const index = reconocimientosData.findIndex(r => r.id === reconocimiento.id);
            setCurrentIndex(index);
        }
    }, [reconocimiento, reconocimientosData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && modalContentRef.current && !modalContentRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !reconocimiento) return null;

    const handleNavigation = (direction) => {
        const newIndex = direction === 'next'
            ? (currentIndex + 1) % reconocimientosData.length
            : (currentIndex - 1 + reconocimientosData.length) % reconocimientosData.length;

        onNavigate(reconocimientosData[newIndex]);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: reconocimiento.title,
                text: reconocimiento.description,
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(`${reconocimiento.title}\n\n${reconocimiento.description}\n\n${window.location.href}`)
                .then(() => alert('Copiado al portapapeles'))
                .catch(err => console.error('Error sharing:', err));
        }
    };

    const handlePrint = () => {
        const printContent = `
            <html>
                <head>
                    <title>${reconocimiento.title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; }
                        h1 { color: #005F6B; }
                        img { max-width: 100%; height: auto; }
                    </style>
                </head>
                <body>
                    <h1>${reconocimiento.title}</h1>
                    ${reconocimiento.date ? `<p><strong>Fecha:</strong> ${new Date(reconocimiento.date).toLocaleDateString()}</p>` : ''}
                    ${reconocimiento.location ? `<p><strong>Lugar:</strong> ${reconocimiento.location}</p>` : ''}
                    <h2>Historia</h2>
                    <p>${reconocimiento.description}</p>
                    ${reconocimiento.image ? `<img src="${reconocimiento.image}" alt="${reconocimiento.title}">` : ''}
                </body>
            </html>
        `;

        const printWindow = window.open('', '', 'width=600,height=600');
        printWindow.document.open();
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div ref={modalContentRef} className="bg-white rounded-lg w-[700px] h-[800px] overflow-y-auto">
                {/* Botones de navegación */}
                <div className="absolute top-1/2 left-4 z-50 transform -translate-y-1/2">
                    <button
                        onClick={() => handleNavigation('prev')}
                        className="bg-white/50 hover:bg-white/75 text-white p-1 rounded-full shadow-lg hover:opacity-80 transition-opacity h-8 w-8"
                    >
                        <span className="icon-[material-symbols--arrow-back-ios-new] text-[#005F6B] h-6 w-6"></span>
                    </button>
                </div>
                <div className="absolute top-1/2 right-4 z-50 transform -translate-y-1/2">
                    <button
                        onClick={() => handleNavigation('next')}
                        className="bg-white/50 hover:bg-white/75 text-white p-1 rounded-full shadow-lg hover:opacity-80 transition-opacity h-8 w-8"
                    >
                        <span className="icon-[material-symbols--arrow-forward-ios] text-[#005F6B] h-6 w-6"></span>
                    </button>
                </div>

                {/* Header con título y botones */}
                <div className="flex justify-between items-center p-4 border-b  ">
                    <h3 className="text-xl font-semibold text-gray-800">{reconocimiento.title}</h3>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleShare}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            title="Compartir"
                        >
                            <span className="icon-[material-symbols--share] h-6 w-6"></span>
                        </button>

                        <button
                            onClick={handlePrint}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            title="Imprimir"
                        >
                            <span className="icon-[material-symbols--print] h-6 w-6"></span>
                        </button>

                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            title="Cerrar"
                        >
                            <span className="icon-[material-symbols--close] h-6 w-6"></span>
                        </button>
                    </div>
                </div>

                {/* Contenido */}
                <div className="p-4 ">
                    {/* Imagen */}
                    {reconocimiento.image && (
                        <div className="relative mb-6">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={reconocimiento.image}
                                    alt={reconocimiento.title}
                                    className="w-full h-[350px] object-contain mx-auto"
                                />
                            </div>
                        </div>
                    )}

                    {/* Descripción */}
                    <div className="mt-6 text-gray-700">
                        <h4 className="text-lg font-medium mb-2">Historia</h4>
                        <p className="leading-relaxed">{reconocimiento.description}</p>

                        {/* Fecha y Lugar */}
                        {(reconocimiento.date || reconocimiento.location) && (
                            <div className="mt-4">
                                <h4 className="text-lg font-medium mb-2">Fecha y Lugar</h4>
                                <p>
                                    {reconocimiento.date && new Date(reconocimiento.date).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                    {reconocimiento.date && reconocimiento.location && ' - '}
                                    {reconocimiento.location}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CustomNextArrow = (props) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white h-8 w-8 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            onClick={props.onClick}
            style={{filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
            <span className="icon-[material-symbols--arrow-forward-ios] h-4 w-4"></span>
        </div>
    );
};

const CustomPrevArrow = (props) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 left-3 z-10 cursor-pointer rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white h-8 w-8 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            onClick={props.onClick}
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
            <span className="icon-[material-symbols--arrow-back-ios-new] h-4 w-4"></span>
        </div>
    );
};

const Reconocimientos = () => {
    const { items: recognitions, loading } = useAboutMe('recognitions');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReconocimiento, setSelectedReconocimiento] = useState(null);

    const activeRecognitions = recognitions
        .filter(item => item.isActive)
        .sort((a, b) => a.orderIndex - b.orderIndex);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                },
            },
        ]
    };

    const openModal = (reconocimiento) => {
        setSelectedReconocimiento(reconocimiento);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTimeout(() => {
            setSelectedReconocimiento(null);
        }, 300);
    };

    const navigateModal = (newReconocimiento) => {
        setSelectedReconocimiento(newReconocimiento);
    };

    if (loading) {
        return <div className="text-center py-8">Cargando reconocimientos...</div>;
    }

    if (activeRecognitions.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No hay reconocimientos disponibles en este momento
            </div>
        );
    }

    return (
        <div id="reconocimientos" className="flex flex-col gap-3 py-8">
            <h2 className="text-2xl font-semibold -mb-3 text-gray-800 flex justify-start">Distinciones & Reconocimientos</h2>
            <div className="text-center mb-6 mt-4">
                <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]'>
                    Trayectoria y Excelencia
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Explora los múltiples reconocimientos que han sido otorgados a Bernardo Polo a lo largo de su
                    destacada carrera. Estos honores reflejan su dedicación, liderazgo y contribuciones a la sociedad y el mundo
                    empresarial.
                </p>
            </div>

            <div className="relative px-8">
                <Slider {...settings}>
                    {activeRecognitions.map((reconocimiento) => (
                        <div key={reconocimiento.id} className="px-2">
                            <div
                                className="flex flex-col p-4 m-2 items-center justify-center rounded-lg gap-2 hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-md"
                                onClick={() => openModal(reconocimiento)}
                            >
                                <div className="overflow-hidden rounded-lg w-28 h-28 flex items-center justify-center bg-white p-2 shadow-sm">
                                    {reconocimiento.image ? (
                                        <img
                                            src={reconocimiento.image}
                                            alt={reconocimiento.title}
                                            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <span className="icon-[material-symbols--award-star-rounded] h-16 w-16"></span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xs font-medium text-gray-700 text-center mt-2 h-14 line-clamp-2">
                                    {reconocimiento.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <p className="text-center text-sm text-gray-400 mt-4">
                Haz clic en cualquier reconocimiento para ver más detalles y su historia
            </p>

            <ReconocimientoModal
                isOpen={modalOpen}
                onClose={closeModal}
                reconocimiento={selectedReconocimiento}
                reconocimientosData={activeRecognitions}
                onNavigate={navigateModal}
            />
        </div>
    );
};

export default Reconocimientos;