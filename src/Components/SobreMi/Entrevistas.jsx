import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from 'react';
import Slider from "react-slick";
import { X, ExternalLink, Share2, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useGallery } from "../../hooks/useGallery";

const CustomNextArrow = (props) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white h-8 w-8 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            onClick={props.onClick}>
            <ChevronRight className="h-4 w-4" />
        </div>
    );
};

const CustomPrevArrow = (props) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 left-3 z-10 cursor-pointer rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white h-8 w-8 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            onClick={props.onClick}>
            <ChevronLeft className="h-4 w-4" />
        </div>
    );
};

const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Función para detectar la plataforma de la URL
const detectSocialPlatform = (url) => {
    if (!url) return null;

    const urlLower = url.toLowerCase();

    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
        return {
            name: 'YouTube',
            icon: 'icon-[mdi--youtube]',
            color: 'bg-red-600',
            textColor: 'text-red-600'
        };
    }
    if (urlLower.includes('facebook.com') || urlLower.includes('fb.com')) {
        return {
            name: 'Facebook',
            icon: 'icon-[mdi--facebook]',
            color: 'bg-blue-600',
            textColor: 'text-blue-600'
        };
    }
    if (urlLower.includes('instagram.com')) {
        return {
            name: 'Instagram',
            icon: 'icon-[mdi--instagram]',
            color: 'bg-gradient-to-r from-purple-600 to-pink-600',
            textColor: 'text-pink-600'
        };
    }
    if (urlLower.includes('tiktok.com')) {
        return {
            name: 'TikTok',
            icon: 'icon-[ic--baseline-tiktok]',
            color: 'bg-black',
            textColor: 'text-black'
        };
    }
    if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
        return {
            name: 'X',
            icon: 'icon-[ri--twitter-x-fill]',
            color: 'bg-gray-900',
            textColor: 'text-gray-900'
        };
    }
    if (urlLower.includes('vimeo.com')) {
        return {
            name: 'Vimeo',
            icon: 'icon-[mdi--vimeo]',
            color: 'bg-blue-500',
            textColor: 'text-blue-500'
        };
    }
    if (urlLower.includes('dailymotion.com')) {
        return {
            name: 'Dailymotion',
            icon: 'icon-[simple-icons--dailymotion]',
            color: 'bg-blue-700',
            textColor: 'text-blue-700'
        };
    }

    return {
        name: 'Video',
        icon: 'icon-[heroicons--play-circle]',
        color: 'bg-gray-600',
        textColor: 'text-gray-600'
    };
};

const VideoModal = ({ video, onClose, onNext, onPrev, hasNext, hasPrev }) => {
    const platform = detectSocialPlatform(video.url);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                url: video.url.replace('embed/', 'watch?v=')
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(video.url.replace('embed/', 'watch?v='))
                .then(() => alert('Link copiado al portapapeles'));
        }
    };

    const openOriginalVideo = () => {
        window.open(video.url.replace('embed/', 'watch?v='), '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                >
                    <X className="h-6 w-6 text-gray-700" />
                </button>

                {hasPrev && (
                    <button
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 rounded-full p-2"
                    >
                        <ChevronLeft className="h-8 w-8 text-gray-800" />
                    </button>
                )}
                {hasNext && (
                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/50 hover:bg-white/70 rounded-full p-2"
                    >
                        <ChevronRight className="h-8 w-8 text-gray-800" />
                    </button>
                )}

                <div className="w-full aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="p-6 flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{video.title}</h3>
                            {platform && (
                                <span className={`${platform.color} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                                    <span className={`${platform.icon} h-4 w-4`}></span>
                                    {platform.name}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <p className="text-gray-600 text-sm">Medio: {video.mediaType}</p>
                            {video.date && (
                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    <span>{video.date}</span>
                                </div>
                            )}
                        </div>
                        {video.description && (
                            <p className="text-gray-500 text-sm mt-2">{video.description}</p>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 ml-4">
                        <button
                            onClick={openOriginalVideo}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm"
                        >
                            <ExternalLink className="h-4 w-4" />
                            <span>Ver en plataforma</span>
                        </button>
                        <button
                            onClick={handleShare}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm"
                        >
                            <Share2 className="h-4 w-4" />
                            <span>Compartir</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VideoCard = ({ embedUrl, title, mediaType, description, date, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const platform = detectSocialPlatform(embedUrl);

    return (
        <div
            onClick={onClick}
            className="relative overflow-hidden rounded-lg transition-all duration-300 transform"
            style={{
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-1 rounded-lg shadow-xl">
                <div className="bg-white rounded-md overflow-hidden">
                    <div className="relative">
                        <iframe
                            width="100%"
                            height="180"
                            src={embedUrl}
                            title={title}
                            frameBorder="0"
                            className="rounded-t-md"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white text-xs px-2 py-1 rounded-full">
                            {mediaType}
                        </div>
                        {platform && (
                            <div className={`absolute top-2 left-2 ${platform.color} text-white rounded-full p-1 shadow-lg`} title={platform.name}>
                                <span className={`${platform.icon} h-5 w-5`}></span>
                            </div>
                        )}
                    </div>
                    <div className="p-3 cursor-pointer">
                        <h3 className="font-medium text-gray-800 truncate">{title}</h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {description || 'Medio de comunicación destacado'}
                        </p>
                        {date && (
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                                <Calendar className="h-3 w-3" />
                                <span>{date}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Entrevistas = () => {
    const { items: galleryItems, loading } = useGallery();
    const [activeFilter, setActiveFilter] = useState("todos");
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Mapear los tipos a etiquetas en español
    const typeLabels = {
        television: 'Televisión',
        prensa: 'Prensa',
        radio: 'Radio',
        digital: 'Digital'
    };

    // Filtrar solo items activos
    const activeVideos = galleryItems
        .filter(item => item.isActive)
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map(item => ({
            id: item.id,
            url: item.url,
            title: item.title,
            description: item.description,
            mediaType: typeLabels[item.type] || item.type,
            mediaTypeKey: item.type,
            date: formatDate(item.date),
        }));

    const filteredVideos = activeFilter === "todos"
        ? activeVideos
        : activeVideos.filter(video => video.mediaTypeKey === activeFilter);

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
    };

    const handleNextVideo = () => {
        if (!selectedVideo || filteredVideos.length <= 1) return;

        const currentIndex = filteredVideos.findIndex(v => v.id === selectedVideo.id);
        const nextIndex = (currentIndex + 1) % filteredVideos.length;
        setSelectedVideo(filteredVideos[nextIndex]);
    };

    const handlePrevVideo = () => {
        if (!selectedVideo || filteredVideos.length <= 1) return;

        const currentIndex = filteredVideos.findIndex(v => v.id === selectedVideo.id);
        const prevIndex = (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
        setSelectedVideo(filteredVideos[prevIndex]);
    };

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        dotsClass: "slick-dots custom-dots",
        appendDots: dots => (
            <div>
                <ul className="flex justify-center gap-2 mt-4"> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-blue-400 transition-all duration-300"></div>
        ),
    };

    const filterOptions = [
        { id: "todos", label: "Todos", icon: <span className="icon-[heroicons--squares-2x2] h-5 w-5 mr-1"></span> },
        { id: "prensa", label: "Prensa", icon: <span className="icon-[heroicons--newspaper] h-5 w-5 mr-1"></span> },
        { id: "radio", label: "Radio", icon: <span className="icon-[heroicons--radio] h-5 w-5 mr-1"></span> },
        { id: "television", label: "Televisión", icon: <span className="icon-[heroicons--tv] h-5 w-5 mr-1"></span>},
        { id: "digital", label: "Digitales", icon: <span className="icon-[heroicons--device-phone-mobile] h-5 w-5 mr-1"></span> }
    ];

    if (loading) {
        return <div className="text-center py-8">Cargando entrevistas...</div>;
    }

    return (
        <div id="entrevistas" className="relative overflow-hidden py-4 my-4">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-[#ABC467] rounded-xl -z-10"></div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-1 bg-[#96c121] rounded-full"></div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Impacto en Medios
                        </h2>
                    </div>
                </div>

                <div className="flex gap-2 justify-start md:justify-center mr-5">
                    {filterOptions.map(option => (
                        <button
                            key={option.id}
                            onClick={() => setActiveFilter(option.id)}
                            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeFilter === option.id
                                    ? "bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white shadow-md"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {option.icon}
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-gray-600 text-lg max-w-3xl mb-5" style={{marginTop:"-20px"}}>
                Explora las diversas entrevistas y coberturas mediáticas que destacan la trayectoria de Bernardo Polo Andrade. Su influencia trasciende fronteras y medios.
            </p>

            {filteredVideos.length > 0 ? (
                <div className="px-4">
                    <Slider {...settings}>
                        {filteredVideos.map((video) => (
                            <div key={video.id} className="px-3">
                                <VideoCard
                                    embedUrl={video.url}
                                    title={video.title}
                                    description={video.description}
                                    mediaType={video.mediaType}
                                    date={video.date}
                                    onClick={() => handleVideoSelect(video)}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-600">No hay entrevistas disponibles en esta categoría.</p>
                </div>
            )}

            {selectedVideo && (
                <VideoModal
                    video={selectedVideo}
                    onClose={handleCloseModal}
                    onNext={handleNextVideo}
                    onPrev={handlePrevVideo}
                    hasNext={filteredVideos.length > 1}
                    hasPrev={filteredVideos.length > 1}
                />
            )}
        </div>
    );
};

export default Entrevistas;