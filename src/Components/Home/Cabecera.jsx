import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useText } from "../../hooks/useText";
import {ChevronLeft, ChevronRight} from "lucide-react";

const Cabecera = () => {
    const { items, loading } = useText('portada');
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const activeItems = items
        .filter(item => item.isActive)
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));




    const navigateToSection = (section) => {
        navigate('/sobre-mi', { state: { scrollTo: section } });
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % activeItems.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + activeItems.length) % activeItems.length);
    };

    const currentItem = activeItems[currentSlide];

    if (loading) {
        return (
            <div className='flex items-center justify-center mx-auto max-w-6xl py-20'>
                <div className="animate-pulse text-gray-400">Cargando...</div>
            </div>
        );
    }

    if (!currentItem) {
        return (
            <div className='flex items-center justify-center mx-auto max-w-6xl py-20'>
                <p className="text-gray-500">No hay contenido disponible</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col mx-auto max-w-6xl py-6 px-4 sm:px-6 lg:px-8 w-full mt-7'>
            <div className='flex flex-col md:flex-row relative'>
                {/* Navigation Arrows */}
                {activeItems.length > 1 && (
                    <>
                        {/* Left Arrow */}
                        <button
                            onClick={prevSlide}
                            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2  transition-all duration-300 hover:scale-110'
                            aria-label="Slide anterior"
                        >
                            <ChevronLeft className='w-6 h-6 text-[#769842]' />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={nextSlide}
                            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2   transition-all duration-300 hover:scale-110'
                            aria-label="Slide siguiente"
                        >
                            <ChevronRight className='w-6 h-6 text-[#769842]' />
                        </button>
                    </>
                )}

                {/* Left column / Top on mobile */}
                <div className='flex flex-col w-full md:w-1/2 items-center justify-center mb-8 md:mb-0'>
                    <div>
                        <img className='h-28 sm:h-36' src='./images/logo_vertical.webp' alt="Logo Vertical"/>
                    </div>
                    <div className='h-6 sm:h-10'/>

                    {/* Title lines */}
                    {currentItem.title && (
                        <div className="transition-opacity duration-500 text-center">
                            {currentItem.title.split('\n').map((line, index) => (
                                <label
                                    key={index}
                                    className='block text-xl sm:text-2xl font-light text-gray-700'
                                >
                                    {line}
                                </label>
                            ))}
                        </div>
                    )}

                    <div className='h-6 sm:h-10'/>

                    {/* Description */}
                    {currentItem.description && (
                        <p className='text-center md:text-justify text-sm text-gray-600 max-w-md transition-opacity duration-500'>
                            {currentItem.description}
                        </p>
                    )}

                    {/* Navigation links */}
                    <div
                        className='flex mt-3 items-center w-full max-w-md cursor-pointer hover:opacity-80 transition-opacity'
                        onClick={() => navigateToSection('logros')}
                    >
                        <img className='h-8 sm:h-10' src='./images/galeria_icon.webp' alt="Galería"/>
                        <label className='cursor-pointer ml-2'>Fotografías memorables</label>
                    </div>
                    <div
                        className='flex mt-3 items-center w-full max-w-md cursor-pointer hover:opacity-80 transition-opacity'
                        onClick={() => navigateToSection('galeria')}
                    >
                        <img className='h-8 sm:h-10' src='./images/entrevistas_icon.webp' alt="Entrevistas"/>
                        <label className='cursor-pointer ml-2'>Entrevistas y conversaciones destacadas</label>
                    </div>
                </div>

                {/* Right column / Bottom on mobile */}
                <div className='flex flex-col justify-center items-center w-full md:w-1/2'>
                    {currentItem.image && (
                        <img
                            className='h-[250px] sm:h-[300px] md:h-[370px] object-contain rounded-full'
                            src={currentItem.image}
                            alt="Foto de inicio"
                        />
                    )}
                    {/* Phrase */}
                    {currentItem.phrase && (
                        <label className='text-xs max-w-[300px] sm:max-w-[400px] mt-4 text-gray-500 text-center italic transition-opacity duration-500'>
                            "{currentItem.phrase}"
                        </label>
                    )}
                </div>
            </div>

            {/* Slide indicators */}
            {activeItems.length > 1 && (
                <div className='flex justify-center gap-2 mt-6'>
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
        </div>
    );
};

export default Cabecera;