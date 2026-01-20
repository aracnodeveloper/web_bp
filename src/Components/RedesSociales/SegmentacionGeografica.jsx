import { DonutChart } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { useLocation } from '../../hooks/useMetrics';

const SegmentacionGeografica = () => {
    const { items: locations, loading } = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Emojis por país/ciudad
    const locationEmojis = {
        // Países
        'Ecuador': '🇪🇨',
        'Estados Unidos': '🇺🇸',
        'España': '🇪🇸',
        'Italia': '🇮🇹',
        'Colombia': '🇨🇴',
        'Canadá': '🇨🇦',
        'Chile': '🇨🇱',
        'México': '🇲🇽',
        'Perú': '🇵🇪',
        'Alemania': '🇩🇪',
        'República Dominicana': '🇩🇴',
        // Ciudades
        'Cuenca': '🏙️',
        'Guayaquil': '🌆',
        'Quito': '🏛️',
        'Nueva York': '🗽',
        'Riobamba': '🌇',
        'Santo Domingo': '🌄',
        'Manta': '⚓',
        'Ambato': '🌁',
        'Machala': '🌃',
        'Portoviejo': '🏘️',
        'Durán': '🌉',
    };

    // Colores predefinidos
    const defaultColors = [
        '#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6',
        '#06b6d4', '#ec4899', '#84cc16', '#6b7280', '#1e293b'
    ];

    // Filtrar y preparar datos
    const countries = locations
        .filter(loc => loc.type === 'country' && loc.isActive)
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
        .map((loc, index) => ({
            name: loc.title,
            percent: loc.rise || 0,
            icon: locationEmojis[loc.title] || '🌍',
            color: loc.colors || defaultColors[index % defaultColors.length]
        }));

    const cities = locations
        .filter(loc => loc.type === 'city' && loc.isActive)
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
        .map((loc, index) => ({
            name: loc.title,
            percent: loc.rise || 0,
            icon: locationEmojis[loc.title] || '🏙️',
            color: loc.colors || defaultColors[index % defaultColors.length]
        }));

    // Crear mapa de colores dinámicamente
    const createColorMap = (items) => {
        const map = {};
        items.forEach(item => {
            map[item.name] = item.color;
        });
        return map;
    };

    const colorMapPaises = createColorMap(countries);
    const colorMapCiudades = createColorMap(cities);

    const valueFormatter = (number) => `${Intl.NumberFormat('es-MX').format(number).toString()} %`;

    const DonutSection = ({ title, data, colorMap }) => {
        const topData = data.slice(0, 8);
        const otrosData = data.slice(8);

        let chartData = topData;
        if (otrosData.length > 0) {
            const otrosPorcentaje = otrosData.reduce((total, item) => total + item.percent, 0);
            chartData = [...topData, { name: 'Otros', percent: otrosPorcentaje, icon: "🌐" }];
        }

        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                        {title}
                    </h3>

                    <div className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-full md:w-1/2 max-w-xs mx-auto">
                            <DonutChart
                                data={chartData}
                                category="percent"
                                index="name"
                                valueFormatter={valueFormatter}
                                showAnimation={true}
                                colors={['blue', 'emerald','red', 'amber','purple','cyan','pink','green','gray']}
                                className="h-48"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
                                {data.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                        style={{
                                            animation: `fadeInUp ${0.3 + index * 0.1}s ease-out forwards`
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-sm"
                                                 style={{ backgroundColor: colorMap[item.name] || '#9ca3af' }}></div>
                                            <span className="mr-1">{item.icon}</span>
                                            <span className="font-medium text-sm">{item.name}</span>
                                        </div>
                                        <div className="text-sm font-semibold" style={{ color: colorMap[item.name] || '#9ca3af' }}>
                                            {item.percent}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center py-8">Cargando datos geográficos...</div>
            </div>
        );
    }

    if (countries.length === 0 && cities.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center py-8 text-gray-500">
                    No hay datos geográficos disponibles
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Seguidores por País y Ciudad
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {countries.length > 0 && (
                    <DonutSection
                        title="Seguidores por País"
                        data={countries}
                        colorMap={colorMapPaises}
                    />
                )}

                {cities.length > 0 && (
                    <DonutSection
                        title="Seguidores por Ciudad"
                        data={cities}
                        colorMap={colorMapCiudades}
                    />
                )}
            </div>
        </div>
    );
};

export default SegmentacionGeografica;