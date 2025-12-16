import {useEffect, useState} from "react";
import apiService from "../service/apiService";
import {textApi} from "../constants/EndpointsRoutes";

export const useText = (type = null) => {
    const [items, setItems] = useState( []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await apiService.getAll(textApi);

            // Filtrar por tipo si se proporciona
            if (type) {
                setItems(data.filter(item => item.type === type));
            } else {
                setItems(data);
            }

            setError(null);
        } catch (err) {
            setError(err.message || 'Error al cargar los datos');
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const createItem = async (data) => {
        try {
            setLoading(true);
            const newItem = await apiService.create(textApi, data);
            setItems(prev => [...prev, newItem]);
            setError(null);
            return newItem;
        } catch (err) {
            setError(err.message || 'Error al crear el item');
            console.error('Error creating content:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateItem = async (id, data) => {
        try {
            setLoading(true);
            const updated = await apiService.update(textApi, id, data);
            setItems(prev => prev.map(item => item.id === id ? updated : item));
            setError(null);
            return updated;
        } catch (err) {
            setError(err.message || 'Error al actualizar el item');
            console.error('Error updating content:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            setLoading(true);
            await apiService.delete(textApi, id);
            setItems(prev => prev.filter(item => item.id !== id));
            setError(null);
        } catch (err) {
            setError(err.message || 'Error al eliminar el item');
            console.error('Error deleting content:', err);
            throw err;
        } finally {
            setLoading(false);
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
    };
}