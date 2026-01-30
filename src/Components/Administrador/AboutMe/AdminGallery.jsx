import React, { useState } from 'react';
import { useGallery } from '../../../hooks/useGallery';

const AdminGallery = () => {
    const { items, loading, createItem, updateItem, deleteItem } = useGallery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [filterType, setFilterType] = useState('todos');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        date: '',
        orderIndex: 0,
        type: 'television',
        isActive: true,
    });

    const mediaTypes = [
        { value: 'television', label: 'Televisión', icon: 'icon-[heroicons--tv]', color: 'bg-purple-100 text-purple-700' },
        { value: 'prensa', label: 'Prensa', icon: 'icon-[heroicons--newspaper]', color: 'bg-blue-100 text-blue-700' },
        { value: 'radio', label: 'Radio', icon: 'icon-[heroicons--radio]', color: 'bg-green-100 text-green-700' },
        { value: 'digital', label: 'Digital', icon: 'icon-[heroicons--device-phone-mobile]', color: 'bg-orange-100 text-orange-700' },
    ];

    const extractYouTubeId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    // Extraer el ID de video de Facebook de diferentes formatos de URL
    const extractFacebookVideoId = (url) => {
        // Formato: /videos/880822674680269
        const videosMatch = url.match(/\/videos\/(\d+)/);
        if (videosMatch) return videosMatch[1];

        // Formato: ?v=880822674680269 o &v=880822674680269
        const vParamMatch = url.match(/[?&]v=(\d+)/);
        if (vParamMatch) return vParamMatch[1];

        // Formato: fb.watch/xxx/ - necesita resolverse diferente
        // Para fb.watch, intentamos extraer cualquier número largo que parezca un ID
        const fbWatchMatch = url.match(/fb\.watch\/([A-Za-z0-9]+)/);
        if (fbWatchMatch) {
            // fb.watch URLs son acortadas, no podemos extraer el ID directamente
            // Retornamos null para manejar de forma diferente
            return null;
        }

        return null;
    };

    const convertToEmbedUrl = (url) => {
        if (!url) return '';

        // Si ya es embed de YouTube, retornar
        if (url.includes('youtube.com/embed/')) return url;

        // Si ya es plugin de Facebook, retornar
        if (url.includes('plugins/video.php')) return url;

        // Si es Facebook
        if (url.includes('facebook.com') || url.includes('fb.watch')) {
            // Para URLs de fb.watch, usamos la URL original codificada
            // ya que son redirecciones y el plugin de Facebook las maneja
            const videoUrl = encodeURIComponent(url);
            return `https://www.facebook.com/plugins/video.php?href=${videoUrl}&show_text=false&width=560`;
        }

        // Si es YouTube, convertir a embed
        const videoId = extractYouTubeId(url);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return url;
    };

    // Detectar si es un video de Facebook
    const isFacebookVideo = (url) => {
        return url && (url.includes('facebook.com') || url.includes('fb.watch'));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-EC', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                description: item.description,
                url: item.url,
                date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
                orderIndex: item.orderIndex,
                type: item.type,
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                description: '',
                url: '',
                date: '',
                orderIndex: items.length,
                type: 'television',
                isActive: true,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...formData,
                url: convertToEmbedUrl(formData.url),
                date: formData.date ? new Date(formData.date).toISOString() : null,
            };

            if (editingItem) {
                await updateItem(editingItem.id, dataToSend);
            } else {
                await createItem(dataToSend);
            }

            handleCloseModal();
        } catch (error) {
            alert('Error al guardar');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta entrevista?')) {
            try {
                await deleteItem(id);
            } catch (error) {
                alert('Error al eliminar');
            }
        }
    };

    const filteredItems = filterType === 'todos'
        ? items
        : items.filter(item => item.type === filterType);

    const sortedItems = [...filteredItems].sort((a, b) => a.orderIndex - b.orderIndex);

    if (loading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Entrevistas & Medios</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Gestiona las entrevistas en diferentes medios de comunicación
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                >
                    <span className="icon-[material-symbols--add] h-5 w-5"></span>
                    Agregar Entrevista
                </button>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilterType('todos')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        filterType === 'todos'
                            ? 'bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Todos ({items.length})
                </button>
                {mediaTypes.map((type) => {
                    const count = items.filter(item => item.type === type.value).length;
                    return (
                        <button
                            key={type.value}
                            onClick={() => setFilterType(type.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                                filterType === type.value
                                    ? 'bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <span className={`${type.icon} h-4 w-4`}></span>
                            {type.label} ({count})
                        </button>
                    );
                })}
            </div>

            {/* Grid de items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item) => {
                    const mediaType = mediaTypes.find(t => t.value === item.type);
                    return (
                        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Video Preview */}
                            <div className="aspect-video bg-gray-100">
                                <iframe
                                    src={convertToEmbedUrl(item.url)}
                                    title={item.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
                                    {mediaType && (
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${mediaType.color} flex items-center gap-1 ml-2 whitespace-nowrap`}>
                                            <span className={`${mediaType.icon} h-3 w-3`}></span>
                                            {mediaType.label}
                                        </span>
                                    )}
                                </div>

                                {item.description && (
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
                                )}

                                {item.date && (
                                    <p className="text-xs text-gray-500">
                                        {formatDate(item.date)}
                                    </p>
                                )}

                                <div className="flex gap-2 mt-4 pt-4 border-t">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="flex-1 text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center gap-1 py-1"
                                    >
                                        <span className="icon-[material-symbols--edit] h-4 w-4"></span>
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex-1 text-red-600 hover:text-red-800 text-sm flex items-center justify-center gap-1 py-1"
                                    >
                                        <span className="icon-[material-symbols--delete] h-4 w-4"></span>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {sortedItems.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <span className="icon-[heroicons--video-camera-slash] h-16 w-16 mx-auto mb-4 opacity-50"></span>
                    <p>No hay entrevistas en esta categoría</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingItem ? 'Editar Entrevista' : 'Nueva Entrevista'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Título *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ej: Entrevista en UNSION TV"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripción
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                        placeholder="Breve descripción de la entrevista..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha de la Entrevista
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        URL del Video *
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        placeholder="https://www.youtube.com/watch?v=... o URL de Facebook"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Acepta URLs de YouTube y Facebook. Se convertirá automáticamente al formato embed.
                                    </p>

                                    {/* Preview del video */}
                                    {formData.url && (
                                        <div className="mt-3">
                                            <p className="text-xs text-gray-600 mb-2">Vista previa:</p>
                                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                                <iframe
                                                    src={convertToEmbedUrl(formData.url)}
                                                    title="Preview"
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            {isFacebookVideo(formData.url) && (
                                                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                                    <span className="icon-[heroicons--information-circle] h-4 w-4"></span>
                                                    Nota: La vista previa de Facebook puede no mostrarse aquí, pero funcionará en la página pública.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tipo de Medio *
                                        </label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                            required
                                        >
                                            {mediaTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Orden
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.orderIndex}
                                            onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors"
                                    >
                                        {editingItem ? 'Actualizar' : 'Crear'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGallery;