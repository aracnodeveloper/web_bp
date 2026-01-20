import { useState, useEffect } from 'react';
import Destacado from './Destacado';
import { useContent } from '../../hooks/useContent';

const Contenido = () => {
    const { items: contentItems, loading } = useContent();
    const [selectedFilter, setSelectedFilter] = useState('all');
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
            type: item.type,
            title: item.title
        }));

    function getIconByPlatform(platform) {
        const icons = {
            instagram: <span className="icon-[mdi--instagram] h-5 w-5 text-[#dd2a7b]"></span>,
            facebook: <span className="icon-[ri--facebook-fill] h-5 w-5 text-[#3b5998]"></span>,
            tiktok: <span className="icon-[mingcute--tiktok-fill] h-5 w-5 text-black"></span>,
            youtube: <span className="icon-[mdi--youtube] h-5 w-5 text-[#c4302b]"></span>,
            linkedin: <span className="icon-[akar-icons--linkedinv2-fill] h-5 w-5 text-[#0e76a8]"></span>,
            twitter: <span className="icon-[ph--x-logo-bold] h-5 w-5 text-black"></span>
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

    // Obtener todas las combinaciones únicas de type + title desde el contenido
    const getUniqueAccounts = () => {
        const accountsMap = new Map();

        allPosts.forEach(post => {
            const key = `${post.type}-${post.title}`;
            if (!accountsMap.has(key)) {
                accountsMap.set(key, {
                    type: post.type,
                    title: post.title,
                    icon: post.iconoRed,
                    color: post.colorRed
                });
            }
        });

        // Agrupar por tipo
        const grouped = {};
        accountsMap.forEach(account => {
            if (!grouped[account.type]) {
                grouped[account.type] = [];
            }
            grouped[account.type].push(account);
        });

        return grouped;
    };

    const groupedAccounts = getUniqueAccounts();
    const platformOrder = ['facebook', 'instagram', 'youtube', 'tiktok', 'twitter', 'linkedin'];

    useEffect(() => {
        if (selectedFilter === 'all') {
            setVisiblePosts(allPosts);
        } else {
            // Filtrar por type + title
            const [type, title] = selectedFilter.split('::');
            setVisiblePosts(allPosts.filter(post =>
                post.type === type && post.title === title
            ));
        }
    }, [selectedFilter, contentItems]);

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-8" id="contenido">
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-500">Cargando contenido...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-8" id="contenido">
            <div id='explora' className='flex flex-col gap-6 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full'>
                <div className="mb-2">
                    <h2 className='text-2xl font-semibold'>Explora mi contenido</h2>
                    <p className='text-gray-500 text-sm'>
                        ¡Descubre mi esencia en cada publicación! Sumérgete en el universo digital
                        que he creado para ti. ¡Bienvenido a mi selección de contenido!
                    </p>
                </div>

                {/* Filtros por cuenta */}
                <div className="relative overflow-hidden">
                    <div className="relative">
                        <div className="mb-5 ml-2.5 mt-1">
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className={`group flex items-center gap-3 px-8 py-2 rounded-xl text-base font-bold transition-all duration-300 ${
                                    selectedFilter === 'all'
                                        ? 'bg-gradient-to-r from-[#96c121] to-[#7ba01a] text-white shadow-2xl shadow-[#96c121]/40 scale-105 ring-4 ring-[#96c121]/20'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#96c121]/30 hover:shadow-xl hover:scale-105'
                                }`}
                            >
                                <span className={`icon-[heroicons--squares-2x2] h-6 w-6 transition-transform group-hover:rotate-12 ${selectedFilter === 'all' ? '' : 'text-[#96c121]'}`}></span>
                                <span>Mostrar Todo</span>
                                {selectedFilter === 'all' && (
                                    <span className="ml-auto icon-[heroicons--check-circle-solid] h-5 w-5"></span>
                                )}
                            </button>
                        </div>

                        {/* Grupos por tipo de red social */}
                        <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                            {platformOrder.map((platformType) => {
                                const accounts = groupedAccounts[platformType];
                                if (!accounts || accounts.length === 0) return null;

                                const firstAccount = accounts[0];

                                return (
                                    <div
                                        key={platformType}
                                        className="group bg-white/80 backdrop-blur-sm rounded-xl p-2 border-2 border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                    >
                                        {/* Header de la plataforma */}
                                        <div className="flex items-center gap-3 mb-4  border-b-2 border-gray-100">
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3"
                                                style={{ backgroundColor: `${firstAccount.color}15` }}
                                            >
                                                <span style={{ color: firstAccount.color }}>
                                                    {firstAccount.icon}
                                                </span>
                                            </div>
                                            <span className="text-base font-bold text-gray-800 capitalize w-20">
                                                {platformType}
                                            </span>
                                            <div className="flex flex-wrap gap-1">
                                            {accounts.map((acc, idx) => {
                                                const filterKey = `${acc.type}::${acc.title}`;
                                                const isSelected = selectedFilter === filterKey;

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setSelectedFilter(filterKey)}
                                                        className={`group/btn  text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                                            isSelected
                                                                ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg shadow-gray-900/30 scale-105'
                                                                : 'text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-md'
                                                        }`}
                                                    >
                                                        <span className="flex items-center justify-between">
                                                            <span className="flex items-center gap-2">
                                                                <span
                                                                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                                                                        isSelected ? 'bg-white' : 'bg-transparent group-hover/btn:bg-gray-400'
                                                                    }`}
                                                                ></span>
                                                                <span className="text-xs opacity-70">@</span>
                                                                <span>{acc.title}</span>
                                                            </span>

                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        </div>

                                        {/* Lista de cuentas */}

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* Grid de publicaciones */}
                {visiblePosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {visiblePosts.map(post => (
                            <Destacado
                                key={post.id}
                                tittle={post.title}
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
                        <p>No hay publicaciones disponibles para esta cuenta</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contenido;