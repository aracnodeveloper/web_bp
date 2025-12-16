import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminSidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            id: 'sobre-mi',
            label: 'Sobre Mí',
            icon: 'icon-[material-symbols--person]',
            path: '/admin/sobre-mi',
        },
        {
            id: 'redes-sociales',
            label: 'Redes Sociales',
            icon: 'icon-[material-symbols--share]',
            path: '/admin/redes-sociales',
        },
        {
            id: 'proyectos',
            label: 'Proyectos',
            icon: 'icon-[material-symbols--folder-open]',
            path: '/admin/projects',
        },
        {
            id: 'Volver',
            label: 'Volver',
            icon: 'icon-[material-symbols--arrow-back]',
            path: '/',
        }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        const cookiesToClear = ["accessToken", "refreshToken", "userId", "roleName"];
        cookiesToClear.forEach((cookie) => Cookies.remove(cookie));
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Botón de toggle para móvil */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-4 left-4 z-50 ${isOpen === true ? 'hidden' : ''}  lg:hidden bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors`}
            >
                <span className="icon-[material-symbols--menu] h-6 w-6 text-gray-700"></span>
            </button>

            {/* Overlay para móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar - Ahora con sticky y ocupa toda la altura */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-white shadow-lg z-40
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:sticky lg:top-0
                    ${isCollapsed ? 'w-20' : 'w-60'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className={`${isCollapsed ? 'p-4' : 'p-5'} border-b border-gray-100`}>
                        <div className="flex items-start justify-between gap-2">
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-base font-bold text-gray-900 truncate">Bernardo Polo</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Editor Ultra Flexible</p>
                                </div>
                            )}
                            <button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className=" lg:block text-black hover:text-gray-700  p-3 rounded transition-colors flex-shrink-0"
                                title={isCollapsed ? "Expandir" : "Contraer"}
                            >
                                <span className={`icon-[material-symbols--menu] h-5 w-5 text-black`}></span>
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="lg:hidden text-black hover:text-gray-700 flex-shrink-0"
                            >
                                <span className="icon-[material-symbols--close] h-5 w-5"></span>
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-3">
                        <div className={`${isCollapsed ? 'px-2' : 'px-3'} space-y-0.5`}>
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`
                                        w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200
                                        flex items-center gap-3
                                        ${
                                        isActive(item.path)
                                            ? 'bg-green-50 text-[#96c121]'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }
                                        ${isCollapsed ? 'justify-center' : ''}
                                    `}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <span className={`${item.icon} h-5 w-5 flex-shrink-0`}></span>
                                    {!isCollapsed && (
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm truncate">{item.label}</div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* User Info Footer */}
                    <div className={`${isCollapsed ? 'p-3' : 'p-4'} border-t border-gray-100`}>
                        {!isCollapsed ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="w-9 h-9 rounded-full bg-[#96c121] flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
                                        A
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-semibold text-gray-900 truncate">Admin</div>
                                        <div className="text-xs text-gray-500 truncate">admin@bp.com</div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="icon-[material-symbols--logout] h-4 w-4"></span>
                                    <span className="text-xs font-medium">Cerrar sesión</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex justify-center">
                                    <div className="w-9 h-9 rounded-full bg-[#96c121] flex items-center justify-center text-white font-bold cursor-pointer  transition-colors text-sm"
                                         title="Admin">
                                        A
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center"
                                    title="Cerrar sesión"
                                >
                                    <span className="icon-[material-symbols--logout] h-4 w-4"></span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default AdminSidebar;