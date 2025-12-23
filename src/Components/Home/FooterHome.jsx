import React from 'react';
import {useSocials} from "../../hooks/useMetrics";
import imgP from "../../imagenes/img_2.webp";

const FooterHome = () => {
    const { items: socials, loading } = useSocials();

    const socialConfig = {
        'instagram': {
            icon: './images/instagram_icon.webp',
            name: 'Instagram',
            normalizedType: 'instagram'
        },
        'facebook': {
            icon: './images/facebook_icon.webp',
            name: 'Facebook',
            normalizedType: 'facebook'
        },
        'tiktok': {
            icon: './images/tiktok_icon.webp',
            name: 'TikTok',
            normalizedType: 'tiktok'
        },
        'youtube': {
            icon: './images/youtube_icon.webp',
            name: 'YouTube',
            normalizedType: 'youtube'
        },
        'twitter': {
            icon: './images/x_icon.webp',
            name: 'X',
            normalizedType: 'twitter'
        },
        'linkedin': {
            icon: './images/linkedin_icon.webp',
            name: 'LinkedIn',
            normalizedType: 'linkedin'
        },
    };

    const columnOrder = ['facebook', 'instagram', 'youtube', 'tiktok', 'twitter', 'linkedin'];

    const groupedSocials = socials
        .filter(s => s.isActive)
        .reduce((acc, social) => {
            const config = socialConfig[social.type];
            if (!config) return acc;

            const normalizedType = config.normalizedType;
            if (!acc[normalizedType]) {
                acc[normalizedType] = {
                    icon: config.icon,
                    name: config.name,
                    accounts: []
                };
            }
            acc[normalizedType].accounts.push({
                title: social.title,
                url: social.url
            });
            return acc;
        }, {});

    if (loading) {
        return (
            <footer className="bg-[#92b509] w-full shadow-md">
                <div className="container mx-auto max-w-6xl px-4 py-8">
                    <div className="text-center text-white">
                        <p>Cargando redes sociales...</p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-[#92b509] w-full shadow-md">
            <div className="container mx-auto max-w-[1600px] px-6 py-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                    {/* Imagen del personaje */}
                    <div className="flex-shrink-0">
                        <h3 className="text-white text-xl font-bold mb-6 text-center lg:text-left">
                            Sígueme en mis redes sociales
                        </h3> <img
                            src={imgP}
                            alt="Bernardo Pelo Polito"
                            className="w-48 h-auto object-contain"
                        />
                    </div>

                    {/* Contenedor de redes sociales */}
                    <div className="flex-1 w-full">


                        {/* Grid de redes sociales */}
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                            {columnOrder.map((type) => {
                                const socialGroup = groupedSocials[type];
                                if (!socialGroup || socialGroup.accounts.length === 0) return null;

                                return (
                                    <div key={type} className="flex items-center gap-3 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                                        {/* Ícono de la red social */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={socialGroup.icon}
                                                alt={socialGroup.name}
                                                className="w-8 h-8 object-contain"
                                            />
                                        </div>

                                        {/* Lista de cuentas */}
                                        <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                                            {socialGroup.accounts.map((account, idx) => (
                                                <a
                                                    key={idx}
                                                    href={account.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white text-sm font-medium hover:underline hover:text-white/90 transition-colors truncate"
                                                    title={`@${account.title}`}
                                                >
                                                    @{account.title}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
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
        </footer>
    );
};

export default FooterHome;