import { useState, useEffect } from 'react';
import apiService from '../service/apiService';
import {videosApi, uploadImageVideoApi, uploadImageApi} from '../constants/EndpointsRoutes';
import api from "../service/api";

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

            const formData = new FormData();
            formData.append('image', file, file.name);

            // Log FormData contents
            // Determine endpoint
            const endpoint = videoId
                ? `${uploadImageVideoApi}/${videoId}`
                : uploadImageVideoApi;

            console.log("API endpoint:", endpoint);

            // Upload image
            const response = await api.post(uploadImageApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Video image upload response:", response);

            // Validate respons

            console.log("Video image upload successful. URL:", response.data.data.url);
            return response.data.data.url;

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