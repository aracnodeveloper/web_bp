import React, { useState, useEffect, useRef } from 'react';
import ProyectoItem from './ProyectoItem';

const ProyectoSection = ({ titulo, proyectos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const carouselRef = useRef(null);

    const getItemsPerPage = () => {
        if (windowWidth < 640) return 1;
        if (windowWidth < 1024) return 2;
        return 3;
    };

    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(proyectos.length / itemsPerPage);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setCurrentIndex(0);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, proyectos.length, windowWidth]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= totalPages - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalPages - 1 : prevIndex - 1
        );
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            nextSlide();
        }

        if (touchStart - touchEnd < -50) {
            prevSlide();
        }
    };

    const paginatedProyectos = [];
    for (let i = 0; i < totalPages; i++) {
        const startIdx = i * itemsPerPage;
        paginatedProyectos.push(proyectos.slice(startIdx, startIdx + itemsPerPage));
    }

    return (
        <div className="mb-20 px-4 sm:px-6 lg:px-8">
            <div className="relative mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-center relative z-10 uppercase">
                    {titulo}
                </h3>
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#96c121] to-transparent"></div>
            </div>

            <div
                ref={carouselRef}
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="relative h-full">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {paginatedProyectos.map((page, pageIndex) => (
                            <div key={pageIndex} className="w-full h-full flex-shrink-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {page.map((proyecto, proyectoIndex) => (
                                        <ProyectoItem
                                            key={proyectoIndex}
                                            imagen={proyecto.imagen}
                                            enlace={proyecto.enlace}
                                            mensaje={proyecto.mensaje}
                                            ubicacion={proyecto.ubicacion}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {totalPages > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10 focus:outline-none"
                            aria-label="Anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10 focus:outline-none"
                            aria-label="Siguiente"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex justify-center mt-4">
                            {paginatedProyectos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`mx-1 h-2 sm:h-3 transition-all rounded-full ${
                                        index === currentIndex
                                            ? 'bg-[#96c121] w-4 sm:w-6'
                                            : 'bg-gray-300 w-2 sm:w-3'
                                    }`}
                                    aria-label={`Ir a slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProyectoSection;
