import { useState, useEffect } from 'react';
import apiService from '../service/apiService';
import { socialsApi, genderApi, ageApi, locationApi } from '../constants/EndpointsRoutes';

// Hook para Socials (SeguidoresRed)
export const useSocials = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await apiService.getAll(socialsApi);
            setItems(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Error al cargar los datos');
            console.error('Error fetching socials:', err);
        } finally {
            setLoading(false);
        }
    };

    const createItem = async (data) => {
        try {
            setLoading(true);
            const newItem = await apiService.create(socialsApi, data);
            setItems(prev => [...prev, newItem]);
            setError(null);
            return newItem;
        } catch (err) {
            setError(err.message || 'Error al crear el item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateItem = async (id, data) => {
        try {
            setLoading(true);
            const updated = await apiService.update(socialsApi, id, data);
            setItems(prev => prev.map(item => item.id === id ? updated : item));
            setError(null);
            return updated;
        } catch (err) {
            setError(err.message || 'Error al actualizar el item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            setLoading(true);
            await apiService.delete(socialsApi, id);
            setItems(prev => prev.filter(item => item.id !== id));
            setError(null);
        } catch (err) {
            setError(err.message || 'Error al eliminar el item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return { items, loading, error, fetchItems, createItem, updateItem, deleteItem };
};

// Hook para Gender (SegmentacionGenero) - Solo edición
export const useGender = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await apiService.getAll(genderApi);
            setData(result[0] || null); // Solo obtenemos el primer registro
            setError(null);
        } catch (err) {
            setError(err.message || 'Error al cargar los datos');
            console.error('Error fetching gender:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (id, updateData) => {
        try {
            setLoading(true);
            const updated = await apiService.update(genderApi, id, updateData);
            setData(updated);
            setError(null);
            return updated;
        } catch (err) {
            setError(err.message || 'Error al actualizar');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, fetchData, updateData };
};

// Hook para Age (SegmentacionEdad) - Solo edición
export const useAge = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await apiService.getAll(ageApi);
            setData(result[0] || null); // Solo obtenemos el primer registro
            setError(null);
        } catch (err) {
            setError(err.message || 'Error al cargar los datos');
            console.error('Error fetching age:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (id, updateData) => {
        try {
            setLoading(true);
            const updated = await apiService.update(ageApi, id, updateData);
            setData(updated);
            setError(null);
            return updated;
        } catch (err) {
            setError(err.message || 'Error al actualizar');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, fetchData, updateData };
};

// Hook para Location (SegmentacionGeografica)
export const useLocation = (type = null) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await apiService.getAll(locationApi);

            if (type) {
                setItems(data.filter(item => item.type === type));
            } else {
                setItems(data);
            }

            setError(null);
        } catch (err) {
            setError(err.message || 'Error al cargar los datos');
            console.error('Error fetching locations:', err);
        } finally {
            setLoading(false);
        }
    };

    const createItem = async (data) => {
        try {
            setLoading(true);
            const newItem = await apiService.create(locationApi, data);
            setItems(prev => [...prev, newItem]);
            setError(null);
            return newItem;
        } catch (err) {
            setError(err.message || 'Error al crear el item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateItem = async (id, data) => {
        try {
            setLoading(true);
            const updated = await apiService.update(locationApi, id, data);
            setItems(prev => prev.map(item => item.id === id ? updated : item));
            setError(null);
            return updated;
        } catch (err) {
            setError(err.message || 'Error al actualizar el item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            setLoading(true);
            await apiService.delete(locationApi, id);
            setItems(prev => prev.filter(item => item.id !== id));
            setError(null);
        } catch (err) {
            setError(err.message || 'Error al eliminar el item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [type]);

    return { items, loading, error, fetchItems, createItem, updateItem, deleteItem };
};