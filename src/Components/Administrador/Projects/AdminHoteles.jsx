import React from 'react';
import AdminSimpleProject from './AdminSimpleProject';
import { PROJECT_TYPES } from '../../../types/projectTypes';

const AdminHoteles = () => {
    return (
        <AdminSimpleProject
            projectType={PROJECT_TYPES.HOTELES}
            title="Hoteles"
        />
    );
};

export default AdminHoteles;