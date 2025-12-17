import React, { useState } from 'react';
import { useText } from '../../../hooks/useText';

const AdminSobreMi = () => {
    const { items, loading, createItem, updateItem, deleteItem } = useText('sobre-mi');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '',
        type: 'sobre-mi',
        isActive: true,
    });

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || '',
                description: item.description || '',
                icon: item.icon || '',
                type: 'sobre-mi',
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                description: '',
                icon: '',
                type: 'sobre-mi',
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
        if (window.confirm('¿Estás seguro de eliminar este texto?')) {
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

    if (loading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Textos Sobre Mí</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Gestiona los textos biográficos que aparecen en la sección "Sobre Mí" (Introducción)
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                >
                    <span className="icon-[material-symbols--add] h-5 w-5"></span>
                    Agregar Texto
                </button>
            </div>

            {/* Vista previa de cómo se verá */}
            {items.filter(item => item.isActive).length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <span className="icon-[material-symbols--visibility] h-5 w-5"></span>
                        Vista Previa - Textos Activos
                    </h3>
                    <div className="space-y-3">
                        {items
                            .filter(item => item.isActive)
                            .map((item) => (
                                <p key={item.id} className="text-justify text-gray-700 text-sm">
                                    {item.description}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )}

            {/* Lista de textos */}
            <div className="space-y-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    {item.title ? (
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                    ) : (
                                        <h3 className="font-semibold text-lg text-gray-400 italic">Sin título</h3>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                                    <span>Creado: {new Date(item.createdAt).toLocaleDateString()}</span>
                                    {item.updatedAt !== item.createdAt && (
                                        <span>Actualizado: {new Date(item.updatedAt).toLocaleDateString()}</span>
                                    )}
                                    <span className={`px-2 py-1 rounded ${
                                        item.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {item.isActive ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-3 whitespace-pre-wrap">
                            {item.description}
                        </p>

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
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <span className="icon-[material-symbols--text-fields] h-16 w-16 mx-auto mb-4 opacity-50"></span>
                    <p>No hay textos configurados para "Sobre Mí"</p>
                    <p className="text-sm mt-2">Agrega el primer texto haciendo clic en el botón superior</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingItem ? 'Editar Texto Biográfico' : 'Nuevo Texto Biográfico'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Título de Referencia (opcional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ej: Párrafo 1 - Introducción"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        El título es solo para identificación administrativa, no se muestra al público
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Texto Biográfico *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="8"
                                        placeholder="Escribe aquí el texto que aparecerá en la sección Sobre Mí..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Este texto aparecerá en la sección de Introducción junto a tu fotografía
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Icono (clase CSS - opcional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        placeholder="icon-[material-symbols--person]"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Clase CSS del icono (opcional, actualmente no se muestra en el diseño)
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="mr-2 h-4 w-4 text-[#96c121] focus:ring-[#96c121] border-gray-300 rounded"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        Mostrar este texto (activo)
                                    </label>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                                    <p className="text-xs text-yellow-800">
                                        <strong>💡 Consejo:</strong> Puedes crear múltiples párrafos.
                                        Solo los marcados como "activos" se mostrarán en la página.
                                        Los textos se mostrarán en el orden en que fueron creados.
                                    </p>
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

export default AdminSobreMi;