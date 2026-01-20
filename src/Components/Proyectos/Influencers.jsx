import React from 'react';
import ProyectoSection from './ProyectoSection';
import CreadoresNetworking from "./CreadoresNetworking";
import { useProjects } from '../../hooks/useProjects';
import { PROJECT_TYPES } from '../../types/projectTypes';

const Influencers = () => {
    // Cargar datos de cada sección de influencers
    const { projects: gastronomia, loading: loadingGastro } = useProjects(PROJECT_TYPES.GASTRONOMIA_LOCAL);
    const { projects: cultura, loading: loadingCultura } = useProjects(PROJECT_TYPES.CULTURA_Y_TURISMO);
    const { projects: hoteles, loading: loadingHoteles } = useProjects(PROJECT_TYPES.HOTELES);

    // Función helper para transformar datos al formato ProyectoSection
    const transformProjects = (projects) => {
        return projects.map(p => ({
            imagen: p.image,
            enlace: p.url,
            mensaje: p.description,
            ubicacion: p.location || 'Ecuador'
        }));
    };

    if (loadingGastro || loadingCultura || loadingHoteles) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#96c121]"></div>
                    <p className="mt-4 text-gray-600">Cargando contenido de influencers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12 max-w-4xl mx-auto">
                <h1 className='text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]'>
                    Programa de Influencers
                </h1>
                <h2 className="text-xl sm:text-2xl mb-4">Embajadores digitales del Ecuador</h2>
                <p className="text-base sm:text-lg mb-8 mx-auto">
                    Con Visita Ecuador, queremos que los influencers viajen por todo nuestro hermoso Ecuador para
                    activar el turismo y mejorar la economía del país. A través de su alcance y autenticidad, estos
                    creadores de contenido pueden mostrar la riqueza cultural, natural y gastronómica de nuestras
                    regiones, generando un impacto positivo en las comunidades locales y atrayendo visitantes tanto
                    nacionales como internacionales.
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Sección de Creadores/Networking - Componente especial con modal */}
                <CreadoresNetworking />

                {/* Gastronomía Local */}
                {gastronomia.length > 0 && (
                    <ProyectoSection
                        titulo="Gastronomía Local"
                        proyectos={transformProjects(gastronomia)}
                    />
                )}

                {/* Cultura y Turismo */}
                {cultura.length > 0 && (
                    <ProyectoSection
                        titulo="Cultura y Turismo"
                        proyectos={transformProjects(cultura)}
                    />
                )}

                {/* Hoteles */}
                {hoteles.length > 0 && (
                    <ProyectoSection
                        titulo="Hoteles"
                        proyectos={transformProjects(hoteles)}
                    />
                )}
            </div>
        </div>
    );
};

export default Influencers;