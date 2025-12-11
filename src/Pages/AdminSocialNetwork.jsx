import React, { useState } from 'react';
import AdminContent from '../Components/Administrador/SocialNetworks/AdminContent';

const AdminSocialNetwork = () => {
    const [activeTab, setActiveTab] = useState('content');

    const tabs = [
        { id: 'content', label: 'Contenido & Publicaciones', icon: 'icon-[material-symbols--grid-view]' },
        { id: 'metrics', label: 'Métricas', icon: 'icon-[material-symbols--analytics]' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'content':
                return <AdminContent />;
            case 'metrics':
                return (
                    <div className="text-center py-12 text-gray-500">
                        <span className="icon-[material-symbols--analytics] h-16 w-16 mx-auto mb-4 opacity-50"></span>
                        <p>Módulo de métricas próximamente</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Administrador - Redes Sociales
                    </h1>
                    <p className="text-gray-600">
                        Gestiona el contenido y métricas de tus redes sociales
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px space-x-8 px-6" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                    ${
                                        activeTab === tab.id
                                            ? 'border-[#96c121] text-[#96c121]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
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

export default AdminSocialNetwork;