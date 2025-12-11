import React, { useState } from 'react';
import AdminGoals from '../Components/Administrador/AboutMe/AdminGoals';
import AdminRecognitions from '../Components/Administrador/AboutMe/AdminRecognitions';
import AdminPhotos from '../Components/Administrador/AboutMe/AdminPhotos';
import AdminBlog from '../Components/Administrador/AboutMe/AdminBlog';
import AdminGallery from '../Components/Administrador/AboutMe/AdminGallery';

const AdminAboutMe = () => {
    const [activeTab, setActiveTab] = useState('goals');

    const tabs = [
        { id: 'goals', label: 'Historia & Logros', icon: 'icon-[material-symbols--history]' },
        { id: 'recognitions', label: 'Reconocimientos', icon: 'icon-[material-symbols--award-star-rounded]' },
        { id: 'photo', label: 'Galería Fotográfica', icon: 'icon-[material-symbols--photo-camera]' },
        { id: 'blog', label: 'Blog & Entradas', icon: 'icon-[material-symbols--article]' },
        { id: 'interviews', label: 'Entrevistas', icon: 'icon-[material-symbols--tv]' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'goals':
                return <AdminGoals />;
            case 'recognitions':
                return <AdminRecognitions />;
            case 'photo':
                return <AdminPhotos />;
            case 'blog':
                return <AdminBlog />;
            case 'interviews':
                return <AdminGallery />;
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
                        Administrador - Sobre Mí
                    </h1>
                    <p className="text-gray-600">
                        Gestiona el contenido de la sección "Sobre Mí" de tu sitio web
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

export default AdminAboutMe;