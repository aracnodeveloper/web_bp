import { useState, useEffect } from 'react';
import apiService from '../service/apiService';
import { videosApi, uploadImageVideoApi } from '../constants/EndpointsRoutes';

export const useVideos = (influencerId = null) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVideos = async () => {
        if (!influencerId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await apiService.getAll(`${videosApi}/influencer/${influencerId}`);
            const sortedVideos = response.sort((a, b) => a.orderIndex - b.orderIndex);
            setVideos(sortedVideos);
            setError(null);
        } catch (err) {
            console.error('Error fetching videos:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [influencerId]);

    const createVideo = async (data) => {
        try {
            const response = await apiService.create(videosApi, data);
            await fetchVideos();
            return response;
        } catch (err) {
            console.error('Error creating video:', err);
            throw err;
        }
    };

    const updateVideo = async (id, data) => {
        try {
            const response = await apiService.update(videosApi, id, data);
            await fetchVideos();
            return response;
        } catch (err) {
            console.error('Error updating video:', err);
            throw err;
        }
    };

    const deleteVideo = async (id) => {
        try {
            await apiService.update(videosApi, id, { isActive: false });
            await fetchVideos();
        } catch (err) {
            console.error('Error deleting video:', err);
            throw err;
        }
    };

    const uploadVideoImage = async (file, videoId = null) => {
        try {
            console.log("=== UPLOADING VIDEO IMAGE ===");
            console.log("File details:", {
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified
            });
            console.log("Video ID:", videoId); 

            // Validate file
            if (!file || !(file instanceof File)) {
                throw new Error('Archivo no válido');
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                throw new Error('Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG, GIF, WebP)');
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                throw new Error('El archivo es demasiado grande. Tamaño máximo: 5MB');
            }

            // Validate videoId if provided
            if (videoId && typeof videoId !== 'string') {
                throw new Error('ID de video no válido');
            }

            // Create FormData
            const formData = new FormData();
            formData.append('image', file, file.name);

            // Log FormData contents
            console.log("FormData entries:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
                if (value instanceof File) {
                    console.log(`  File details: ${value.name}, ${value.type}, ${value.size} bytes`);
                }
            }

            // Determine endpoint
            const endpoint = videoId
                ? `${uploadImageVideoApi}/${videoId}`
                : uploadImageVideoApi;

            console.log("API endpoint:", endpoint);

            // Upload image
            const response = await apiService.create(endpoint, formData);

            console.log("Video image upload response:", response);

            // Validate response
            if (!response) {
                throw new Error('No se recibió respuesta del servidor');
            }

            if (!response.success) {
                throw new Error(response.message || 'Error al subir la miniatura del video');
            }

            if (!response.data?.url) {
                throw new Error('URL de imagen no recibida del servidor');
            }

            console.log("Video image upload successful. URL:", response.data.url);
            return response.data.url;

        } catch (err) {
            console.error("=== VIDEO IMAGE UPLOAD ERROR ===");
            console.error("Error object:", err);
            console.error("Error message:", err?.message);
            console.error("Error response:", err?.response);
            console.error("Error response data:", err?.response?.data);

            // Extract appropriate error message
            let errorMessage = 'Error al subir la miniatura del video';
            if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }

            throw new Error(errorMessage);
        }
    };

    return {
        videos,
        loading,
        error,
        fetchVideos,
        createVideo,
        updateVideo,
        deleteVideo,
        uploadVideoImage
    };
};