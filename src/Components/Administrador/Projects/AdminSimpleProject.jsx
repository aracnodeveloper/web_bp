import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';

const AdminSimpleProject = ({ projectType, title }) => {
    const { projects, loading, createProject, updateProject, deleteProject, uploadImage } = useProjects(projectType);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        bio: '',
        date: '',
        image: '',
        profileUrl: '',
        url: '',
        location: '',
        orderIndex: 0,
        type: projectType,
        isActive: true,
    });
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                description: item.description,
                bio: item.bio || '',
                date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
                image: item.image || '',
                profileUrl: item.profileUrl || '',
                url: item.url,
                location: item.location || '',
                orderIndex: item.orderIndex,
                type: projectType,
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                description: '',
                bio: '',
                date: '',
                image: '',
                profileUrl: '',
                url: '',
                location: '',
                orderIndex: projects.length,
                type: projectType,
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
                date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
            };

            if (editingItem) {
                await updateProject(editingItem.id, dataToSend);
            } else {
                await createProject(dataToSend);
            }

            handleCloseModal();
        } catch (error) {
            alert('Error al guardar');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
            try {
                await deleteProject(id);
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
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                >
                    <span className="icon-[material-symbols--add] h-5 w-5"></span>
                    Agregar Proyecto
                </button>
            </div>

            {/* Grid de proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {item.image && (
                            <div className="h-48 bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-4">
                            <h3 className="font-semibold text-base mb-2">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                {item.description}
                            </p>

                            <div className="text-xs text-gray-500 space-y-1">
                                {item.location && (
                                    <p>📍 {item.location}</p>
                                )}
                                {item.url && (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#96c121] hover:underline block truncate"
                                    >
                                        🔗 Ver enlace
                                    </a>
                                )}
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
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingItem ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mensaje/Descripción *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ubicación *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Cuenca, Ecuador"
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
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        URL del enlace *
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        placeholder="https://instagram.com/..."
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
                                    {uploadingImage && <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>}
                                    {formData.image && (
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="mt-2 w-full h-48 object-cover rounded-lg"
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

export default AdminSimpleProject;