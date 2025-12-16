import React, { useState } from 'react';
import AdminEmprendedores from '../Components/Administrador/Projects/AdminEmprendedores';
import AdminLaSazonDe from '../Components/Administrador/Projects/AdminLaSazonDe';
import AdminLongoDeBarrio from '../Components/Administrador/Projects/AdminLongoDeBarrio';
import AdminLosClasicos from '../Components/Administrador/Projects/AdminLosClasicos';
import AdminTomaMiMano from '../Components/Administrador/Projects/AdminTomaMiMano';
import AdminCreadoresNetworking from '../Components/Administrador/Projects/AdminCreadoresNetworking';
import AdminGastronomiaLocal from '../Components/Administrador/Projects/AdminGastronomiaLocal';
import AdminCulturaYTurismo from '../Components/Administrador/Projects/AdminCulturaYTurismo';
import AdminHoteles from '../Components/Administrador/Projects/AdminHoteles';
import { PROJECT_TYPES } from '../types/projectTypes';

const AdminProyectos = () => {
    const [activeTab, setActiveTab] = useState('emprendedores');

    const tabs = [
        {
            id: 'emprendedores',
            label: 'Emprendedores',
            icon: 'icon-[material-symbols--business-center]',
            type: PROJECT_TYPES.EMPRENDEDORES,
            section: 'social'
        },
        {
            id: 'la-sazon-de',
            label: 'La Sazón De',
            icon: 'icon-[material-symbols--restaurant]',
            type: PROJECT_TYPES.LA_SAZON_DE,
            section: 'social'
        },
        {
            id: 'longo-de-barrio',
            label: 'Longo de Barrio',
            icon: 'icon-[material-symbols--home]',
            type: PROJECT_TYPES.LONGO_DE_BARRIO,
            section: 'social'
        },
        {
            id: 'los-clasicos',
            label: 'Los Clásicos',
            icon: 'icon-[material-symbols--star]',
            type: PROJECT_TYPES.LOS_CLASICOS,
            section: 'social'
        },
        {
            id: 'toma-mi-mano',
            label: 'Toma mi Mano',
            icon: 'icon-[material-symbols--handshake]',
            type: PROJECT_TYPES.TOMA_MI_MANO,
            section: 'social'
        },
        {
            id: 'creadores-networking',
            label: 'Creadores/Networking',
            icon: 'icon-[material-symbols--group]',
            type: PROJECT_TYPES.CREADORES_NETWORKING,
            section: 'influencers'
        },
        {
            id: 'gastronomia-local',
            label: 'Gastronomía Local',
            icon: 'icon-[material-symbols--local-dining]',
            type: PROJECT_TYPES.GASTRONOMIA_LOCAL,
            section: 'influencers'
        },
        {
            id: 'cultura-turismo',
            label: 'Cultura y Turismo',
            icon: 'icon-[material-symbols--landscape]',
            type: PROJECT_TYPES.CULTURA_Y_TURISMO,
            section: 'influencers'
        },
        {
            id: 'hoteles',
            label: 'Hoteles',
            icon: 'icon-[material-symbols--hotel]',
            type: PROJECT_TYPES.HOTELES,
            section: 'influencers'
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'emprendedores':
                return <AdminEmprendedores />;
            case 'la-sazon-de':
                return <AdminLaSazonDe />;
            case 'longo-de-barrio':
                return <AdminLongoDeBarrio />;
            case 'los-clasicos':
                return <AdminLosClasicos />;
            case 'toma-mi-mano':
                return <AdminTomaMiMano />;
            case 'creadores-networking':
                return <AdminCreadoresNetworking />;
            case 'gastronomia-local':
                return <AdminGastronomiaLocal />;
            case 'cultura-turismo':
                return <AdminCulturaYTurismo />;
            case 'hoteles':
                return <AdminHoteles />;
            default:
                return null;
        }
    };

    const socialTabs = tabs.filter(t => t.section === 'social');
    const influencerTabs = tabs.filter(t => t.section === 'influencers');

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Administrador de Proyectos
                    </h1>
                    <p className="text-gray-600">
                        Gestiona todos los proyectos de impacto social e influencers
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    {/* Sección Impacto Social */}
                    <div className="px-6 pt-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                            Impacto Social
                        </h3>
                        <nav className="flex -mb-px space-x-4 overflow-x-auto" aria-label="Social Tabs">
                            {socialTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                                        ${activeTab === tab.id
                                        ? 'border-[#96c121] text-[#96c121]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                    `}
                                >
                                    <span className={`${tab.icon} h-5 w-5`}></span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="border-t border-gray-200 mt-2"></div>

                    {/* Sección Influencers */}
                    <div className="px-6 pt-4 pb-2">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                            Programa de Influencers
                        </h3>
                        <nav className="flex -mb-px space-x-4 overflow-x-auto" aria-label="Influencer Tabs">
                            {influencerTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                                        ${activeTab === tab.id
                                        ? 'border-[#96c121] text-[#96c121]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                    `}
                                >
                                    <span className={`${tab.icon} h-5 w-5`}></span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminProyectos;