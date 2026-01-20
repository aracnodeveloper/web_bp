import React, { useState } from 'react';
import { useAboutMe } from '../../../hooks/useAboutMe';
import { IconSelector } from '../../Global/iconSelector'; // Importar el componente

const AdminGoals = () => {
    const { items, loading, createItem, updateItem, deleteItem, uploadImage } = useAboutMe('goals');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        icon: '',
        image: '',
        url: '',
        location: '',
        orderIndex: 0,
        type: 'goals',
        isActive: true,
    });
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                description: item.description,
                date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
                icon: item.icon || '',
                image: item.image || '',
                url: item.url || '',
                location: item.location || '',
                orderIndex: item.orderIndex,
                type: 'goals',
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                description: '',
                date: '',
                icon: '',
                image: '',
                url: '',
                location: '',
                orderIndex: items.length,
                type: 'goals',
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
        if (window.confirm('¿Estás seguro de eliminar este elemento?')) {
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
                <h2 className="text-xl font-semibold text-gray-800">Historia & Logros</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                >
                    <span className="icon-[material-symbols--add] h-5 w-5"></span>
                    Agregar Logro
                </button>
            </div>

            {/* Lista de items */}
            <div className="space-y-4">
                {items
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {item.icon && (
                                            <span className={`${item.icon} h-6 w-6 text-[#96c121]`}></span>
                                        )}
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                    {item.date && (
                                        <p className="text-gray-500 text-xs">
                                            Fecha: {new Date(item.date).toLocaleDateString()}
                                        </p>
                                    )}
                                    {item.location && (
                                        <p className="text-gray-500 text-xs">Lugar: {item.location}</p>
                                    )}
                                </div>

                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-24 object-cover rounded-lg ml-4"
                                    />
                                )}
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                >
                                    <span className="icon-[material-symbols--edit] h-4 w-4"></span>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                                >
                                    <span className="icon-[material-symbols--delete] h-4 w-4"></span>
                                    Eliminar
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
                                {editingItem ? 'Editar Logro' : 'Nuevo Logro'}
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fecha
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

                                {/* IconSelector reemplaza el input de texto */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Icono
                                    </label>
                                    <IconSelector
                                        value={formData.icon}
                                        onChange={(value) => setFormData({ ...formData, icon: value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Selecciona un icono para representar este logro
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ubicación
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        URL (opcional)
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Imagen
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        disabled={uploadingImage}
                                    />
                                    {uploadingImage && <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>}
                                    {formData.image && (
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="mt-2 w-32 h-32 object-cover rounded-lg"
                                        />
                                    )}
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

export default AdminGoals;