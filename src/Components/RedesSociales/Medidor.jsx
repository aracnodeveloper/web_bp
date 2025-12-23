import React, { useEffect, useState } from 'react';
import { useSocials } from '../../hooks/useMetrics';

const Medidor = () => {
    const { items: socials, loading } = useSocials();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    // Calcular totales
    const totalFollowers = socials
        .filter(s => s.isActive)
        .reduce((sum, social) => sum + social.followers, 0);

    // Agrupar seguidores por tipo de plataforma (suma todas las cuentas del mismo tipo)
    const getFollowersByType = (type) => {
        return socials
            .filter(s => s.type === type && s.isActive)
            .reduce((sum, social) => sum + social.followers, 0);
    };

    // Calcular porcentajes por tipo (agrupando todas las cuentas del mismo tipo)
    const getSocialPercentage = (type) => {
        const followersOfType = getFollowersByType(type);
        if (followersOfType === 0 || totalFollowers === 0) return 0;
        return ((followersOfType / totalFollowers) * 100).toFixed(2);
    };

    // Formatear número
    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    // Calcular crecimiento promedio
    const averageGrowth = socials.length > 0
        ? (socials.reduce((sum, s) => sum + (s.rise || 0), 0) / socials.length).toFixed(1)
        : 0;

    if (loading) {
        return <div className="text-center py-8">Cargando métricas...</div>;
    }

    const socialTypes = [
        { type: 'instagram', color: '#e33f72', label: 'Instagram' },
        { type: 'facebook', color: '#35758a', label: 'Facebook' },
        { type: 'twitter', color: '#000000', label: 'X'},
        { type: 'tiktok', color: '#60605f', label: 'TikTok' },
        { type: 'youtube', color: '#e6231c', label: 'Youtube' },
        { type: 'linkedin', color: '#0e76a8', label: 'LinkedIn' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-700 tracking-wider">SEGUIDORES TOTALES</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        + {averageGrowth}% este mes
                    </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-end gap-2">
                        <div className="relative">
                            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]">
                                {formatNumber(totalFollowers)}
                            </span>
                            <div className="absolute -top-4 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-800 transform rotate-12">
                                ¡Récord!
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="icon-[ph--arrow-up] h-8 w-8 text-green-500"></span>
                            <span className="text-sm font-semibold text-green-500">
                                +{(totalFollowers * (averageGrowth / 100000)).toFixed(1)}k
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <p className="text-xs text-gray-500 mb-2">Distribución por plataforma</p>
                        <div className="flex h-12 rounded-lg overflow-hidden shadow-inner">
                            {socialTypes.map((social, index) => {
                                const percentage = getSocialPercentage(social.type);
                                return percentage > 0 ? (
                                    <div
                                        key={social.type}
                                        className="flex items-center justify-center text-white font-semibold text-sm transition-all duration-1000"
                                        style={{
                                            width: animate ? `${percentage}%` : '0%',
                                            backgroundColor: social.color,
                                            transitionDelay: `${index * 100}ms`
                                        }}
                                        title={`${social.label}: ${formatNumber(getFollowersByType(social.type))} (${percentage}%)`}
                                    >
                                        {percentage > 5 && `${percentage}%`}
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <div className="flex justify-end mt-2 text-xs text-gray-500 gap-2 flex-wrap">
                            {socialTypes.map(social => {
                                const percentage = getSocialPercentage(social.type);
                                return percentage > 0 ? (
                                    <div key={social.type} className="flex items-center gap-1">
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: social.color }}
                                        ></div>
                                        {social.label}
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Medidor;