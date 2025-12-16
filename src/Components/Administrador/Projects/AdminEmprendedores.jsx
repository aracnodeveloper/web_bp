import React from 'react';
import AdminSimpleProject from './AdminSimpleProject';
import { PROJECT_TYPES } from '../../../types/projectTypes';

const AdminEmprendedores = () => {
    return (
        <AdminSimpleProject
            projectType={PROJECT_TYPES.EMPRENDEDORES}
            title="Emprendedores"
        />
    );
};

export default AdminEmprendedores;