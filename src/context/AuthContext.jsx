import { useState } from 'react';

import Cookie from 'js-cookie';

import apiService from "../service/apiService";
import { loginApi } from "../constants/EndpointsRoutes";
import notificationService from "../service/notificationService";
import { AuthContext } from '../hooks/useAuthContext'

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const data = {email: email, password: password}
            const responseData = await apiService.createReqRes(loginApi, data)
            const {accessToken, refreshToken, userId, roleName} = responseData;
            const accessExpirationDate = new Date();
            const refreshExpirationDate = new Date();
            accessExpirationDate.setDate(accessExpirationDate.getDate() + 2);
            refreshExpirationDate.setDate(refreshExpirationDate.getDate() + 7);

            Cookie.set('accessToken', accessToken, { expires: accessExpirationDate });
            Cookie.set('refreshToken', refreshToken, { expires: refreshExpirationDate });
            Cookie.set('userId', userId, { expires: refreshExpirationDate});
            Cookie.set('roleName', roleName[0].roleName, { expires: refreshExpirationDate });

            setIsAuthenticated(true);
            setUserId(userId);
            setAccessToken(accessToken);
            setRole(roleName[0].roleName);

            if (Cookie.get('roleName') === 'admin') {
                notificationService.warning('Sudo mode', 'You are logged in as sudo, please be careful');
            }

            return {success: true};

        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                console.error('Error in server response:', error.response.data);
            } else if (error.request) {
                console.error('No response from server:', error.request);
            } else {
                console.error('Error while setting up the request', error.message);
            }

            return {success: false};
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        try {
            setLoading(true);
            Cookie.remove('accessToken');
            Cookie.remove('refreshToken');
            Cookie.remove('userId');
            Cookie.remove('roleName');
            setIsAuthenticated(false);
            setUserId(null);
            setAccessToken(null);
            setRole(null);
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, userId, accessToken, role, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};