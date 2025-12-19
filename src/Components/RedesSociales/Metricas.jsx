import React from 'react';
import Medidor from './Medidor';
import SeguidoresRed from './SeguidoresRed';
import SegmentacionGenero from './SegmentacionGenero';
import SegmentacionEdad from './SegmentacionEdad';
import SegmentacionGeografica from './SegmentacionGeografica';
import { useSocials } from '../../hooks/useMetrics';

const Metricas = () => {
    const { items: socials, loading } = useSocials();

    // Mapear tipos de la BD a iconos
    const getSocialIcon = (type) => {
        const icons = {
            'instagram': './images/instagram_icon.webp',
            'facebook': './images/facebook_icon.webp',
            'tiktok': './images/tiktok_icon.webp',
            'youtube': './images/youtube_icon.webp',
            'twitter': './images/x_icon.webp',
            'linkedin': './images/linkedin_icon.webp',
        };
        return icons[type] || './images/instagram_icon.webp';
    };

    // Mapear tipos de la BD a colores
    const getSocialColor = (type) => {
        const colors = {
            'instagram': '#db5781',
            'facebook': '#35758a',
            'tiktok': '#60605f',
            'youtube': '#e6231c',
            'twitter': '#000000',
            'linkedin': '#0e76a8',
        };
        return colors[type] || '#db5781';
    };

    // Formatear número de seguidores
    const formatFollowers = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const activeSocials = socials
        .filter(s => s.isActive)
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg">
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-500">Cargando métricas...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg">
            <div id='metricas' className='flex flex-col gap-6 mx-auto max-w-6xl py-8 sm:px-6 lg:px-8 w-full'>
                <div className="text-center mb-2">
                    <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]'>Métricas</h2>
                    <h3 className='text-xl font-medium mt-2'>Explora el impacto de los Contenidos de Bernardo Polo Andrade</h3>
                    <p className='text-gray-600 font-light text-sm mt-2 max-w-3xl mx-auto'>
                        ¡Descubre las métricas que revelan el alcance y la influencia de los contenidos creados por Bernardo Polo Andrade!
                        Sumérgete en los datos recopilados y conoce el impacto que su presencia genera en la audiencia.
                    </p>
                </div>

                <Medidor />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    {activeSocials.map((social) => (
                        <SeguidoresRed
                            key={social.id}
                            red={social.title}
                            color={getSocialColor(social.type)}
                            icono={getSocialIcon(social.type)}
                            seguidores={formatFollowers(social.followers)}
                            rise={social.rise}
                            url={social.url}
                        />
                    ))}
                </div>

                {activeSocials.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No hay redes sociales activas para mostrar
                    </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-2'>
                    <SegmentacionGenero />
                    <SegmentacionEdad />
                </div>

                <div className='mt-2'>
                    <SegmentacionGeografica />
                </div>
            </div>
        </div>
    );
};

export default Metricas;