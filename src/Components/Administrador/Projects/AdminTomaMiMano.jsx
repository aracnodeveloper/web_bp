import React from 'react';
import AdminSimpleProject from './AdminSimpleProject';
import { PROJECT_TYPES } from '../../../types/projectTypes';

const AdminTomaMiMano = () => {
    return (
        <AdminSimpleProject
            projectType={PROJECT_TYPES.TOMA_MI_MANO}
            title="Toma mi Mano 🤝"
        />
    );
};

export default AdminTomaMiMano;