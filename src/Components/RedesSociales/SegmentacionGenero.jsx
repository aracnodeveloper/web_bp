import { DonutChart } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { useGender } from '../../hooks/useMetrics';

const SegmentacionDashboard = () => {
    const { data: genderData, loading } = useGender();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Preparar datos para el gráfico
    const datosGenero = genderData ? [
        {
            name: 'Hombre',
            percent: genderData.male,
            icon: "👨",
        },
        {
            name: 'Mujer',
            percent: genderData.female,
            icon: "👩",
        },
    ] : [];

    const colorMapGenero = {
        'Hombre': '#3b82f6',
        'Mujer': '#ec4899',
        'Desconocido': '#9ca3af'
    };

    const valueFormatter = (number) => `${Intl.NumberFormat('es-MX').format(number).toString()} %`;

    const DonutSection = ({ title, data, colorMap }) => (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                    {title}
                </h3>

                <div className={`flex flex-col items-center justify-between gap-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full md:w-1/2 max-w-xs mx-auto">
                        <DonutChart
                            data={data}
                            category="percent"
                            index="name"
                            valueFormatter={valueFormatter}
                            showAnimation={true}
                            colors={['blue', 'pink', 'gray']}
                            className="h-48"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        {data.map((item, index) => (
                            <div
                                key={item.name}
                                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                                style={{
                                    animation: `fadeInUp ${0.3 + index * 0.1}s ease-out forwards`
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-sm"
                                         style={{ backgroundColor: colorMap[item.name] }}></div>
                                    <span className="mr-1">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </div>
                                <div className="text-lg font-semibold" style={{ color: colorMap[item.name] }}>
                                    {item.percent}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center py-8">Cargando datos de género...</div>
            </div>
        );
    }

    if (!genderData) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center py-8 text-gray-500">
                    No hay datos de género disponibles
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <DonutSection
                title="Distribución por Género"
                data={datosGenero}
                colorMap={colorMapGenero}
            />
        </div>
    );
};

export default SegmentacionDashboard;