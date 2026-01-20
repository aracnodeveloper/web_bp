import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { useSocialLinks } from '../../../hooks/useSocialLinks';
import { useVideos } from '../../../hooks/useVideos';
import { PROJECT_TYPES } from '../../../types/projectTypes';
import { SOCIAL_TYPES } from '../../../interfaces/project';

const AdminCreadoresNetworking = () => {
    const { projects, loading, createProject, updateProject, deleteProject, uploadImage } = useProjects(PROJECT_TYPES.CREADORES_NETWORKING);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeTab, setActiveTab] = useState('info'); // info, social, videos

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
        type: PROJECT_TYPES.CREADORES_NETWORKING,
        isActive: true,
    });

    const [uploadingImage, setUploadingImage] = useState(false);

    // Social Links
    const { socialLinks, createSocialLink, updateSocialLink, deleteSocialLink } = useSocialLinks(editingItem?.id);
    const [socialFormData, setSocialFormData] = useState({ type: '', url: '' });
    const [editingSocial, setEditingSocial] = useState(null);

    // Videos
    const { videos, createVideo, updateVideo, deleteVideo, uploadVideoImage } = useVideos(editingItem?.id);
    const [videoFormData, setVideoFormData] = useState({ name: '', url: '', image: '' });
    const [editingVideo, setEditingVideo] = useState(null);
    const [uploadingVideoImage, setUploadingVideoImage] = useState(false);

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
                url: item.url || '',
                location: item.location || '',
                orderIndex: item.orderIndex,
                type: PROJECT_TYPES.CREADORES_NETWORKING,
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
                type: PROJECT_TYPES.CREADORES_NETWORKING,
                isActive: true,
            });
        }
        setActiveTab('info');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setSocialFormData({ type: '', url: '' });
        setEditingSocial(null);
        setVideoFormData({ name: '', url: '', image: '' });
        setEditingVideo(null);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Client-side validation
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG, GIF, WebP)');
            e.target.value = '';
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('El archivo es demasiado grande. Tamaño máximo: 5MB');
            e.target.value = '';
            return;
        }

        try {
            setUploadingImage(true);
            const imageUrl = await uploadImage(file);
            setFormData(prev => ({ ...prev, image: imageUrl }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(error.message || 'Error al subir la imagen');
            e.target.value = '';
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.description) {
            alert('Por favor completa el nombre y la descripción');
            return;
        }

        if (!formData.image) {
            alert('Por favor sube una imagen de perfil');
            return;
        }

        try {
            const dataToSend = {
                ...formData,
                date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
            };

            if (editingItem) {
                await updateProject(editingItem.id, dataToSend);
                alert('Creador actualizado exitosamente');
            } else {
                const newProject = await createProject(dataToSend);
                setEditingItem(newProject);
                setActiveTab('social');
                alert('Creador creado exitosamente. Ahora puedes agregar redes sociales y videos.');
            }
        } catch (error) {
            console.error('Error saving creator:', error);
            alert(error.message || 'Error al guardar el creador');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este creador?')) {
            try {
                await deleteProject(id);
            } catch (error) {
                alert('Error al eliminar');
            }
        }
    };

    // Social Links handlers
    const handleSocialSubmit = async (e) => {
        e.preventDefault();
        if (!editingItem) {
            alert('Primero debes crear el creador antes de agregar redes sociales');
            return;
        }

        // Validate fields
        if (!socialFormData.type || !socialFormData.url) {
            alert('Por favor completa todos los campos de la red social');
            return;
        }

        // Validate URL format
        try {
            new URL(socialFormData.url);
        } catch (err) {
            alert('Por favor ingresa una URL válida');
            return;
        }

        try {
            const data = {
                influencersId: editingItem.id,
                url: socialFormData.url,
                type: socialFormData.type,
                orderIndex: socialLinks.length,
                isActive: true
            };

            if (editingSocial) {
                await updateSocialLink(editingSocial.id, data);
                alert('Red social actualizada exitosamente');
            } else {
                await createSocialLink(data);
                alert('Red social agregada exitosamente');
            }

            setSocialFormData({ type: '', url: '' });
            setEditingSocial(null);
        } catch (error) {
            console.error('Error saving social link:', error);
            alert(error.message || 'Error al guardar la red social');
        }
    };

    const handleEditSocial = (social) => {
        setEditingSocial(social);
        setSocialFormData({ type: social.type, url: social.url });
    };

    const handleCancelSocial = (social) => {
        setEditingSocial(null);
        setSocialFormData({type: '', url: ''});
    }

    const handleDeleteSocial = async (id) => {
        if (window.confirm('¿Eliminar esta red social?')) {
            try {
                await deleteSocialLink(id);
            } catch (error) {
                alert('Error al eliminar');
            }
        }
    };

    // Videos handlers
    const handleVideoImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Client-side validation
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG, GIF, WebP)');
            e.target.value = '';
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('El archivo es demasiado grande. Tamaño máximo: 5MB');
            e.target.value = '';
            return;
        }

        try {
            setUploadingVideoImage(true);
            const imageUrl = await uploadVideoImage(file);
            setVideoFormData(prev => ({ ...prev, image: imageUrl }));
        } catch (error) {
            console.error('Error uploading video image:', error);
            alert(error.message || 'Error al subir la miniatura del video');
            e.target.value = '';
        } finally {
            setUploadingVideoImage(false);
        }
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        if (!editingItem) return;

        try {
            const data = {
                influencersId: editingItem.id,
                name: videoFormData.name,
                url: videoFormData.url,
                image: videoFormData.image,
                orderIndex: videos.length,
                isActive: true
            };

            if (editingVideo) {
                await updateVideo(editingVideo.id, data);
            } else {
                await createVideo(data);
            }

            setVideoFormData({ name: '', url: '', image: '' });
            setEditingVideo(null);
        } catch (error) {
            alert('Error al guardar video');
        }
    };

    const handleEditVideo = (video) => {
        setEditingVideo(video);
        setVideoFormData({ name: video.name, url: video.url, image: video.image });
    };

    const handleCancelVideo = () => {
        setEditingVideo(null);
        setVideoFormData({ name: '', url: '', image: '' });
    };
    const handleDeleteVideo = async (id) => {
        if (window.confirm('¿Eliminar este video?')) {
            try {
                await deleteVideo(id);
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
                <h2 className="text-xl font-semibold text-gray-800">Creadores/Networking</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
                >
                    <span className="icon-[material-symbols--add] h-5 w-5"></span>
                    Agregar Creador
                </button>
            </div>

            {/* Grid de creadores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {projects.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {item.image && (
                            <div className="h-64 bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-4">
                            <h3 className="font-semibold text-base mb-1">{item.name}</h3>
                            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                                {item.description}
                            </p>

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
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className='flex justify-between'>
                                <h3 className="text-xl font-semibold mb-4">
                                    {editingItem ? 'Editar Creador' : 'Nuevo Creador'}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className=" text-[#96c121] px-1 rounded-lg hover:text-[#7fa519] transition-colors flex items-center "
                                >
                                    <span className="icon-[material-symbols--close-small] h-5 w-5"></span>
                                </button>
                            </div>
                            {/* Tabs */}
                            <div className="border-b border-gray-200 mb-4">
                                <nav className="flex space-x-4">
                                    <button
                                        onClick={() => setActiveTab('info')}
                                        className={`py-2 px-4 ${activeTab === 'info' ? 'border-b-2 border-[#96c121] text-[#96c121]' : 'text-gray-500'}`}
                                    >
                                        Información
                                    </button>
                                    {editingItem && (
                                        <>
                                            <button
                                                onClick={() => setActiveTab('social')}
                                                className={`py-2 px-4 ${activeTab === 'social' ? 'border-b-2 border-[#96c121] text-[#96c121]' : 'text-gray-500'}`}
                                            >
                                                Redes Sociales ({socialLinks.length})
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('videos')}
                                                className={`py-2 px-4 ${activeTab === 'videos' ? 'border-b-2 border-[#96c121] text-[#96c121]' : 'text-gray-500'}`}
                                            >
                                                Videos ({videos.length})
                                            </button>
                                        </>
                                    )}
                                </nav>
                            </div>

                            {/* Info Tab */}
                            {activeTab === 'info' && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Rol/Descripción *
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows="2"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Biografía
                                        </label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Imagen de perfil *
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            disabled={uploadingImage}
                                        />
                                        {uploadingImage && <p className="text-sm text-gray-500 mt-1">Subiendo...</p>}
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
                                            className="flex-1 bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519]"
                                        >
                                            {editingItem ? 'Actualizar' : 'Crear y continuar'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Social Tab */}
                            {activeTab === 'social' && editingItem && (
                                <div className="space-y-4">
                                    <form onSubmit={handleSocialSubmit} className="bg-gray-50 p-4 rounded-lg space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Tipo *
                                                </label>
                                                <select
                                                    value={socialFormData.type}
                                                    onChange={(e) => setSocialFormData({ ...socialFormData, type: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    required
                                                >
                                                    <option value="">Seleccionar</option>
                                                    <option value={SOCIAL_TYPES.FACEBOOK}>Facebook</option>
                                                    <option value={SOCIAL_TYPES.INSTAGRAM}>Instagram</option>
                                                    <option value={SOCIAL_TYPES.TWITTER}>Twitter/X</option>
                                                    <option value={SOCIAL_TYPES.TIKTOK}>TikTok</option>
                                                    <option value={SOCIAL_TYPES.YOUTUBE}>YouTube</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    URL *
                                                </label>
                                                <input
                                                    type="url"
                                                    value={socialFormData.url}
                                                    onChange={(e) => setSocialFormData({ ...socialFormData, url: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={`${editingSocial ? 'flex flex-wrap justify-between gap-4': 'flex '}`}>
                                            <button
                                                type="submit"
                                                className={`${editingSocial ? 'w-2/5 ': 'w-full '}  bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519]`}
                                            >
                                                {editingSocial ? 'Actualizar' : 'Agregar Red Social'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelSocial}
                                                className={`${editingSocial ? 'w-2/5' : 'hidden w-full'} bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400`}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>

                                    <div className="space-y-2">
                                        {socialLinks.map((social) => (
                                            <div key={social.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium capitalize">{social.type}</span>
                                                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm truncate max-w-xs">
                                                        {social.url}
                                                    </a>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditSocial(social)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <span className="icon-[material-symbols--edit] h-5 w-5"></span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSocial(social.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <span className="icon-[material-symbols--delete] h-5 w-5"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Videos Tab */}
                            {activeTab === 'videos' && editingItem && (
                                <div className="space-y-4">
                                    <form onSubmit={handleVideoSubmit} className="bg-gray-50 p-4 rounded-lg space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Título *
                                            </label>
                                            <input
                                                type="text"
                                                value={videoFormData.name}
                                                onChange={(e) => setVideoFormData({ ...videoFormData, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                URL del video *
                                            </label>
                                            <input
                                                type="url"
                                                value={videoFormData.url}
                                                onChange={(e) => setVideoFormData({ ...videoFormData, url: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Miniatura *
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleVideoImageUpload}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                disabled={uploadingVideoImage}
                                            />
                                            {uploadingVideoImage && <p className="text-sm text-gray-500 mt-1">Subiendo...</p>}
                                            {videoFormData.image && (
                                                <img src={videoFormData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
                                            )}
                                        </div>
                                        <div className={`${editingVideo ? 'flex flex-wrap justify-between gap-4 ': 'flex '}`}>
                                            <button
                                                type="submit"
                                                className={`${editingVideo ? 'w-2/5 ': 'w-full '}   bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519]`}
                                            >
                                                {editingVideo ? 'Actualizar' : 'Agregar Video'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelVideo}
                                                className={`${editingVideo ? 'w-2/5' : 'hidden w-full'}  bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400`}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>

                                    <div className="grid grid-cols-3 gap-4">
                                        {videos.map((video) => (
                                            <div key={video.id} className="border rounded-lg overflow-hidden">
                                                <img src={video.image} alt={video.name} className="w-full h-32 object-cover" />
                                                <div className="p-2">
                                                    <p className="text-sm font-medium truncate">{video.name}</p>
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={() => handleEditVideo(video)}
                                                            className="flex-1 text-blue-600 text-xs"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteVideo(video.id)}
                                                            className="flex-1 text-red-600 text-xs"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCreadoresNetworking;