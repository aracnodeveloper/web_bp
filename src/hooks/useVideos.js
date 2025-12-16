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
            const formData = new FormData();
            formData.append('image', file);

            const url = videoId
                ? `${uploadImageVideoApi}/${videoId}`
                : uploadImageVideoApi;

            const response = await apiService.create(url, formData);
            return response.data.url;
        } catch (err) {
            console.error('Error uploading video image:', err);
            throw err;
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