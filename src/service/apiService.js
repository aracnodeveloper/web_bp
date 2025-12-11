import api from "./api";

const apiService = {
    getAll: async (url, config) => {
        const response = await api.get(url, config);
        return response.data;
    },

    getAllPaginated: async (
        baseUrl,
        params,
        config
    ) => {
        let url = baseUrl;

        if (params?.page && params?.size) {
            const searchParams = new URLSearchParams({
                page: params.page.toString(),
                size: params.size.toString()
            });

            const separator = url.includes('?') ? '&' : '?';
            url += `${separator}${searchParams.toString()}`;
        }

        const response = await api.get(url, config);
        return response.data;
    },

    getById: async (endpoint, id) => {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
    },

    create: async (endpoint, data) => {
        const response = await api.post(endpoint, data);
        return response.data;
    },

    patch: async (url, data) => {
        const response = await api.patch(url, data)
        return response.data;
    },

    update: async (endpoint, id, data) => {
        const response = await api.patch(`${endpoint}/${id}`, data);
        return response.data;
    },

    delete: async (endpoint, id) => {
        await api.delete(`${endpoint}/${id}`);
    },

    createReqRes: async (
        endpoint,
        data
    ) => {
        const response = await api.post(endpoint, data);
        return response.data;
    },

};


export default apiService;