import React from 'react';
import AdminSimpleProject from './AdminSimpleProject';
import { PROJECT_TYPES } from '../../../types/projectTypes';

const AdminCulturaYTurismo  = () => {
    return (
        <AdminSimpleProject
            projectType={PROJECT_TYPES.CULTURA_Y_TURISMO}
            title="Cultura y Turismo"
        />
    );
};

export default AdminCulturaYTurismo ;