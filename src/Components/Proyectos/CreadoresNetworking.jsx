import React, { useEffect, useState, useCallback, memo } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { PROJECT_TYPES } from '../../types/projectTypes';
import { socialIconMap } from './creadores/creators-data'; // Mantener el mapa de iconos
import { getVisibleInfluencers, getResponsiveDisplayCount } from './creadores/creators-utils';

const SocialLink = memo(({ link }) => {
    const platformInfo = socialIconMap[link.type.toLowerCase()] || socialIconMap['default'];
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                rounded-full
                w-10 h-10
                flex items-center justify-center
                ${platformInfo.color}
                text-white
                hover:scale-110
                transition-all
                shadow-lg
            `}
        >
            <span className={`${platformInfo.icon} w-8 h-8`}></span>
        </a>
    );
});

const InfluencerCard = memo(({ influencer, onClick }) => (
    <div
        className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
        onClick={() => onClick(influencer)}
    >
        <div className="relative">
            <img
                src={influencer.image}
                alt={influencer.name}
                className="w-full h-64 object-cover"
                loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                <h3 className="text-xl font-bold">{influencer.name}</h3>
                <p className="text-sm opacity-80">{influencer.description.split('\n')[0]}</p>
            </div>
        </div>
    </div>
));

const VideoThumbnail = memo(({ video }) => (
    <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-gray-200 rounded-lg transition-colors"
    >
        <div className="relative overflow-hidden rounded-lg">
            <img
                src={video.image}
                alt={video.name}
                className="w-full h-64 mb-5 object-cover transform hover:scale-110 transition-transform"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-2xl">▶️</span>
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
        { id: 'biography', label: 'Biografía' },
        { id: 'socialMedia', label: 'Redes Sociales' },
        { id: 'videos', label: 'Videos' }
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

        // Cargar detalles con relaciones (social links y videos)
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
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#96c121]"></div>
                    <p className="mt-2 text-gray-600">Cargando...</p>
                </div>
            );
        }

        switch (activeModalTab) {
            case 'biography':
                return (
                    <div className="mb-6 border-l-4 border-[#96c121] pl-4">
                        <p className="text-gray-700 italic text-xl">
                            "{selectedInfluencer.bio || selectedInfluencer.description}"
                        </p>
                    </div>
                );
            case 'socialMedia':
                return (
                    <div className="flex justify-center space-x-6 mb-6">
                        {influencerDetails?.social && influencerDetails.social.length > 0 ? (
                            influencerDetails.social
                                .filter(link => link.isActive)
                                .map((link) => (
                                    <SocialLink key={link.id} link={link} />
                                ))
                        ) : (
                            <p className="text-center text-gray-500">No hay redes sociales disponibles</p>
                        )}
                    </div>
                );
            case 'videos':
                return influencerDetails?.videos && influencerDetails.videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {influencerDetails.videos
                            .filter(video => video.isActive)
                            .map((video) => (
                                <VideoThumbnail key={video.id} video={video} />
                            ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No hay videos disponibles</p>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="w-full py-8 min-h-screen">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#96c121]"></div>
                    <p className="mt-4 text-gray-600">Cargando creadores...</p>
                </div>
            </div>
        );
    }

    if (!influencersData || influencersData.length === 0) {
        return (
            <div className="w-full py-8 min-h-screen">
                <div className="text-center py-12">
                    <p className="text-gray-600">No hay creadores disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-8 -mb-60 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#005F6B] to-[#96c121] mb-4 uppercase">
                        Creadores/Networking
                    </h2>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-12">
                    <button
                        onClick={handlePrevious}
                        aria-label="Previous Influencers"
                        className="rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white p-1 hover:opacity-80 transition-all h-8 w-8"
                    >
                        <span className="icon-[material-symbols--arrow-back-ios-new] h-6 w-6"></span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                        className="rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white p-1 hover:opacity-80 transition-all h-8 w-8"
                    >
                        <span className="icon-[material-symbols--arrow-forward-ios] h-6 w-6"></span>
                    </button>
                </div>

                {selectedInfluencer && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="influencer-modal-title"
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-2xl w-full max-w-3xl mx-auto overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] max-h-[95vh] flex flex-col relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={navigateToPreviousInfluencer}
                                aria-label="Perfil anterior"
                                className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-60 rounded-full w-10 h-10 flex items-center justify-center transition-all text-black"
                            >
                                <span className="icon-[material-symbols--arrow-back-ios-new] h-6 w-6"></span>
                            </button>

                            <button
                                onClick={navigateToNextInfluencer}
                                aria-label="Perfil siguiente"
                                className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-60 rounded-full w-10 h-10 flex items-center justify-center transition-all text-black"
                            >
                                <span className="icon-[material-symbols--arrow-forward-ios] h-6 w-6"></span>
                            </button>

                            <div className="relative h-[300px] flex-shrink-0">
                                <img
                                    src={selectedInfluencer.image}
                                    alt={selectedInfluencer.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                                    <h2 id="influencer-modal-title" className="text-4xl font-bold mb-2">
                                        {selectedInfluencer.name}
                                    </h2>
                                    <p className="text-lg opacity-80">{selectedInfluencer.description}</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    aria-label="Close Modal"
                                    className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-40 transition-all"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="flex justify-center border-b border-gray-200">
                                {modalTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveModalTab(tab.id)}
                                        className={`
                                            px-4 py-2 
                                            text-sm font-medium 
                                            transition-colors duration-300
                                            ${activeModalTab === tab.id
                                            ? 'border-b-2 border-[#96c121] text-[#96c121]'
                                            : 'text-gray-500 hover:text-gray-700'}
                                        `}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-8 overflow-y-auto flex-grow">
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