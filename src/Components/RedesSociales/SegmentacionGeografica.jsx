import { DonutChart } from '@tremor/react';
import React, { useState, useEffect } from 'react';

const SegmentacionGeografica = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const datosPaises = [
        { name: 'Ecuador', percent: 85.8, icon: "🇪🇨" },
        { name: 'Estados Unidos', percent: 9.43, icon: "🇺🇸" },
        { name: 'España', percent: 1.66, icon: "🇪🇸" },
        { name: 'Italia', percent: 0.56, icon: "🇮🇹" },
        { name: 'Colombia', percent: 0.37, icon: "🇨🇴" },
        { name: 'Canadá', percent: 0.27, icon: "🇨🇦" },
        { name: 'Chile', percent: 0.27, icon: "🇨🇱" },
        { name: 'México', percent: 0.24, icon: "🇲🇽" },
        { name: 'Perú', percent: 0.18, icon: "🇵🇪" },
        { name: 'Alemania', percent: 0.15, icon: "🇩🇪" },
        { name: 'República Dominicana', percent: 0.12, icon: "🇩🇴" }
    ];

    const datosCiudades = [
        { name: 'Cuenca', percent: 30.6, icon: "🏙️" },
        { name: 'Guayaquil', percent: 18.6, icon: "🌆" },
        { name: 'Quito', percent: 16.2, icon: "🏛️" },
        { name: 'Nueva York', percent: 4.2, icon: "🗽" },
        { name: 'Riobamba', percent: 1.9, icon: "🌇" },
        { name: 'Santo Domingo (Ecuador)', percent: 2.6, icon: "🌄" },
        { name: 'Manta', percent: 2.0, icon: "⚓" },
        { name: 'Ambato', percent: 2.0, icon: "🌁" },
        { name: 'Machala', percent: 2.0, icon: "🌃" },
        { name: 'Portoviejo', percent: 1.8, icon: "🏘️" },
        { name: 'Durán', percent: 1.6, icon: "🌉" },
    ];

    const colorMapPaises = {
        'Ecuador': '#3b82f6',
        'Estados Unidos': '#10b981',
        'España': '#ef4444',
        'Italia': '#f59e0b',
        'Colombia': '#8b5cf6',
        'Canadá': '#06b6d4',
        'Chile': '#ec4899',
        'México': '#84cc16',
        'Perú': '#6b7280',
        'Alemania': '#1e293b',
        'República Dominicana': 'rgba(84,96,88,0.08)'
    };

    const colorMapCiudades = {
        'Cuenca': '#3b82f6',
        'Guayaquil': '#10b981',
        'Quito': '#ef4444',
        'Nueva York': '#f59e0b',
        'Riobamba': '#8b5cf6',
        'Machala': '#06b6d4',
        'Loja': '#ec4899',
        'Azogues': '#84cc16',
        'Manta': '#374151',
        'Ambato': '#4b5563',
        'Latacunga': '#64748b',
        'Samborondón': '#94a3b8',
        'Gualaceo': '#cbd5e1',
        'Sígsig': '#e2e8f0',
        'Milagros': '#f1f5f9'
    };

    const valueFormatter = (number) => `${Intl.NumberFormat('es-MX').format(number).toString()} %`;

    const DonutSection = ({ title, data, colorMap, totalLabel, totalValue }) => {
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
                                colors={['blue', 'emerald','red' , 'amber','purple','cyan','pink','green','gray']}
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

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Seguidores por País y Ciudad
            </h2>
<div className="grid grid-cols-2 gap-4">
            <DonutSection
                title="Seguidores por País"
                data={datosPaises}
                colorMap={colorMapPaises}
                totalLabel="Total seguidores"
                totalValue="253.832K personas"
            />

            <DonutSection
                title="Seguidores por Ciudad"
                data={datosCiudades}
                colorMap={colorMapCiudades}
                totalLabel="Total por ubicación"
                totalValue="253.832K personas"
            /></div>
        </div>
    );
};

export default SegmentacionGeografica;
