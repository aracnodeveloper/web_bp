import React, { useState } from 'react';
import AdminContent from '../Components/Administrador/SocialNetworks/AdminContent';
import AdminSocials from '../Components/Administrador/SocialNetworks/AdminSocials';
import AdminGender from '../Components/Administrador/SocialNetworks/AdminGender';
import AdminAge from '../Components/Administrador/SocialNetworks/AdminAge';
import AdminLocation from '../Components/Administrador/SocialNetworks/AdminLocation';

const AdminSocialNetwork = () => {
    const [activeTab, setActiveTab] = useState('content');

    const tabs = [
        { id: 'content', label: 'Contenido & Publicaciones', icon: 'icon-[material-symbols--grid-view]' },
        { id: 'socials', label: 'Seguidores por Red', icon: 'icon-[material-symbols--group]' },
        { id: 'gender', label: 'Género', icon: 'icon-[material-symbols--wc]' },
        { id: 'age', label: 'Edad', icon: 'icon-[material-symbols--calendar-today]' },
        { id: 'location', label: 'Ubicación', icon: 'icon-[material-symbols--location-on]' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'content':
                return <AdminContent />;
            case 'socials':
                return <AdminSocials />;
            case 'gender':
                return <AdminGender />;
            case 'age':
                return <AdminAge />;
            case 'location':
                return <AdminLocation />;
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