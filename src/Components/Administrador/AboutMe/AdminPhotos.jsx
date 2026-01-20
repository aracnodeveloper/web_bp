import React, { useState } from 'react';
import { useAboutMe } from '../../../hooks/useAboutMe';

const AdminPhotos = () => {
    const { items, loading, createItem, updateItem, deleteItem, uploadImage } = useAboutMe('photo');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        orderIndex: 0,
        type: 'photo',
        isActive: true,
    });
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                description: item.description,
                image: item.image || '',
                orderIndex: item.orderIndex,
                type: 'photo',
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                description: '',
                image: '',
                orderIndex: items.length,
                type: 'photo',
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
            if (editingItem) {
                await updateItem(editingItem.id, formData);
            } else {
                await createItem(formData);
            }

            handleCloseModal();
        } catch (error) {
            alert('Error al guardar');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta fotografía?')) {
            try {
                await deleteItem(id);
            } catch (error) {
                alert('Error al eliminar');
            }
        }
    };

    if (loading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Galería Fotográfica</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                >
                    <span className="icon-[material-symbols--add] h-5 w-5"></span>
                    Agregar Fotografía
                </button>
            </div>

            {/* Grid de fotos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((item) => (
                        <div
                            key={item.id}
                            className="relative group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                        >
                            <div className="aspect-square bg-gray-100">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="icon-[material-symbols--image] h-16 w-16"></span>
                                    </div>
                                )}
                            </div>

                            <div className="p-3">
                                <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
                                <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                            </div>

                            {/* Overlay con botones */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                >
                                    <span className="icon-[material-symbols--edit] h-5 w-5"></span>
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                                >
                                    <span className="icon-[material-symbols--delete] h-5 w-5"></span>
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingItem ? 'Editar Fotografía' : 'Nueva Fotografía'}
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
                                        placeholder="Ej: Conferencia empresarial"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripción *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="4"
                                        placeholder="Describe el contexto de la fotografía..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Imagen *
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

export default AdminPhotos;