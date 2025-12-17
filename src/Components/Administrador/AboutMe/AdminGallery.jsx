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

    const convertToEmbedUrl = (url) => {
        if (!url) return '';

        // Si ya es embed, retornar
        if (url.includes('/embed/')) return url;

        // Si es Facebook
        if (url.includes('facebook.com')) {
            // Si ya es plugin, retornar
            if (url.includes('plugins/video.php')) return url;
            return url;
        }

        // Si es YouTube, convertir a embed
        const videoId = extractYouTubeId(url);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return url;
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                description: item.description,
                url: item.url,
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
                    <span className="icon-[heroicons--squares-2x2] inline-block h-4 w-4 mr-1"></span>
                    Todos ({items.length})
                </button>
                {mediaTypes.map((type) => (
                    <button
                        key={type.value}
                        onClick={() => setFilterType(type.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                            filterType === type.value
                                ? 'bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <span className={`${type.icon} inline-block h-4 w-4 mr-1`}></span>
                        {type.label} ({items.filter(i => i.type === type.value).length})
                    </button>
                ))}
            </div>

            {/* Lista de entrevistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedItems.map((item) => {
                    const typeInfo = mediaTypes.find(t => t.value === item.type);
                    return (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Preview del video */}
                            <div className="relative aspect-video bg-gray-100">
                                <iframe
                                    src={item.url}
                                    title={item.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${typeInfo?.color}`}>
                                    <span className={`${typeInfo?.icon} inline-block h-3 w-3 mr-1`}></span>
                                    {typeInfo?.label}
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-base flex-1">{item.title}</h3>
                                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                                        item.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                    {item.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                                </div>

                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Orden: {item.orderIndex}</span>
                                </div>

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

                                    {formData.url && (
                                        <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                            <iframe
                                                src={convertToEmbedUrl(formData.url)}
                                                title="Preview"
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
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