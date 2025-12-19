import React from 'react';
import {useSocials} from "../../hooks/useMetrics";

const FooterHome = () => {
    const { items: socials, loading } = useSocials();

    // Mapear tipos a íconos y normalizar nombres
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

    // Orden de visualización de las columnas
    const columnOrder = ['facebook', 'instagram', 'youtube', 'tiktok', 'twitter', 'linkedin'];

    // Agrupar redes sociales por tipo normalizado
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
            <div className="flex flex-wrap justify-center w-full px-4 py-8">
                <div className="mb-6 w-96">
                    <p className="text-white text-lg text-center font-semibold md:text-left">
                        Sígueme en mis redes sociales
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {columnOrder.map((type) => {
                        const socialGroup = groupedSocials[type];
                        if (!socialGroup || socialGroup.accounts.length === 0) return null;

                        return (
                            <div key={type} className="flex flex-row items-start gap-5">
                                {/* Ícono de la red social */}
                                <div className="flex items-center gap-2 mb-3">
                                    <img
                                        src={socialGroup.icon}
                                        alt={socialGroup.name}
                                        className="w-8 h-8 object-contain"
                                    />

                                </div>

                                {/* Lista de cuentas */}
                                <div className="flex flex-wrap  gap-5 w-full  mt-1">
                                    {socialGroup.accounts.map((account, idx) => (

                                            <a
                                                key={idx}
                                                href={account.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white text-sm hover:underline font-semibold hover:text-white/90 transition-colors break-words"
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
        </footer>
    );
};

export default FooterHome;