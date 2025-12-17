import React, { useState } from 'react';

const Destacado = ({ fecha, linkPost, imagePost, mensajePost, linkPerfil, iconoRed, colorRed }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleVisitProfile = (e) => {
        e.stopPropagation();
        window.open(linkPerfil, '_blank');
    };

    const handleVisitPost = () => {
        window.open(linkPost, '_blank');
    };

    const getTitle = (message) => {
        if (!message) return '';
        const firstLine = message.split('\n')[0];
        return firstLine.length > 60 ? firstLine.substring(0, 57) + '...' : firstLine;
    };

    return (
        <div className='w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col'>

            <div className='flex justify-between items-center p-4 border-l-4' style={{ borderLeftColor: colorRed }}>
                <div className='flex flex-col'>
                    <div className='font-semibold'>Bernardo Polo Polito</div>
                    <div className='text-xs text-gray-500'>{fecha}</div>
                </div>
                <div className='flex items-center justify-center' onClick={handleVisitProfile}>
                    {iconoRed}
                </div>
            </div>

            <div
                className='relative cursor-pointer'
                onClick={handleVisitPost}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    className='w-full h-96 object-cover'
                    src={imagePost}
                    alt="Post content"
                />
            </div>

            <div className='p-4 flex-grow'>
                <h3 className='font-medium line-clamp-2 mb-1'>{getTitle(mensajePost)}</h3>
                <p className='text-xs text-gray-500 line-clamp-2'>{mensajePost}</p>
            </div>

            <div className='flex justify-between items-center p-3 border-t border-gray-100'>
                <button
                    className='text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1'
                    onClick={handleVisitPost}
                >
                    Ver más
                </button>
                <button
                    className='text-xs px-4 py-1 rounded-full'
                    style={{
                        backgroundColor: 'white',
                        color: colorRed,
                        border: `1px solid ${colorRed}`
                    }}
                    onClick={handleVisitProfile}
                >
                    Seguir
                </button>
            </div>
        </div>
    );
};

export default Destacado;
