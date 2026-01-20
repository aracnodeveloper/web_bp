import React from 'react';
import AdminSimpleProject from './AdminSimpleProject';
import { PROJECT_TYPES } from '../../../types/projectTypes';

const AdminGastronomiaLocal  = () => {
    return (
        <AdminSimpleProject
            projectType={PROJECT_TYPES.GASTRONOMIA_LOCAL}
            title="Gastronomia Local"
        />
    );
};

export default AdminGastronomiaLocal ;