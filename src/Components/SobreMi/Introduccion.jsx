import React, { useState, useEffect } from 'react';
import { Award, Globe, Target, Info, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useText } from "../../hooks/useText";

const Introduccion = () => {
    const { items, loading } = useText('sobre-mi');
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isPortalesModalOpen, setIsPortalesModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const activeItems = items
        .filter(item => item.isActive)
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

    const achievements = [
        "Creador del primer sistema de reservas sin intermediación mundial",
        "Pionero en instalación de redes de internet inalámbricas en Ecuador",
        "Fundador de múltiples plataformas digitales de turismo",
        "Reconocido con premios empresariales internacionales"
    ];

    const portales = [
        {
            name: "VisitaEcuadorInfluencers.com",
            image: "https://visitaecuadorinfluencer.com/img/diseno/logo-11.svg",
            url: "https://visitaecuadorinfluencer.com/"
        },
        {
            name: "VisitaEcuador.com",
            image: "https://visitaecuadorinfluencer.com/img/diseno/portalVisitaEcuador.jpg",
            url: "https://visitaecuador.com/"
        },
        {
            name: "MOVIMIENTO VISITA ECUADOR",
            image: "https://visitaecuadorinfluencer.com/img/diseno/movimientoVisitaEcuador.jpg",
            url: "https://www.visitaecuador.com/"
        },
        {
            name: "Disney Concierge",
            image: "https://visitaecuadorinfluencer.com/img/diseno/clubVisitaEcuador.jpg",
            url: "https://www.disneyconcierge.com"
        }
    ];


    const handlePortalesModal = () => {
        setIsPortalesModalOpen(true);
    };

    const handlePortalClick = (url) => {
        window.open(url, '_blank');
    };

    const handleEmprendedorClick = () => {
        navigate('/sobre-mi', { state: { scrollTo: 'galeria' } });
    };

    const handleReconocimientosClick = () => {
        navigate('/sobre-mi', { state: { scrollTo: 'logros' } });
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % activeItems.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + activeItems.length) % activeItems.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center mx-auto max-w-6xl py-20'>
                <div className="animate-pulse text-gray-400">Cargando...</div>
            </div>
        );
    }

    if (activeItems.length === 0) {
        return (
            <div className='flex items-center justify-center mx-auto max-w-6xl py-20'>
                <p className="text-gray-500">No hay contenido biográfico disponible</p>
            </div>
        );
    }

    const currentItem = activeItems[currentSlide];

    return (
        <div id='biografia' className='flex flex-col mx-auto max-w-6xl py-12 sm:px-6 lg:px-8 w-full rounded-2xl relative'>
            <div className='flex flex-col md:flex-row gap-4'>
                {/* Image Column */}
                <div className='w-full md:w-1/2 flex flex-col gap-4 justify-center px-4 md:px-6 relative'>
                    <div className='relative group'>
                        {currentItem.image && (
                            <img
                                src={currentItem.image}
                                alt={currentItem.title || "Bernardo Polo Andrade"}
                                className='max-w-full h-auto shadow-2xl transform transition-all duration-500 group-hover:scale-105'
                            />
                        )}
                        <div
                            className='absolute bottom-4 right-4 bg-[#769842] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center group cursor-help'
                            title="Innovador tecnológico en turismo digital"
                        >
                            Hacker del Turismo <Info className='ml-2 w-4 h-4' />
                        </div>
                    </div>

                    {/* Navigation arrows for mobile/small screens */}
                    {activeItems.length > 1 && (
                        <div className='flex justify-center gap-4 md:hidden'>
                            <button
                                onClick={prevSlide}
                                className='bg-white hover:bg-white p-2 transition-all'
                                aria-label="Slide anterior"
                            >
                                <ChevronLeft className='w-6 h-6 text-[#769842]' />
                            </button>
                            <button
                                onClick={nextSlide}
                                className='bg-white hover:bg-white p-2 transition-all'
                                aria-label="Siguiente slide"
                            >
                                <ChevronRight className='w-6 h-6 text-[#769842]' />
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Column */}
                <div className='w-full md:w-1/2 flex flex-col gap-4 justify-center px-4 md:px-6'>
                    {/* Title with transition */}
                    <h2 className='text-3xl font-bold text-gray-800 flex items-center transition-opacity duration-500'>
                        {currentItem.title || "Bernardo Polo Andrade"}
                        <button
                            onClick={() => setIsDetailOpen(!isDetailOpen)}
                            className='ml-2 text-[#769842] hover:text-[#5a7633] focus:outline-none'
                        >
                            <Info className='w-5 h-5'/>
                        </button>
                    </h2>

                    {/* Details Modal */}
                    {isDetailOpen && (
                        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
                            <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative'>
                                <button
                                    onClick={() => setIsDetailOpen(false)}
                                    className='absolute top-4 right-4 text-gray-600 hover:text-gray-900'
                                >
                                    <X className='w-6 h-6'/>
                                </button>
                                <h3 className='text-2xl font-bold mb-4 uppercase text-[#96c121]'>Detalles Profesionales</h3>
                                <div className='space-y-4'>
                                    <h4 className='font-bold text-lg uppercase'>Logros Destacados</h4>
                                    <ul className='list-disc pl-5'>
                                        {achievements.map((achievement, index) => (
                                            <li key={index} className='mb-2'>{achievement}</li>
                                        ))}
                                    </ul>
                                    <h4 className='font-bold mt-4 text-lg uppercase'>Reconocimientos</h4>
                                    <p>
                                        Ganador de premios como THE BIZ AWARD (2007-2008),
                                        Embajador Turístico del Azuay (2022),
                                        Premio IÑAY en Comunicación (2022)
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quote/Phrase */}
                    {currentItem.phrase && (
                        <blockquote className='text-xl italic text-[#769842] border-l-4 border-[#769842] pl-4 transition-opacity duration-500'>
                            "{currentItem.phrase}"
                        </blockquote>
                    )}

                    {/* Description */}
                    {currentItem.description && (
                        <p className='text-justify text-gray-700 transition-opacity duration-500'>
                            {currentItem.description}
                        </p>
                    )}

                    {/* Action Cards */}
                    <div className='grid grid-cols-3 gap-4 mt-4'>
                        <div
                            onClick={handlePortalesModal}
                            className='flex flex-col items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group cursor-pointer'
                            title="Creador de Ecuaventura.com y VisitaEcuador.com"
                        >
                            <Globe className='text-[#769842] w-8 h-8 mb-2 group-hover:scale-110 transition-transform'/>
                            <span className='text-sm font-semibold text-center'>Portales Turísticos</span>
                        </div>

                        <div
                            onClick={handleReconocimientosClick}
                            className='flex flex-col items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group cursor-pointer'
                            title="Ganador de premios nacionales e internacionales"
                        >
                            <Award className='text-[#769842] w-8 h-8 mb-2 group-hover:scale-110 transition-transform'/>
                            <span className='text-sm font-semibold text-center'>Múltiples Reconocimientos</span>
                        </div>

                        <div
                            onClick={handleEmprendedorClick}
                            className='flex flex-col items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group cursor-pointer'
                            title="Fundador de Full Vacations y Disney Concierge"
                        >
                            <Target className='text-[#769842] w-8 h-8 mb-2 group-hover:scale-110 transition-transform'/>
                            <span className='text-sm font-semibold text-center'>Emprendedor Digital</span>
                        </div>
                    </div>

                    {/* Portales Modal */}
                    {isPortalesModalOpen && (
                        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
                            <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative'>
                                <button
                                    onClick={() => setIsPortalesModalOpen(false)}
                                    className='absolute top-4 right-4 text-gray-600 hover:text-gray-900'
                                >
                                    <X className='w-6 h-6'/>
                                </button>
                                <h3 className='text-2xl font-bold mb-4'>Portales Turísticos</h3>
                                <div className='grid grid-cols-2 gap-4'>
                                    {portales.map((portal, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handlePortalClick(portal.url)}
                                            className='cursor-pointer hover:opacity-80 transition-opacity'
                                        >
                                            <img
                                                src={portal.image}
                                                alt={portal.name}
                                                className='w-full h-40 object-cover rounded-lg'
                                            />
                                            <p className='text-center mt-2 font-semibold'>{portal.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className='mt-4 flex items-center space-x-3 flex-wrap'>
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <a href="mailto:polobernardo@hotmail.com" className='text-[#769842] hover:underline'>
                            polobernardo@hotmail.com
                        </a>
                        <span className='text-gray-400'>|</span>
                        <span className="w-5 h-5 text-black icon-[mdi--whatsapp]"/>
                        <a href="tel:+593985862555" className='text-[#769842] hover:underline'>
                            0985862555
                        </a>
                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            {activeItems.length > 1 && (
                <div className='flex justify-center gap-2 mt-8'>
                    {activeItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? 'bg-[#96c121] w-8'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Ir al slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Desktop Navigation Arrows */}
            {activeItems.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className='hidden md:block absolute left-0 top-1/2 -translate-y-1/2  hover:bg-white p-3 rounded-l-lg  transition-all z-10'
                        aria-label="Slide anterior"
                    >
                        <ChevronLeft className='w-6 h-6 text-[#769842]' />
                    </button>
                    <button
                        onClick={nextSlide}
                        className='hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white p-3 rounded-r-lg  transition-all z-10'
                        aria-label="Siguiente slide"
                    >
                        <ChevronRight className='w-6 h-6 text-[#769842]' />
                    </button>
                </>
            )}
        </div>
    );
};

export default Introduccion;