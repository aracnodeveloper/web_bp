const Destacado = ({ fecha, tittle, linkPost, imagePost, mensajePost, linkPerfil, iconoRed, colorRed }) => {

    const handleVisitProfile = (e) => {
        e.stopPropagation();
        window.open(linkPerfil, '_blank');
    };

    const handleVisitPost = () => {
        window.open(linkPost, '_blank');
    };

    const handleShare = async (e) => {
        e.stopPropagation();

        const shareData = {
            title: getTitle(mensajePost),
            text: `Mira esta publicación de ${tittle}`,
            url: linkPost
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copiar al portapapeles
                await navigator.clipboard.writeText(linkPost);
                alert('¡Enlace copiado al portapapeles!');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Error al compartir:', err);
            }
        }
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
                    <div className='font-semibold'>{tittle}</div>
                    <div className='text-xs text-gray-500'>{fecha}</div>
                </div>
                <div className='flex items-center justify-center' onClick={handleVisitProfile}>
                    {iconoRed}
                </div>
            </div>

            <div
                className='relative cursor-pointer'
                onClick={handleVisitPost}
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
                <div className='flex items-center gap-2'>
                    <button
                        className='text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1'
                        onClick={handleVisitPost}
                    >
                        Ver más
                    </button>
                    <button
                        className='text-black hover:text-[#96c121] flex items-center justify-center'
                        onClick={handleShare}
                        title='Compartir'
                    >
                        <span className="icon-[heroicons--share] h-4 w-4"></span>
                    </button>
                </div>
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