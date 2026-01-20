import React from 'react';
import { useSocials } from "../../hooks/useMetrics";

const Footer = () => {
    const { items: socials, loading } = useSocials();

    // Configuración de iconos y estilos por tipo de red social
    const socialConfig = {
        'facebook': {
            icon: 'icon-[mdi--facebook]',
            gradient: 'from-blue-900 to-blue-700',
            hoverGradient: 'hover:from-blue-800 hover:to-blue-600',
            name: 'Facebook'
        },
        'instagram': {
            icon: 'icon-[mage--instagram-circle]',
            gradient: 'from-purple-800 to-pink-600',
            hoverGradient: 'hover:from-purple-700 hover:to-pink-500',
            name: 'Instagram'
        },
        'twitter': {
            icon: 'icon-[mage--x]',
            gradient: 'from-gray-800 to-gray-600',
            hoverGradient: 'hover:from-gray-700 hover:to-gray-500',
            name: 'X'
        },
        'tiktok': {
            icon: 'icon-[mage--tiktok-circle]',
            gradient: 'from-gray-800 to-black',
            hoverGradient: 'hover:from-gray-700 hover:to-gray-900',
            name: 'TikTok'
        },
        'youtube': {
            icon: 'icon-[entypo-social--youtube-with-circle]',
            gradient: 'from-red-800 to-red-600',
            hoverGradient: 'hover:from-red-700 hover:to-red-500',
            name: 'YouTube'
        },
        'linkedin': {
            icon: 'icon-[entypo-social--linkedin-with-circle]',
            gradient: 'from-blue-900 to-blue-700',
            hoverGradient: 'hover:from-blue-800 hover:to-blue-600',
            name: 'LinkedIn'
        }
    };

    // Agrupar redes sociales por tipo
    const groupedSocials = socials
        .filter(s => s.isActive)
        .reduce((acc, social) => {
            const config = socialConfig[social.type];
            if (!config) return acc;

            if (!acc[social.type]) {
                acc[social.type] = {
                    ...config,
                    accounts: []
                };
            }
            acc[social.type].accounts.push({
                title: social.title,
                url: social.url
            });
            return acc;
        }, {});

    return (
        <div className='relative bg-gradient-to-b from-[#00182b] to-[#002d4d] pt-12 pb-8'>
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg className="relative block w-full h-10" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white opacity-10"></path>
                </svg>
            </div>

            <div className='w-full  px-4 sm:px-6 lg:px-8'>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-3">Bernardo Polo Andrade</h2>
                    <p className="text-blue-300 text-base italic">Inspirando a través de mis experiencias</p>
                </div>

                <div className='flex flex-row gap-16 text-white mb-12 w-full'>
                    <div className=' w-96'>
                        <div className='flex flex-wrap'>
                            <h3 className='font-semibold text-xl mb-6 border-b border-blue-500 pb-3 w-full'>Navegación</h3>
                            <ul className='space-y-3 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6'>
                                <li className='hover:text-blue-300 transition-colors duration-300'>
                                    <a href="/" className='text-base flex items-center'>
                                        <span className="icon-[heroicons--home-solid] w-5 h-5 mr-3"></span>
                                        Inicio
                                    </a>
                                </li>
                                <li className='hover:text-blue-300 transition-colors duration-300'>
                                    <a href="/sobre-mi" className='text-base flex items-center'>
                                        <span className="icon-[heroicons--user-solid] w-5 h-5 mr-3"></span>
                                        Sobre mí
                                    </a>
                                </li>
                                <li className='hover:text-blue-300 transition-colors duration-300'>
                                    <a href="/redes-sociales" className='text-base flex items-center'>
                                        <span className="icon-[heroicons--chart-bar-solid] w-5 h-5 mr-3"></span>
                                        Redes Sociales
                                    </a>
                                </li>
                                <li className='hover:text-blue-300 transition-colors duration-300'>
                                    <a href="/proyectos" className='text-base flex items-center'>
                                        <span className="icon-[heroicons--briefcase-solid] w-5 h-5 mr-3"></span>
                                        Proyectos
                                    </a>
                                </li>
                                <li className='hover:text-blue-300 transition-colors duration-300'>
                                    <a href="/contacto" className='text-base flex items-center'>
                                        <span className="icon-[heroicons--chat-bubble-left-right-solid] w-5 h-5 mr-3"></span>
                                        Contacto
                                    </a>
                                </li>
                                <li className='hover:text-blue-300 transition-colors duration-300'>
                                    <a href="/ve" className='text-base flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                          visitaecuador.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='space-y-9 w-full'>
                        <div>
                            <h3 className='font-semibold text-xl mb-6 border-b border-blue-500 pb-3'>Sígueme</h3>
                            {loading ? (
                                <div className="text-center text-blue-300 py-8">
                                    <p className="text-base">Cargando redes sociales...</p>
                                </div>
                            ) : (
                                <div className='grid grid-cols-2  gap-5'>
                                    {Object.entries(groupedSocials).map(([type, data]) => {
                                        // Si hay múltiples cuentas, mostrar con enlaces internos
                                        if (data.accounts.length > 1 || data.accounts[0]) {
                                            return (
                                                <div key={type} className='relative rounded-xl overflow-hidden group min-h-[50px]'>
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${data.gradient}`}></div>
                                                    <div className="relative z-2 flex flex-wrap items-center justify-start p-4 h-full gap-2">
                                                        <span className={`${data.icon} h-8 w-8 text-white `}>  <span className="font-semibold">{data.name}</span></span>
                                                            <div className="flex flex-wrap items-center gap-3 text-xs text-center">
                                                                {data.accounts.map((account, idx) => (
                                                                    <a
                                                                        key={idx}
                                                                        href={account.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="hover:text-blue-200 transition-colors hover:underline text-sm font-semibold"
                                                                        title={`@${account.title}`}
                                                                    >
                                                                        {account.title}  |
                                                                    </a>
                                                                ))}
                                                            </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        // Si hay una sola cuenta, mostrar simple

                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-blue-900 my-10 opacity-30"></div>

                <div className="flex flex-col sm:flex-row justify-center items-center text-white gap-4">
                    <p className="text-sm opacity-70 text-center sm:text-left">
                        Copyright © {new Date().getFullYear()} · Bernardo Polo Andrade · Todos los derechos reservados
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 bg-transparent border-none cursor-pointer">Política de Privacidad</button>
                        <button className="text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 bg-transparent border-none cursor-pointer">Términos y Condiciones</button>
                        <a href="/#/contacto" className="text-sm opacity-70 hover:opacity-100 transition-opacity duration-300">Contacto</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;