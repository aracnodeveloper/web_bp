import React, { useState, useEffect } from 'react';
import Destacado from './Destacado';
import { useContent } from '../../hooks/useContent';

const Contenido = () => {
    const { items: contentItems, loading } = useContent();
    const [activeTab, setActiveTab] = useState('all');
    const [visiblePosts, setVisiblePosts] = useState([]);

    // Mapear los datos de la API al formato esperado por Destacado
    const allPosts = contentItems
        .filter(item => item.isActive)
        .sort((a, b) => b.orderIndex - a.orderIndex)
        .map(item => ({
            id: item.id,
            fecha: item.date ? new Date(item.date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }) : '',
            iconoRed: getIconByPlatform(item.type),
            colorRed: getColorByPlatform(item.type),
            linkPost: item.url,
            linkPerfil: item.profileUrl,
            imagePost: item.image,
            mensajePost: item.description,
            platform: item.type
        }));

    function getIconByPlatform(platform) {
        const icons = {
            instagram: <span className="icon-[mdi--instagram] h-6 w-6 text-[#dd2a7b]"></span>,
            facebook: <span className="icon-[ri--facebook-fill] h-6 w-6 text-[#3b5998]"></span>,
            tiktok: <span className="icon-[mingcute--tiktok-fill] h-6 w-6 text-black"></span>,
            youtube: <span className="icon-[mdi--youtube] h-6 w-6 text-[#c4302b]"></span>,
            linkedin: <span className="icon-[akar-icons--linkedinv2-fill] h-6 w-6 text-[#0e76a8]"></span>,
            twitter: <span className="icon-[ph--x-logo-bold] h-6 w-6 text-black"></span>
        };
        return icons[platform] || icons.instagram;
    }

    function getColorByPlatform(platform) {
        const colors = {
            instagram: '#dd2a7b',
            facebook: '#3b5998',
            tiktok: '#000000',
            youtube: '#c4302b',
            linkedin: '#0e76a8',
            twitter: '#000000'
        };
        return colors[platform] || '#000000';
    }

    useEffect(() => {
        if (activeTab === 'all') {
            setVisiblePosts(allPosts);
        } else {
            setVisiblePosts(allPosts.filter(post => post.platform === activeTab));
        }
    }, [activeTab, contentItems]);

    const platforms = [
        { id: 'all', name: 'Todo', icon: <span className="icon-[heroicons--squares-2x2] h-5 w-5"></span> },
        { id: 'instagram', name: 'Instagram', icon: <span className="icon-[mdi--instagram] h-5 w-5 text-[#dd2a7b]"></span> },
        { id: 'facebook', name: 'Facebook', icon: <span className="icon-[ri--facebook-fill] h-5 w-5 text-[#3b5998]"></span> },
        { id: 'tiktok', name: 'TikTok', icon: <span className="icon-[mingcute--tiktok-fill] h-5 w-5"></span> },
        { id: 'youtube', name: 'YouTube', icon: <span className="icon-[mdi--youtube] h-5 w-5 text-[#c4302b]"></span> },
        { id: 'linkedin', name: 'LinkedIn', icon: <span className="icon-[akar-icons--linkedinv2-fill] h-5 w-5 text-[#0e76a8]"></span> },
        { id: 'twitter', name: 'Twitter', icon: <span className="icon-[ph--x-logo-bold] h-5 w-5"></span> }
    ];

    if (loading) {
        return (
            <div className="bg-gray-50 py-8" id="contenido">
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-500">Cargando contenido...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-8" id="contenido">
            <div id='explora' className='flex flex-col gap-6 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full'>
                <div className="mb-6">
                    <h2 className='text-2xl font-semibold'>Explora mi contenido</h2>
                    <p className='text-gray-500 text-sm'>
                        ¡Descubre mi esencia en cada publicación! Sumérgete en el universo digital
                        que he creado para ti. ¡Bienvenido a mi selección de contenido!
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {platforms.map(platform => (
                        <button
                            key={platform.id}
                            onClick={() => setActiveTab(platform.id)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${
                                activeTab === platform.id
                                    ? 'bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {platform.icon}
                            <span>{platform.name}</span>
                        </button>
                    ))}
                </div>

                {visiblePosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {visiblePosts.map(post => (
                            <Destacado
                                key={post.id}
                                fecha={post.fecha}
                                iconoRed={post.iconoRed}
                                colorRed={post.colorRed}
                                linkPost={post.linkPost}
                                linkPerfil={post.linkPerfil}
                                imagePost={post.imagePost}
                                mensajePost={post.mensajePost}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <span className="icon-[heroicons--photo-slash] h-16 w-16 mx-auto mb-4 opacity-50"></span>
                        <p>No hay publicaciones disponibles en esta categoría</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contenido;