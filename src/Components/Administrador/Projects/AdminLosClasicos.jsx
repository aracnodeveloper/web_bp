import React from 'react';
import AdminSimpleProject from './AdminSimpleProject';
import { PROJECT_TYPES } from '../../../types/projectTypes';

const AdminLosClasicos  = () => {
    return (
        <AdminSimpleProject
            projectType={PROJECT_TYPES.LOS_CLASICOS}
            title="Los Clasicos"
        />
    );
};

export default AdminLosClasicos ;