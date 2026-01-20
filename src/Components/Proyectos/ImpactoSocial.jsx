import React from 'react';
import ProyectoSection from './ProyectoSection';
import { useProjects } from '../../hooks/useProjects';
import { PROJECT_TYPES } from '../../types/projectTypes';

const ImpactoSocial = () => {
    // Cargar datos de cada sección
    const { projects: emprendedores, loading: loadingEmp } = useProjects(PROJECT_TYPES.EMPRENDEDORES);
    const { projects: laSazonDe, loading: loadingSazon } = useProjects(PROJECT_TYPES.LA_SAZON_DE);
    const { projects: longoBarrio, loading: loadingLongo } = useProjects(PROJECT_TYPES.LONGO_DE_BARRIO);
    const { projects: losClasicos, loading: loadingClasicos } = useProjects(PROJECT_TYPES.LOS_CLASICOS);
    const { projects: tomaMiMano, loading: loadingToma } = useProjects(PROJECT_TYPES.TOMA_MI_MANO);

    // Función helper para transformar datos al formato ProyectoSection
    const transformProjects = (projects) => {
        return projects.map(p => ({
            imagen: p.image,
            enlace: p.url,
            mensaje: p.description,
            ubicacion: p.location || 'Ecuador'
        }));
    };

    if (loadingEmp || loadingSazon || loadingLongo || loadingClasicos || loadingToma) {
        return (
            <div className="w-full mx-auto px-4 py-8 sm:py-12 lg:px-8">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#96c121]"></div>
                    <p className="mt-4 text-gray-600">Cargando proyectos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto px-4 py-8 sm:py-12 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
                <h1 className='text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]'>
                    Proyecto de Impacto Social
                </h1>
                <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">
                    Trascendiendo números: el alma de nuestra comunidad digital
                </h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 mx-auto max-w-3xl">
                    En "Impactos Sociales", vamos más allá de las métricas. Cada interacción, comentario y gesto es una
                    semilla de conexión genuina.
                    En la comunidad de Bernardo Polo, el valor reside en el impacto humano, no en los números.
                    ¡Únete a nosotros y sé parte de algo significativo!
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Emprendedores */}
                {emprendedores.length > 0 && (
                    <ProyectoSection
                        titulo="Emprendedores"
                        proyectos={transformProjects(emprendedores)}
                    />
                )}

                {/* La Sazón De */}
                {laSazonDe.length > 0 && (
                    <ProyectoSection
                        titulo="La Sazón De"
                        proyectos={transformProjects(laSazonDe)}
                    />
                )}

                {/* Longo de Barrio */}
                {longoBarrio.length > 0 && (
                    <ProyectoSection
                        titulo="Longo de Barrio"
                        proyectos={transformProjects(longoBarrio)}
                    />
                )}

                {/* Los Clásicos */}
                {losClasicos.length > 0 && (
                    <ProyectoSection
                        titulo="Los Clásicos"
                        proyectos={transformProjects(losClasicos)}
                    />
                )}

                {/* Toma mi Mano */}
                {tomaMiMano.length > 0 && (
                    <ProyectoSection
                        titulo="Toma mi Mano 🤝"
                        proyectos={transformProjects(tomaMiMano)}
                    />
                )}
            </div>
        </div>
    );
};

export default ImpactoSocial;