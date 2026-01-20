import React, { useState } from 'react';
import { useText } from '../../../hooks/useText';

const AdminPortada = () => {
    const { items, loading, createItem, updateItem, deleteItem,uploadImage } = useText('portada');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        phrase: '',
        image: '',
        icon: '',
        type: 'portada',
        isActive: true,
        orderIndex: 0,
    });
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || '',
                description: item.description,
                phrase: item.phrase,
                image: item.image || '',
                icon: item.icon || '',
                type: 'portada',
                isActive: item.isActive,
                orderIndex: item.orderIndex,
            });
        } else {
            setEditingItem(null);

            setFormData({
                title: '',
                description: '',
                phrase: '',
                image: '',
                icon: '',
                type: 'portada',
                isActive: true,
                orderIndex: items.length,
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
        if (window.confirm('¿Estás seguro de eliminar este slide?')) {
            try {
                await deleteItem(id);
            } catch (error) {
                alert('Error al eliminar');
            }
        }
    };

    const handleToggleActive = async (item) => {
        try {
            await updateItem(item.id, {
                ...item,
                isActive: !item.isActive,
            });
        } catch (error) {
            alert('Error al cambiar estado');
        }
    };

    const handleMoveUp = async (item, index) => {
        if (index === 0) return;
        const sortedItems = [...items].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
        const prevItem = sortedItems[index - 1];

        try {
            await updateItem(item.id, { ...item, orderIndex: prevItem.orderIndex });
            await updateItem(prevItem.id, { ...prevItem, orderIndex: item.orderIndex });
        } catch (error) {
            alert('Error al reordenar');
        }
    };

    const handleMoveDown = async (item, index) => {
        const sortedItems = [...items].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
        if (index === sortedItems.length - 1) return;
        const nextItem = sortedItems[index + 1];

        try {
            await updateItem(item.id, { ...item, orderIndex: nextItem.orderIndex });
            await updateItem(nextItem.id, { ...nextItem, orderIndex: item.orderIndex });
        } catch (error) {
            alert('Error al reordenar');
        }
    };

    if (loading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    const sortedItems = [...items].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    const activeSlides = sortedItems.filter(item => item.isActive);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Slider de Portada (Cabecera)</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Gestiona las diapositivas que aparecen en la página de inicio
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                >
                    <span className="icon-[material-symbols--add] h-5 w-5"></span>
                    Agregar Slide
                </button>
            </div>



            {/* Lista de slides */}
            <div className="space-y-4">
                {sortedItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex gap-4">
                            {/* Imagen preview */}
                            {item.image && (
                                <div className="w-24 h-24 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                            )}

                            {/* Contenido */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg">
                                                {item.title || <span className="text-gray-400 italic">Sin título</span>}
                                            </h3>
                                            <span className={`text-xs px-2 py-1 rounded ${
                                                item.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {item.isActive ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </div>
                                        {item.phrase && (
                                            <p className="text-sm text-gray-600 italic mt-1">"{item.phrase}"</p>
                                        )}
                                        {item.description && (
                                            <p className="text-sm text-gray-700 mt-2">{item.description}</p>
                                        )}
                                    </div>

                                    {/* Controles de orden */}
                                    <div className="flex gap-1 ml-2">
                                        <button
                                            onClick={() => handleMoveUp(item, index)}
                                            disabled={index === 0}
                                            className={`p-1 rounded ${
                                                index === 0
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span className="icon-[material-symbols--arrow-upward] h-5 w-5"></span>
                                        </button>
                                        <button
                                            onClick={() => handleMoveDown(item, index)}
                                            disabled={index === sortedItems.length - 1}
                                            className={`p-1 rounded ${
                                                index === sortedItems.length - 1
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span className="icon-[material-symbols--arrow-downward] h-5 w-5"></span>
                                        </button>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 mb-3">
                                    Orden: {item.orderIndex || 0} | Creado: {new Date(item.createdAt).toLocaleDateString()}
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-2 pt-3 border-t">
                                    <button
                                        onClick={() => handleToggleActive(item)}
                                        className={`text-sm flex items-center gap-1 px-3 py-1 rounded ${
                                            item.isActive
                                                ? 'text-orange-600 hover:text-orange-800 bg-orange-50'
                                                : 'text-green-600 hover:text-green-800 bg-green-50'
                                        }`}
                                    >
                                        <span className={`${
                                            item.isActive
                                                ? 'icon-[material-symbols--visibility-off]'
                                                : 'icon-[material-symbols--visibility]'
                                        } h-4 w-4`}></span>
                                        {item.isActive ? 'Desactivar' : 'Activar'}
                                    </button>
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
                        </div>
                    </div>
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <span className="icon-[material-symbols--slideshow] h-16 w-16 mx-auto mb-4 opacity-50"></span>
                    <p>No hay slides configurados para la portada</p>
                    <p className="text-sm mt-2">Agrega el primer slide haciendo clic en el botón superior</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingItem ? 'Editar Slide de Portada' : 'Nuevo Slide de Portada'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Título (líneas separadas con Enter) *
                                    </label>
                                    <textarea
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        rows="3"
                                        placeholder="Hacker del Turismo&#10;Emprendedor disruptivo&#10;Bloguero"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Cada línea se mostrará como un elemento separado
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Frase Destacada *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.phrase}
                                        onChange={(e) => setFormData({ ...formData, phrase: e.target.value })}
                                        placeholder="Se cuenta una historia, que debe ser interesante, atractiva y que perdure con los años."
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripción (opcional)
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="4"
                                        placeholder="Texto descriptivo adicional..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    />
                                </div>



                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-xs text-blue-800">
                                        <strong>💡 Consejos:</strong>
                                    </p>
                                    <ul className="text-xs text-blue-700 mt-2 space-y-1 list-disc list-inside">
                                        <li>Usa imágenes optimizadas (WebP) para mejor rendimiento</li>
                                        <li>El orden de los slides se puede cambiar con las flechas</li>
                                        <li>Solo los slides activos se mostrarán en rotación</li>
                                    </ul>
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

export default AdminPortada;