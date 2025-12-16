import React, { useState } from 'react';
import { Award, Globe, Target, Info, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {useText} from "../../hooks/useText";


const Introduccion = () => {
    const { items, loading } = useText( 'sobre-mi')
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isPortalesModalOpen, setIsPortalesModalOpen] = useState(false);
    const navigate = useNavigate();
    const activeItems = items.filter(item => item.isActive).sort((a, b) => a.orderIndex - b.orderIndex);

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

    return (
        <div id='biografia' className='flex flex-col md:flex-row mx-auto max-w-6xl py-12 sm:px-6 lg:px-8 w-full rounded-2xl'>

            <div className='w-full md:w-1/2  flex flex-col gap-4 justify-center px-4 md:px-6'>
                <div className='relative group'>
                    <img
                        src='./images/sobre-mi.webp'
                        alt="Bernardo Polo Andrade"
                        className='max-w-full h-auto  shadow-2xl transform transition-transform group-hover:scale-105'
                    />
                    <div
                        className='absolute bottom-4 right-4 bg-[#769842] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center group cursor-help'
                        title="Innovador tecnológico en turismo digital"
                    >
                        Hacker del Turismo <Info className='ml-2 w-4 h-4' />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 flex flex-col gap-4 justify-center px-4 md:px-6'>
                <h2 className='text-3xl font-bold text-gray-800 flex items-center'>
                    Bernardo Polo Andrade
                    <button
                        onClick={() => setIsDetailOpen(!isDetailOpen)}
                        className='ml-2 text-[#769842] hover:text-[#5a7633] focus:outline-none'
                    >
                        <Info className='w-5 h-5'/>
                    </button>
                </h2>
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
                                    Ganador de premios como THE BIZ AEARD (2007-2008),
                                    Embajador Turístico del Azuay (2022),
                                    Premio IÑAY en Comunicación (2022)
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <blockquote className='text-xl italic text-[#769842] border-l-4 border-[#769842] pl-4'>
                    "Se cuenta una historia, que debe ser interesante, atractiva y que perdure con los años."
                </blockquote>
                {activeItems.map((item) =>(          <p key={item.id} className='text-justify text-gray-700'>
                        {item.description}  </p>
))}
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
                <div className='mt-4 flex items-center space-x-3'>
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
    );
};

export default Introduccion;
