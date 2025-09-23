import { BarChart } from '@tremor/react';
import  { useState, useEffect, useMemo } from 'react';

const segmentos = [
        {
            range: '13-17',
            porcentaje: 0.17,
            audienciaEstimada: '431.5144',
            emoji: "🧒",
            color: "#60a5fa"
        },
        {
            range: '18-24',
            porcentaje: 3.22,
            audienciaEstimada: '8,173.3904',
            emoji: "🧑",
            color: "#3b82f6"
        },
        {
            range: '25-34',
            porcentaje: 16.37,
            audienciaEstimada: '41,552.2984',
            emoji: "👨",
            color: "#2563eb"
        },
        {
            range: '35-44',
            porcentaje: 31.49,
            audienciaEstimada: '79,931.6968',
            emoji: "👨‍💼",
            color: "#1d4ed8"
        },
        {
            range: '45-54',
            porcentaje: 29.3,
            audienciaEstimada: '74,372.776',
            emoji: "👨‍🦱",
            color: "#1e40af"
        },
        {
            range: '55-64',
            porcentaje: 13.2,
            audienciaEstimada: '33,505.824',
            emoji: "👴",
            color: "#1e3a8a"
        },
        {
            range: '65+',
            porcentaje: 6.25,
            audienciaEstimada: '15,864.5',
            emoji: "🧓",
            color: "#172554"
        },
];

const SegmentacionEdad = () => {
    const [activeRange, setActiveRange] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoverRange, setHoverRange] = useState(null);

    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const maxPorcentaje = useMemo(() => Math.max(...segmentos.map(item => item.porcentaje)), []);

    const audienciaTotal = useMemo(() => {
        return segmentos.reduce((sum, item) => {
            const numero = parseFloat(item.audienciaEstimada.replace(/,/g, ''));
            return sum + numero;
        }, 0);
    }, []);

    const formattedAudienciaTotal = useMemo(() => {
        return new Intl.NumberFormat('es-MX').format(audienciaTotal);
    }, [audienciaTotal]);

    const valueFormatter = (number) => `${number.toFixed(2)}%`;

    const handleCardHover = (range) => {
        setHoverRange(range);
    };

    const handleCardLeave = () => {
        setHoverRange(null);
    };

    const activeSegment = useMemo(() => {
        return segmentos.find(s => s.range === activeRange);
    }, [activeRange]);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                        Distribución por Edad
                    </h3>
                    <div className="text-sm text-gray-500 font-medium">
                        Total: {formattedAudienciaTotal} personas
                    </div>
                </div>

                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="mb-6">
                        <BarChart
                            className="h-60"
                            data={segmentos}
                            showLegend={false}
                            showGridLines={true}
                            showAnimation={true}
                            index="range"
                            categories={['porcentaje']}
                            colors={['blue']}
                            valueFormatter={valueFormatter}
                            onValueChange={(v) => setActiveRange(v?.range || null)}
                            yAxisWidth={48}
                            customTooltip={({ payload }) => {
                                if (!payload?.length) return null;
                                const data = payload[0].payload;
                                return (
                                    <div className="p-2 bg-white shadow-lg rounded-lg border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <span>{data.emoji}</span>
                                            <span className="font-semibold">{data.range} años</span>
                                        </div>
                                        <div className="font-bold text-blue-600">{data.porcentaje}%</div>
                                        <div className="text-sm text-gray-600">~{data.audienciaEstimada} personas</div>
                                    </div>
                                );
                            }}
                        />
                    </div>

                    {activeSegment && (
                        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100 flex justify-between items-center animate-pulse">
                            <div className="flex items-center">
                                <span className="text-3xl mr-3">
                                    {activeSegment.emoji}
                                </span>
                                <div>
                                    <div className="font-semibold text-lg text-blue-800">
                                        {activeSegment.range} años
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {parseFloat(activeSegment.audienciaEstimada.replace(/,/g, '')) / audienciaTotal * 100 > 1
                                            ? `${(parseFloat(activeSegment.audienciaEstimada.replace(/,/g, '')) / audienciaTotal * 100).toFixed(1)}% del total`
                                            : "Menos del 1% del total"}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">
                                    {activeSegment.porcentaje}%
                                </div>
                                <div className="text-sm text-gray-500">
                                    ~{activeSegment.audienciaEstimada} personas
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {segmentos.map((item, index) => {
                            const isHighest = item.porcentaje === maxPorcentaje;
                            const isActive = activeRange === item.range;
                            const isHovered = hoverRange === item.range;

                            return (
                                <div
                                    key={item.range}
                                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 
                                        ${isActive ? 'bg-blue-100 scale-105 shadow-md' : 'hover:bg-gray-50'} 
                                        ${isHighest ? 'ring-2 ring-blue-300' : ''}
                                        ${isHovered && !isActive ? 'bg-gray-50' : ''}`}
                                    onClick={() => setActiveRange(isActive ? null : item.range)}
                                    onMouseEnter={() => handleCardHover(item.range)}
                                    onMouseLeave={handleCardLeave}
                                    style={{
                                        animation: `fadeIn ${0.3 + index * 0.1}s ease-out forwards`
                                    }}
                                >
                                    <div className="flex items-center mb-2 justify-between">
                                        <div className="flex items-center">
                                            <span className="mr-2 text-xl">{item.emoji}</span>
                                            <span className="font-medium">{item.range} años</span>
                                        </div>
                                        {isHighest && (
                                            <span className="text-xs bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full font-medium">
                                                Mayor
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="text-sm font-semibold" style={{ color: item.color }}>
                                                {item.porcentaje}%
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                ~{item.audienciaEstimada}
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${(item.porcentaje / maxPorcentaje) * 100}%`,
                                                    backgroundColor: item.color,
                                                    transition: 'width 1s ease-in-out'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default SegmentacionEdad;
