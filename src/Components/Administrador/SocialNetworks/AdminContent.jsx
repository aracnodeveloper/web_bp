import React, { useState } from 'react';
import { useContent } from '../../../hooks/useContent';

const AdminContent = () => {
    const { items, loading, createItem, updateItem, deleteItem, uploadImage } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        image: '',
        profileUrl: '',
        url: '',
        location: '',
        orderIndex: 0,
        type: 'instagram',
        isActive: true,
    });

    const platforms = [
        {
            value: 'instagram',
            label: 'Instagram',
            icon: 'icon-[mdi--instagram]',
            color: 'text-[#dd2a7b]',
            bgColor: 'bg-pink-100',
            borderColor: 'border-pink-200'
        },
        {
            value: 'facebook',
            label: 'Facebook',
            icon: 'icon-[ri--facebook-fill]',
            color: 'text-[#3b5998]',
            bgColor: 'bg-blue-100',
            borderColor: 'border-blue-200'
        },
        {
            value: 'tiktok',
            label: 'TikTok',
            icon: 'icon-[mingcute--tiktok-fill]',
            color: 'text-black',
            bgColor: 'bg-gray-100',
            borderColor: 'border-gray-200'
        },
        {
            value: 'youtube',
            label: 'YouTube',
            icon: 'icon-[mdi--youtube]',
            color: 'text-[#c4302b]',
            bgColor: 'bg-red-100',
            borderColor: 'border-red-200'
        },
        {
            value: 'linkedin',
            label: 'LinkedIn',
            icon: 'icon-[akar-icons--linkedinv2-fill]',
            color: 'text-[#0e76a8]',
            bgColor: 'bg-cyan-100',
            borderColor: 'border-cyan-200'
        },
        {
            value: 'twitter',
            label: 'Twitter/X',
            icon: 'icon-[ph--x-logo-bold]',
            color: 'text-black',
            bgColor: 'bg-slate-100',
            borderColor: 'border-slate-200'
        },
    ];

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                description: item.description,
                date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
                image: item.image,
                profileUrl: item.profileUrl,
                url: item.url,
                location: item.location || '',
                orderIndex: item.orderIndex,
                type: item.type,
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                image: '',
                profileUrl: '',
                url: '',
                location: '',
                orderIndex: items.length,
                type: 'instagram',
                isActive: true,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            const imageUrl = await uploadImage(file);
            setFormData(prev => ({ ...prev, image: imageUrl }));
        } catch (error) {
            alert('Error al subir la imagen');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...formData,
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
        if (window.confirm('¿Estás seguro de eliminar esta publicación?')) {
            try {
                await deleteItem(id);
            } catch (error) {
                alert('Error al eliminar');
            }
        }
    };

    const filteredItems = filterType === 'all'
        ? items
        : items.filter(item => item.type === filterType);

    const sortedItems = [...filteredItems].sort((a, b) => b.orderIndex - a.orderIndex);

    const getPlatformInfo = (type) => {
        return platforms.find(p => p.value === type) || platforms[0];
    };

    if (loading && items.length === 0) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Contenido de Redes Sociales</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Gestiona las publicaciones destacadas de tus redes sociales
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                >
                    <span className="icon-[material-symbols--add] h-5 w-5"></span>
                    Agregar Publicación
                </button>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        filterType === 'all'
                            ? 'bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <span className="icon-[heroicons--squares-2x2] inline-block h-4 w-4 mr-1"></span>
                    Todos ({items.length})
                </button>
                {platforms.map((platform) => (
                    <button
                        key={platform.value}
                        onClick={() => setFilterType(platform.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                            filterType === platform.value
                                ? 'bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <span className={`${platform.icon} inline-block h-4 w-4 mr-1  ${filterType === platform.value ? 'text-white' : platform.color}`}></span>
                        {platform.label} ({items.filter(i => i.type === platform.value).length})
                    </button>
                ))}
            </div>

            {/* Grid de publicaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedItems.map((item) => {
                    const platformInfo = getPlatformInfo(item.type);
                    return (
                        <div
                            key={item.id}
                            className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden border-l-4 ${platformInfo.borderColor}`}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center p-3 bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <span className={`${platformInfo.icon} h-5 w-5 ${platformInfo.color}`}></span>
                                    <span className="text-sm font-medium text-gray-700">{platformInfo.label}</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded ${
                                    item.isActive
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                }`}>
                  {item.isActive ? 'Activo' : 'Inactivo'}
                </span>
                            </div>

                            {/* Imagen */}
                            {item.image && (
                                <div className="relative h-48 bg-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Contenido */}
                            <div className="p-3">
                                <h3 className="font-semibold text-base mb-1 line-clamp-1">{item.title}</h3>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                                {item.date && (
                                    <p className="text-xs text-gray-500 mb-2">
                                        📅 {new Date(item.date).toLocaleDateString('es-ES')}
                                    </p>
                                )}

                                <div className="flex gap-2 text-xs text-gray-500 mb-3">
                                    <span>Orden: {item.orderIndex}</span>
                                    {item.location && <span>📍 {item.location}</span>}
                                </div>

                                {/* Botones */}
                                <div className="flex gap-2 pt-3 border-t">
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
                    <span className="icon-[heroicons--photo-slash] h-16 w-16 mx-auto mb-4 opacity-50"></span>
                    <p>No hay publicaciones en esta categoría</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingItem ? 'Editar Publicación' : 'Nueva Publicación'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Red Social *
                                        </label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                            required
                                        >
                                            {platforms.map((platform) => (
                                                <option  key={platform.value} value={platform.value}>
                                                   {platform.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fecha de Publicación *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        @Usuario/Nombre de usuario *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ej: Acabando con los SAYA-JEANS en la Feria Libre"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripción/Mensaje *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="4"
                                        placeholder="Descripción completa de la publicación..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            URL de la Publicación *
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            URL del Perfil *
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.profileUrl}
                                            onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ubicación
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Ej: Cuenca, Ecuador"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        />
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Imagen de la Publicación *
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        disabled={uploadingImage}
                                    />
                                    {uploadingImage && (
                                        <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>
                                    )}
                                    {formData.image && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>



                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={!formData.image}
                                        className="flex-1 bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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

export default AdminContent;