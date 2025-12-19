import React, { useState, useRef } from 'react';
import {
    Share2,
    ChevronLeft,
    ChevronRight,
    X,
    ExternalLink,
    Copy,
    Twitter,
    Facebook,
    Linkedin,
    Mail
} from 'lucide-react';

const VideoModal = ({
                        videos,
                        initialIndex,
                        onClose
                    }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isCopied, setIsCopied] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const videoRef = useRef(null);
    const shareMenuRef = useRef(null);

    const currentVideo = videos[currentIndex];
    const videoUrl = currentVideo.url.replace('embed/', 'watch?v=');

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % videos.length
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? videos.length - 1 : prevIndex - 1
        );
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(videoUrl)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
                setShowShareOptions(false);
            });
    };

    const openInYouTube = () => {
        window.open(videoUrl, '_blank');
    };

    const toggleShareOptions = () => {
        setShowShareOptions(prev => !prev);
    };

    // Close share menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
                setShowShareOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const shareVia = (platform) => {
        const title = encodeURIComponent(currentVideo.titulo);
        const url = encodeURIComponent(videoUrl);

        let shareUrl;

        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${title}&body=${url}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShowShareOptions(false);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/50 p-4 overflow-hidden"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="relative w-full max-w-4xl bg-white rounded-xl
                   shadow-2xl overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10
                     bg-white/20 hover:bg-white/40 rounded-full
                     p-2 text-white transition-all"
                >
                    <X size={24} />
                </button>

                {videos.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2
                         z-10 bg-gradient-to-r from-[#96c121] to-[#005F6B] hover:opacity-90
                         rounded-full p-2 text-white shadow-lg transition-transform hover:scale-110"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2
                         z-10 bg-gradient-to-r from-[#96c121] to-[#005F6B] hover:opacity-90
                         rounded-full p-2 text-white shadow-lg transition-transform hover:scale-110"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                <div className="w-full h-96 aspect-video bg-black">
                    <iframe
                        ref={videoRef}
                        className="w-full h-full"
                        src={currentVideo.url}
                        title={currentVideo.titulo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                <div className="p-6 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800 relative">
                            {currentVideo.titulo}
                            <span className="block h-0.5 bg-[#005F6B] w-full mt-1"></span>
                        </h2>
                    </div>

                    <p className="text-gray-600">
                        {currentVideo.contenido}
                    </p>

                    <div className="mt-6 flex justify-end">
                        <div className="flex space-x-3">
                            <div className="relative" ref={shareMenuRef}>
                                <button
                                    onClick={toggleShareOptions}
                                    className="px-4 py-2 bg-white border border-[#96c121] text-[#005F6B] rounded-lg
                                    hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <Share2 size={16} /> Compartir
                                </button>

                                {showShareOptions && (
                                    <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-48">
                                        <div className="flex flex-col space-y-1">
                                            <button
                                                onClick={handleCopyLink}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                                            >
                                                <Copy size={16} /> {isCopied ? "¡Copiado!" : "Copiar enlace"}
                                            </button>
                                            <button
                                                onClick={() => shareVia('twitter')}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                                            >
                                                <Twitter size={16} /> Twitter
                                            </button>
                                            <button
                                                onClick={() => shareVia('facebook')}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                                            >
                                                <Facebook size={16} /> Facebook
                                            </button>
                                            <button
                                                onClick={() => shareVia('linkedin')}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                                            >
                                                <Linkedin size={16} /> LinkedIn
                                            </button>
                                            <button
                                                onClick={() => shareVia('email')}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                                            >
                                                <Mail size={16} /> Correo
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={openInYouTube}
                                className="px-4 py-2 bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white rounded-lg
                                hover:opacity-90 transition-colors flex items-center gap-2"
                            >
                                <ExternalLink size={16} /> Ver en plataforma
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
