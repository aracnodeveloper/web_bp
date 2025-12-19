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
    const platformOrder = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'twitter'];

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
            <div className="bg-gray-50 py-8" id="contenido">
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-500">Cargando contenido...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-8" id="contenido">
            <div id='explora' className='flex flex-col gap-6 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full'>
                <div className="mb-2">
                    <h2 className='text-2xl font-semibold'>Explora mi contenido</h2>
                    <p className='text-gray-500 text-sm'>
                        ¡Descubre mi esencia en cada publicación! Sumérgete en el universo digital
                        que he creado para ti. ¡Bienvenido a mi selección de contenido!
                    </p>
                </div>

                {/* Filtros por cuenta */}
                <div className="flex flex-wrap gap-5 bg-white rounded-lg shadow-sm p-4">
                    {/* Botón "Todo" */}
                    <div className="mb-4">
                        <button
                            onClick={() => setSelectedFilter('all')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                selectedFilter === 'all'
                                    ? 'bg-[#96c121] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <span className="icon-[heroicons--squares-2x2] h-5 w-5"></span>
                            Todo
                        </button>
                    </div>

                    {/* Grupos por tipo de red social */}
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-4  w-[850px]">
                        {platformOrder.map((platformType) => {
                            const accounts = groupedAccounts[platformType];
                            if (!accounts || accounts.length === 0) return null;

                            const firstAccount = accounts[0];

                            return (
                                <div key={platformType} className="flex flex-wrap ">
                                    {/* Header de la plataforma */}
                                    <div className="flex items-center gap-2 text-gray-700 font-medium mt-2">
                                            <span style={{ color: firstAccount.color }}>
                                                {firstAccount.icon}
                                            </span>
                                    </div>

                                    {/* Lista de cuentas */}
                                    <div className="grid grid-cols-2 ">
                                        {accounts.map((acc, idx) => {
                                            const filterKey = `${acc.type}::${acc.title}`;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedFilter(filterKey)}
                                                    className={`w-full text-left px-3  rounded text-md transition-colors font-semibold hover:underline ${
                                                        selectedFilter === filterKey
                                                            ? 'bg-gray-100 text-gray-900 font-medium '
                                                            : 'text-gray-600 hover:bg-gray-50 '
                                                    }`}
                                                >
                                                    @{acc.title}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
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