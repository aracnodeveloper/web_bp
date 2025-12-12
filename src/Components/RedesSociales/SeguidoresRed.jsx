import React, { useState } from 'react';

const SeguidoresRed = ({red, seguidores, color, icono, rise, url}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <div
            className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            style={{
                backgroundColor: color,
                borderBottom: `4px solid ${color}`
            }}
        >
            <div className="flex justify-between items-center p-4 text-white">
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <img className="h-10 w-10 object-contain" src={icono} alt={`${red} icon`} />
                </div>

                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-xs font-bold tracking-widest opacity-80">{red}</div>
                    <div className="text-3xl font-bold">{seguidores}</div>
                </div>

                <div className="flex flex-col items-center">
                    <span className="icon-[ph--arrow-up] h-8 w-8 animate-bounce"></span>
                    <span className="text-xs font-semibold">+{rise || 0}%</span>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
                style={{
                    background: `linear-gradient(90deg, rgba(255,255,255,0.7) ${isHovered ? '100%' : '0%'}, transparent 0%)`,
                }}
            ></div>
        </div>
    );
};

export default SeguidoresRed;