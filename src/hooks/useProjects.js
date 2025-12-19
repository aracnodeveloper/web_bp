import { useState, useEffect } from 'react';
import apiService from '../service/apiService';
import { influencersApi, uploadImageApi, uploadImageInfluencerApi } from '../constants/EndpointsRoutes';
import api from "../service/api";

export const useProjects = (projectType = null) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await apiService.getAll(influencersApi);

            // Filtrar por tipo si se proporciona
            const filteredProjects = projectType
                ? response.filter(p => p.type === projectType && p.isActive)
                : response.filter(p => p.isActive);

            // Ordenar por orderIndex
            const sortedProjects = filteredProjects.sort((a, b) => a.orderIndex - b.orderIndex);

            setProjects(sortedProjects);
            setError(null);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [projectType]);

    const createProject = async (data) => {
        try {
            const response = await apiService.create(influencersApi, data);
            await fetchProjects();
            return response;
        } catch (err) {
            console.error('Error creating project:', err);
            throw err;
        }
    };

    const updateProject = async (id, data) => {
        try {
            const response = await apiService.update(influencersApi, id, data);
            await fetchProjects();
            return response;
        } catch (err) {
            console.error('Error updating project:', err);
            throw err;
        }
    };

    const deleteProject = async (id) => {
        try {
            await apiService.update(influencersApi, id, { isActive: false });
            await fetchProjects();
        } catch (err) {
            console.error('Error deleting project:', err);
            throw err;
        }
    };

    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            // USAR LA INSTANCIA DE AXIOS CONFIGURADA
            const response = await api.post(uploadImageApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.url;
        } catch (err) {
            console.error('Error uploading image:', err);
            throw err;
        }
    };
    const getProjectWithRelations = async (id) => {
        try {
            const response = await apiService.getById(influencersApi, `${id}/relations`);
            return response;
        } catch (err) {
            console.error('Error fetching project with relations:', err);
            throw err;
        }
    };

    return {
        projects,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        uploadImage,
        getProjectWithRelations
    };
};