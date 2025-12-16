import React from 'react';
import AdminSimpleProject from './AdminSimpleProject';
import { PROJECT_TYPES } from '../../../types/projectTypes';

const AdminLongoDeBarrio  = () => {
    return (
        <AdminSimpleProject
            projectType={PROJECT_TYPES.LONGO_DE_BARRIO}
            title="Longo de Barrio"
        />
    );
};

export default AdminLongoDeBarrio ;