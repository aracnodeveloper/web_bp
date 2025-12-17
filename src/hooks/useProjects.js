import { useState, useEffect } from 'react';
import apiService from '../service/apiService';
import { influencersApi, uploadImageApi, uploadImageInfluencerApi } from '../constants/EndpointsRoutes';

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

    const uploadImage = async (file, projectId = null) => {
        try {
            console.log("=== UPLOADING PROJECT IMAGE ===");
            console.log("File details:", {
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified
            });
            console.log("Project ID:", projectId);

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

            // Validate projectId if provided
            if (projectId && typeof projectId !== 'string') {
                throw new Error('ID de proyecto no válido');
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
            const endpoint = projectId
                ? `${uploadImageInfluencerApi}/${projectId}`
                : uploadImageApi;

            console.log("API endpoint:", endpoint);

            // Upload image
            const response = await apiService.create(endpoint, formData);

            console.log("Image upload response:", response);

            // Validate response
            if (!response) {
                throw new Error('No se recibió respuesta del servidor');
            }

            if (!response.success) {
                throw new Error(response.message || 'Error al subir la imagen');
            }

            if (!response.data?.url) {
                throw new Error('URL de imagen no recibida del servidor');
            }

            console.log("Image upload successful. URL:", response.data.url);
            return response.data.url;

        } catch (err) {
            console.error("=== PROJECT IMAGE UPLOAD ERROR ===");
            console.error("Error object:", err);
            console.error("Error message:", err?.message);
            console.error("Error response:", err?.response);
            console.error("Error response data:", err?.response?.data);

            // Extract appropriate error message
            let errorMessage = 'Error al subir la imagen';
            if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }

            throw new Error(errorMessage);
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