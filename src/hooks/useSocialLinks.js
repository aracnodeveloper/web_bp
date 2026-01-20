import { useState, useEffect } from 'react';
import apiService from '../service/apiService';
import { socialLinksApi } from '../constants/EndpointsRoutes';

export const useSocialLinks = (influencerId = null) => {
    const [socialLinks, setSocialLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSocialLinks = async () => {
        if (!influencerId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await apiService.getAll(`${socialLinksApi}/influencer/${influencerId}`);
            const sortedLinks = response.sort((a, b) => a.orderIndex - b.orderIndex);
            setSocialLinks(sortedLinks);
            setError(null);
        } catch (err) {
            console.error('Error fetching social links:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSocialLinks();
    }, [influencerId]);

    const createSocialLink = async (data) => {
        try {
            const response = await apiService.create(socialLinksApi, data);
            await fetchSocialLinks();
            return response;
        } catch (err) {
            console.error('Error creating social link:', err);
            throw err;
        }
    };

    const updateSocialLink = async (id, data) => {
        try {
            const response = await apiService.update(socialLinksApi, id, data);
            await fetchSocialLinks();
            return response;
        } catch (err) {
            console.error('Error updating social link:', err);
            throw err;
        }
    };

    const deleteSocialLink = async (id) => {
        try {
            await apiService.update(socialLinksApi, id, { isActive: false });
            await fetchSocialLinks();
        } catch (err) {
            console.error('Error deleting social link:', err);
            throw err;
        }
    };

    return {
        socialLinks,
        loading,
        error,
        fetchSocialLinks,
        createSocialLink,
        updateSocialLink,
        deleteSocialLink
    };
};