import React from 'react';
import AdminSimpleProject from './AdminSimpleProject';
import { PROJECT_TYPES } from '../../../types/projectTypes';

const AdminLaSazonDe = () => {
    return (
        <AdminSimpleProject
            projectType={PROJECT_TYPES.LA_SAZON_DE}
            title="La sazon de"
        />
    );
};

export default AdminLaSazonDe;