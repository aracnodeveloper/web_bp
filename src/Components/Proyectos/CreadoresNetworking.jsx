import React, { useEffect, useState, useCallback, memo } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { PROJECT_TYPES } from '../../types/projectTypes';
import { socialIconMap } from './creadores/creators-data';
import { getVisibleInfluencers, getResponsiveDisplayCount } from './creadores/creators-utils';

const SocialLink = memo(({ link }) => {
    const platformInfo = socialIconMap[link.type.toLowerCase()] || socialIconMap['default'];
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                group relative rounded-2xl
                w-14 h-14
                flex items-center justify-center
                ${platformInfo.color}
                text-white
                hover:scale-125 hover:rotate-6
                transition-all duration-300
                shadow-xl hover:shadow-2xl
                ring-2 ring-white/20 hover:ring-white/40
            `}
        >
            <span className={`${platformInfo.icon} w-7 h-7 group-hover:scale-110 transition-transform`}></span>
        </a>
    );
});

const InfluencerCard = memo(({ influencer, onClick }) => (
    <div
        className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-gray-200/50"
        onClick={() => onClick(influencer)}
    >
        {/* Badge decorativo */}
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#96c121] to-[#7ba01a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            Ver perfil
        </div>

        <div className="relative overflow-hidden">
            <img
                src={influencer.image}
                alt={influencer.name}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

            {/* Contenido superpuesto */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{influencer.name}</h3>
                <p className="text-sm opacity-90 line-clamp-2 drop-shadow-md">
                    {influencer.description}
                </p>
            </div>
        </div>

        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
));

const VideoThumbnail = memo(({ video }) => (
    <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
    >
        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
                src={video.image}
                alt={video.name}
                className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
            />
            {/* Overlay con play button */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-5 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <span className="icon-[ph--play-fill] w-8 h-8 text-[#96c121]"></span>
                </div>
            </div>
            {/* Título del video */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-white text-sm font-semibold line-clamp-2">{video.name}</p>
            </div>
        </div>
    </a>
));

const CreatorsNetworking = () => {
    const { projects: influencersData, loading, getProjectWithRelations } = useProjects(PROJECT_TYPES.CREADORES_NETWORKING);

    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [influencerDetails, setInfluencerDetails] = useState(null);
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const [displayCount, setDisplayCount] = useState(4);
    const [activeModalTab, setActiveModalTab] = useState('biography');
    const [selectedInfluencerIndex, setSelectedInfluencerIndex] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const modalTabs = [
        { id: 'biography', label: 'Biografía', icon: 'icon-[heroicons--user-circle]' },
        { id: 'socialMedia', label: 'Redes Sociales', icon: 'icon-[heroicons--share]' },
        { id: 'videos', label: 'Videos', icon: 'icon-[heroicons--play-circle]' }
    ];

    const handlePrevious = useCallback(() => {
        setCurrentCarouselIndex((prevIndex) =>
            prevIndex === 0 ? influencersData.length - 1 : prevIndex - 1
        );
    }, [influencersData.length]);

    const handleNext = useCallback(() => {
        setCurrentCarouselIndex((prevIndex) =>
            prevIndex === influencersData.length - 1 ? 0 : prevIndex + 1
        );
    }, [influencersData.length]);

    const openModal = useCallback(async (influencer) => {
        const index = influencersData.findIndex(item => item.id === influencer.id);
        setSelectedInfluencer(influencer);
        setSelectedInfluencerIndex(index);
        setActiveModalTab('biography');

        setLoadingDetails(true);
        try {
            const details = await getProjectWithRelations(influencer.id);
            setInfluencerDetails(details);
        } catch (error) {
            console.error('Error loading influencer details:', error);
        } finally {
            setLoadingDetails(false);
        }
    }, [influencersData, getProjectWithRelations]);

    const closeModal = useCallback(() => {
        setSelectedInfluencer(null);
        setSelectedInfluencerIndex(null);
        setInfluencerDetails(null);
    }, []);

    const navigateToPreviousInfluencer = useCallback(async () => {
        if (selectedInfluencerIndex === null) return;

        const newIndex = selectedInfluencerIndex === 0
            ? influencersData.length - 1
            : selectedInfluencerIndex - 1;

        const newInfluencer = influencersData[newIndex];
        setSelectedInfluencer(newInfluencer);
        setSelectedInfluencerIndex(newIndex);

        setLoadingDetails(true);
        try {
            const details = await getProjectWithRelations(newInfluencer.id);
            setInfluencerDetails(details);
        } catch (error) {
            console.error('Error loading influencer details:', error);
        } finally {
            setLoadingDetails(false);
        }
    }, [selectedInfluencerIndex, influencersData, getProjectWithRelations]);

    const navigateToNextInfluencer = useCallback(async () => {
        if (selectedInfluencerIndex === null) return;

        const newIndex = selectedInfluencerIndex === influencersData.length - 1
            ? 0
            : selectedInfluencerIndex + 1;

        const newInfluencer = influencersData[newIndex];
        setSelectedInfluencer(newInfluencer);
        setSelectedInfluencerIndex(newIndex);

        setLoadingDetails(true);
        try {
            const details = await getProjectWithRelations(newInfluencer.id);
            setInfluencerDetails(details);
        } catch (error) {
            console.error('Error loading influencer details:', error);
        } finally {
            setLoadingDetails(false);
        }
    }, [selectedInfluencerIndex, influencersData, getProjectWithRelations]);

    useEffect(() => {
        const handleResize = () => {
            setDisplayCount(getResponsiveDisplayCount());
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (selectedInfluencer) {
                if (event.key === 'Escape') {
                    closeModal();
                } else if (event.key === 'ArrowLeft') {
                    navigateToPreviousInfluencer();
                } else if (event.key === 'ArrowRight') {
                    navigateToNextInfluencer();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedInfluencer, closeModal, navigateToPreviousInfluencer, navigateToNextInfluencer]);

    const renderModalContent = () => {
        if (loadingDetails) {
            return (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#96c121] border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Cargando contenido...</p>
                </div>
            );
        }

        switch (activeModalTab) {
            case 'biography':
                return (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-[#96c121]/10 to-transparent border-l-4 border-[#96c121] pl-6 py-4 rounded-r-lg">
                            <p className="text-gray-800 text-lg leading-relaxed italic">
                                "{selectedInfluencer.bio || selectedInfluencer.description}"
                            </p>
                        </div>
                    </div>
                );
            case 'socialMedia':
                return (
                    <div className="py-8">
                        {influencerDetails?.social && influencerDetails.social.length > 0 ? (
                            <div className="flex justify-center flex-wrap gap-6">
                                {influencerDetails.social
                                    .filter(link => link.isActive)
                                    .map((link) => (
                                        <SocialLink key={link.id} link={link} />
                                    ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <span className="icon-[heroicons--link-slash] w-16 h-16 text-gray-300 mx-auto mb-4"></span>
                                <p className="text-gray-500">No hay redes sociales disponibles</p>
                            </div>
                        )}
                    </div>
                );
            case 'videos':
                return influencerDetails?.videos && influencerDetails.videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {influencerDetails.videos
                            .filter(video => video.isActive)
                            .map((video) => (
                                <VideoThumbnail key={video.id} video={video} />
                            ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <span className="icon-[heroicons--video-camera-slash] w-16 h-16 text-gray-300 mx-auto mb-4"></span>
                        <p className="text-gray-500">No hay videos disponibles</p>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="w-full py-8 min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#96c121] border-t-transparent"></div>
                    <p className="mt-6 text-gray-600 font-medium text-lg">Cargando creadores...</p>
                </div>
            </div>
        );
    }

    if (!influencersData || influencersData.length === 0) {
        return (
            <div className="w-full py-8 min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center py-12">
                    <span className="icon-[heroicons--user-group] w-20 h-20 text-gray-300 mx-auto mb-4"></span>
                    <p className="text-gray-600 text-lg">No hay creadores disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-16 -mb-60 min-h-screen ">
            <div className="container mx-auto px-4">
                {/* Header mejorado */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-transparent to-[#96c121] rounded-full"></div>
                        <span className="icon-[heroicons--users] w-8 h-8 text-[#96c121]"></span>
                        <div className="w-12 h-1 bg-gradient-to-l from-transparent to-[#005F6B] rounded-full"></div>
                    </div>
                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#005F6B] via-[#96c121] to-[#005F6B] mb-4 tracking-tight">
                        Creadores & Networking
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Descubre la red de creadores de contenido y colaboradores que forman parte de nuestra comunidad
                    </p>
                </div>

                {/* Carrusel mejorado */}
                <div className="flex items-center justify-center gap-6 mb-12">
                    <button
                        onClick={handlePrevious}
                        aria-label="Previous Influencers"
                        className="group rounded-full bg-gradient-to-br from-[#96c121] to-[#7ba01a] text-white p-3 hover:scale-110 hover:shadow-2xl transition-all duration-300 w-14 h-14 flex items-center justify-center ring-4 ring-[#96c121]/20"
                    >
                        <span className="icon-[material-symbols--arrow-back-ios-new] h-6 w-6 group-hover:-translate-x-1 transition-transform"></span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 flex-1 max-w-7xl">
                        {getVisibleInfluencers(influencersData, currentCarouselIndex, displayCount).map((influencer) => (
                            <InfluencerCard
                                key={influencer.id}
                                influencer={influencer}
                                onClick={openModal}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        aria-label="Next Influencers"
                        className="group rounded-full bg-gradient-to-br from-[#005F6B] to-[#004a54] text-white p-3 hover:scale-110 hover:shadow-2xl transition-all duration-300 w-14 h-14 flex items-center justify-center ring-4 ring-[#005F6B]/20"
                    >
                        <span className="icon-[material-symbols--arrow-forward-ios] h-6 w-6 group-hover:translate-x-1 transition-transform"></span>
                    </button>
                </div>

                {/* Modal mejorado */}
                {selectedInfluencer && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="influencer-modal-title"
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-in fade-in duration-300 "
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-3xl w-full max-w-4xl mx-auto overflow-hidden shadow-2xl transform transition-all duration-300 max-h-[95vh] flex flex-col relative animate-in zoom-in-95 duration-300 w-[650px] h-[850px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Botones de navegación del modal */}
                            <button
                                onClick={navigateToPreviousInfluencer}
                                aria-label="Perfil anterior"
                                className="absolute top-1/2 left-0 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full w-8 h-8 flex items-center justify-center transition-all shadow-lg hover:scale-110 hover:shadow-xl"
                            >
                                <span className="icon-[material-symbols--arrow-back-ios-new] h-4 w-4 text-gray-800"></span>
                            </button>

                            <button
                                onClick={navigateToNextInfluencer}
                                aria-label="Perfil siguiente"
                                className="absolute top-1/2 right-0 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full w-8 h-8 flex items-center justify-center transition-all shadow-lg hover:scale-110 hover:shadow-xl"
                            >
                                <span className="icon-[material-symbols--arrow-forward-ios] h-4 w-4 text-gray-800"></span>
                            </button>

                            {/* Header del modal con imagen */}
                            <div className="relative  flex-shrink-0">
                                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={selectedInfluencer.image}
                                        alt={selectedInfluencer.name}
                                        className="w-full h-[50vh] object-contain mx-auto"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <h2 id="influencer-modal-title" className="text-5xl font-black mb-3 drop-shadow-lg">
                                        {selectedInfluencer.name}
                                    </h2>
                                    <p className="text-xl opacity-90 drop-shadow-md">{selectedInfluencer.description}</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    aria-label="Close Modal"
                                    className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/30 transition-all text-white hover:rotate-90 duration-300 shadow-lg"
                                >
                                    <span className="icon-[heroicons--x-mark] w-6 h-6"></span>
                                </button>
                            </div>

                            {/* Tabs mejorados */}
                            <div className="flex justify-center border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                {modalTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveModalTab(tab.id)}
                                        className={`
                                            group flex items-center gap-2 px-8 py-4 
                                            text-base font-bold
                                            transition-all duration-300
                                            ${activeModalTab === tab.id
                                            ? 'border-b-4 border-[#96c121] text-[#96c121] bg-white'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <span className={`${tab.icon} w-5 h-5 ${activeModalTab === tab.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}></span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Contenido del modal */}
                            <div className="p-10 overflow-y-auto flex-grow bg-gradient-to-br from-white to-gray-50">
                                {renderModalContent()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatorsNetworking;