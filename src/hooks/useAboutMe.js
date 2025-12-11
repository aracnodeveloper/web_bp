import { useState, useEffect } from 'react';
import apiService from '../service/apiService';
import { aboutmeApi, uploadImageApi, deleteImageApi } from '../constants/EndpointsRoutes';

export const useAboutMe = (type = null) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await apiService.getAll(aboutmeApi);

            // Filtrar por tipo si se proporciona
            if (type) {
                setItems(data.filter(item => item.type === type));
            } else {
                setItems(data);
            }

            setError(null);
        } catch (err) {
            setError(err.message || 'Error al cargar los datos');
            console.error('Error fetching aboutme:', err);
        } finally {
            setLoading(false);
        }
    };

    const createItem = async (data) => {
        try {
            setLoading(true);
            const newItem = await apiService.create(aboutmeApi, data);
            setItems(prev => [...prev, newItem]);
            setError(null);
            return newItem;
        } catch (err) {
            setError(err.message || 'Error al crear el item');
            console.error('Error creating aboutme:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateItem = async (id, data) => {
        try {
            setLoading(true);
            const updated = await apiService.update(aboutmeApi, id, data);
            setItems(prev => prev.map(item => item.id === id ? updated : item));
            setError(null);
            return updated;
        } catch (err) {
            setError(err.message || 'Error al actualizar el item');
            console.error('Error updating aboutme:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            setLoading(true);
            await apiService.delete(aboutmeApi, id);
            setItems(prev => prev.filter(item => item.id !== id));
            setError(null);
        } catch (err) {
            setError(err.message || 'Error al eliminar el item');
            console.error('Error deleting aboutme:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(uploadImageApi, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Error al subir la imagen');

            const data = await response.json();
            return data.data.url;
        } catch (err) {
            console.error('Error uploading image:', err);
            throw err;
        }
    };

    const deleteImage = async (filename) => {
        try {
            await apiService.delete(deleteImageApi, filename);
        } catch (err) {
            console.error('Error deleting image:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchItems();
    }, [type]);

    return {
        items,
        loading,
        error,
        fetchItems,
        createItem,
        updateItem,
        deleteItem,
        uploadImage,
        deleteImage,
    };
};