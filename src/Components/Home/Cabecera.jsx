import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useText} from "../../hooks/useText";

const Cabecera = () => {
    const { items, loading } = useText( 'portada')
    const navigate = useNavigate();
    const activeItems = items.filter(item => item.isActive).sort((a, b) => a.orderIndex - b.orderIndex);

    const navigateToSection = (section) => {
        navigate('/sobre-mi', { state: { scrollTo: section } });
    };

    return (
        <div className='flex flex-col mx-auto max-w-6xl py-6 px-4 sm:px-6 lg:px-8 w-full mt-7 '>
            <div className='flex flex-col md:flex-row'>
                {/* Left column / Top on mobile */}
                <div className='flex flex-col w-full md:w-1/2 items-center justify-center mb-8 md:mb-0'>
                    <div>
                        <img className='h-28 sm:h-36' src='./images/logo_vertical.webp' alt="Logo Vertical"/>
                    </div>
                    <div className='h-6 sm:h-10'/>
                    <label className='text-xl sm:text-2xl font-light text-gray-700'>Hacker del Turismo</label>
                    <label className='text-xl sm:text-2xl font-light text-gray-700'>Emprendedor disruptivo</label>
                    <label className='text-xl sm:text-2xl font-light text-gray-700'>Bloguero</label>
                    <div className='h-6 sm:h-10'/>
                    {activeItems.map((item) =>(
                        <p key={item.id} className='text-center md:text-justify text-sm text-gray-600 max-w-md'>  {item.description}</p>
                    ))}
                    <div
                        className='flex mt-3 items-center w-full max-w-md cursor-pointer'
                        onClick={() => navigateToSection('logros')}
                    >
                        <img className='h-8 sm:h-10' src='./images/galeria_icon.webp' alt="Galería"/>
                        <label className='cursor-pointer ml-2'>Fotografías memorables</label>
                    </div>
                    <div
                        className='flex mt-3 items-center w-full max-w-md cursor-pointer'
                        onClick={() => navigateToSection('galeria')}
                    >
                        <img className='h-8 sm:h-10' src='./images/entrevistas_icon.webp' alt="Entrevistas"/>
                        <label className='cursor-pointer ml-2'>Entrevistas y conversaciones destacadas</label>
                    </div>
                </div>

                {/* Right column / Bottom on mobile */}
                <div className='flex flex-col justify-center items-center w-full md:w-1/2'>
                    <img
                        className='h-[250px] sm:h-[300px] md:h-[370px] object-contain'
                        src='./images/foto_inicio.webp'
                        alt="Foto de inicio"
                    />
                    <label className='text-xs max-w-[300px] sm:max-w-[400px] mt-4 text-gray-500 text-center'>"Se cuenta una historia, que debe ser interesante, atractiva y que perdure con los años."</label>
                </div>
            </div>
        </div>
    );
};

export default Cabecera;
