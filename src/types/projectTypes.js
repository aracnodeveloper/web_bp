export const PROJECT_TYPES = {
    EMPRENDEDORES: 'EMPRENDEDORES',
    LA_SAZON_DE: 'LA_SAZON_DE',
    LONGO_DE_BARRIO: 'LONGO_DE_BARRIO',
    LOS_CLASICOS: 'LOS_CLASICOS',
    TOMA_MI_MANO: 'TOMA_MI_MANO',
    CREADORES_NETWORKING: 'CREADORES_NETWORKING',
    GASTRONOMIA_LOCAL: 'GASTRONOMIA_LOCAL',
    CULTURA_Y_TURISMO: 'CULTURA_Y_TURISMO',
    HOTELES: 'HOTELES'
};

export const PROJECT_TYPE_LABELS = {
    [PROJECT_TYPES.EMPRENDEDORES]: 'Emprendedores',
    [PROJECT_TYPES.LA_SAZON_DE]: 'La Sazón De',
    [PROJECT_TYPES.LONGO_DE_BARRIO]: 'Longo de Barrio',
    [PROJECT_TYPES.LOS_CLASICOS]: 'Los Clásicos',
    [PROJECT_TYPES.TOMA_MI_MANO]: 'Toma mi Mano 🤝',
    [PROJECT_TYPES.CREADORES_NETWORKING]: 'Creadores/Networking',
    [PROJECT_TYPES.GASTRONOMIA_LOCAL]: 'Gastronomía Local',
    [PROJECT_TYPES.CULTURA_Y_TURISMO]: 'Cultura y Turismo',
    [PROJECT_TYPES.HOTELES]: 'Hoteles'
};

export const PROJECT_SECTIONS = {
    SOCIAL_IMPACT: 'SOCIAL_IMPACT', // Emprendedores, La Sazón De, Longo de Barrio, Los Clásicos, Toma mi Mano
    INFLUENCERS: 'INFLUENCERS' // Creadores/Networking, Gastronomía Local, Cultura y Turismo, Hoteles
};

export const getProjectSection = (type) => {
    const socialImpactTypes = [
        PROJECT_TYPES.EMPRENDEDORES,
        PROJECT_TYPES.LA_SAZON_DE,
        PROJECT_TYPES.LONGO_DE_BARRIO,
        PROJECT_TYPES.LOS_CLASICOS,
        PROJECT_TYPES.TOMA_MI_MANO
    ];

    return socialImpactTypes.includes(type)
        ? PROJECT_SECTIONS.SOCIAL_IMPACT
        : PROJECT_SECTIONS.INFLUENCERS;
};