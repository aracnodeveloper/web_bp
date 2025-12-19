import React, { useState } from 'react';
import { useSocials } from '../../../hooks/useMetrics';

const AdminSocials = () => {
    const { items, loading, createItem, updateItem, deleteItem } = useSocials();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        followers: 0,
        url: '',
        orderIndex: 0,
        rise: 0,
        type: 'instagram',
        isActive: true,
    });

    const socialTypes = [
        { value: 'instagram', label: 'Instagram', color: '#e33f72', icon: 'icon-[mdi--instagram]' },
        { value: 'facebook', label: 'Facebook', color: '#35758a', icon: 'icon-[ri--facebook-fill]' },
        { value: 'tiktok', label: 'TikTok', color: '#60605f', icon: 'icon-[mingcute--tiktok-fill]' },
        { value: 'youtube', label: 'YouTube', color: '#e6231c', icon: 'icon-[mdi--youtube]' },
        { value: 'twitter', label: 'Twitter/X', color: '#000000', icon: 'icon-[ph--x-logo-bold]' },
        { value: 'linkedin', label: 'LinkedIn', color: '#0e76a8', icon: 'icon-[akar-icons--linkedinv2-fill]' },
    ];

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                followers: item.followers,
                url: item.url,
                orderIndex: item.orderIndex || 0,
                rise: item.rise || 0,
                type: item.type,
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                followers: 0,
                url: '',
                orderIndex: items.length,
                rise: 0,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...formData,
                followers: parseFloat(formData.followers),
                rise: parseFloat(formData.rise),
                orderIndex: parseInt(formData.orderIndex),
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
        if (window.confirm('¿Estás seguro de eliminar esta red social?')) {
            try {
                await deleteItem(id);
            } catch (error) {
                alert('Error al eliminar');
            }
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const getSocialInfo = (type) => {
        return socialTypes.find(s => s.value === type) || socialTypes[0];
    };

    const totalFollowers = items.reduce((sum, item) => sum + item.followers, 0);

    if (loading && items.length === 0) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div>
            {/* Header con totales */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Redes Sociales & Seguidores</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Gestiona las métricas de seguidores de cada red social
                        </p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                    >
                        <span className="icon-[material-symbols--add] h-5 w-5"></span>
                        Agregar Red Social
                    </button>
                </div>

                {/* Total card */}
                <div className="bg-gradient-to-r from-[#005F6B] to-[#96c121] text-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Total de Seguidores</p>
                            <p className="text-4xl font-bold">{formatNumber(totalFollowers)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm opacity-90">Redes Activas</p>
                            <p className="text-3xl font-bold">{items.filter(i => i.isActive).length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid de redes sociales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items
                    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                    .map((item) => {
                        const socialInfo = getSocialInfo(item.type);
                        return (
                            <div
                                key={item.id}
                                className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                                style={{ backgroundColor: socialInfo.color }}
                            >
                                <div className="flex justify-between items-center p-4 text-white">
                                    <span  className={`${socialInfo.icon} text-3xl`}></span>

                                    <div className="flex flex-col items-center justify-center flex-1">
                                        <div className="text-xs font-bold tracking-widest opacity-80 mb-1">
                                            @{item.title}
                                        </div>
                                        <div className="text-3xl font-bold">
                                            {formatNumber(item.followers)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="icon-[ph--arrow-up] h-6 w-6"></span>
                                        <span className="text-xs font-semibold">+{item.rise || 0}%</span>
                                    </div>
                                </div>

                                {/* Estado */}
                                <div className="absolute top-0 left-0">
                                  <span className={`text-xs px-2 py-1 rounded ${
                                      item.isActive
                                          ? 'bg-green-500 text-white'
                                          : 'bg-gray-500 text-white'
                                  }`}>
                                        {item.isActive ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-2 p-2 bg-black bg-opacity-20">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm py-1 rounded flex items-center justify-center gap-1"
                                    >
                                        <span className="icon-[material-symbols--edit] h-4 w-4"></span>
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex-1 bg-red-500 bg-opacity-70 hover:bg-opacity-90 text-white text-sm py-1 rounded flex items-center justify-center gap-1"
                                    >
                                        <span className="icon-[material-symbols--delete] h-4 w-4"></span>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {items.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <span className="icon-[heroicons--user-group-slash] h-16 w-16 mx-auto mb-4 opacity-50"></span>
                    <p>No hay redes sociales configuradas</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingItem ? 'Editar Red Social' : 'Nueva Red Social'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de Red Social *
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    >
                                        {socialTypes.map((type) => (
                                            <option  key={type.value} value={type.value}>
                                                 {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre/Título *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ej: INST/FANPAGE"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Seguidores (en miles) *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={formData.followers}
                                            onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                                            placeholder="135.5"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Ejemplo: 135.5 para 135.5K seguidores
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Crecimiento (%) *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={formData.rise}
                                            onChange={(e) => setFormData({ ...formData, rise: e.target.value })}
                                            placeholder="5.2"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        URL del Perfil *
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
                                        Orden de Visualización
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.orderIndex}
                                        onChange={(e) => setFormData({ ...formData, orderIndex: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    />
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

export default AdminSocials;