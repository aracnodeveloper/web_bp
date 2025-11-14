import React from 'react';
import Medidor from './Medidor';
import SeguidoresRed from './SeguidoresRed';
import SegmentacionGenero from './SegmentacionGenero';
import SegmentacionEdad from './SegmentacionEdad';
import SegmentacionGeografica from './SegmentacionGeografica';

const Metricas = () => {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg">
            <div id='metricas' className='flex flex-col gap-6 mx-auto max-w-6xl py-8 sm:px-6 lg:px-8 w-full'>
                <div className="text-center mb-2">
                    <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]'>Métricas</h2>
                    <h3 className='text-xl font-medium mt-2'>Explora el impacto de los Contenidos de Bernardo Polo Andrade</h3>
                    <p className='text-gray-600 font-light text-sm mt-2 max-w-3xl mx-auto'>
                        ¡Descubre las métricas que revelan el alcance y la influencia de los contenidos creados por Bernardo Polo Andrade!
                        Sumérgete en los datos recopilados y conoce el impacto que su presencia genera en la audiencia.
                    </p>
                </div>

                <Medidor />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    <SeguidoresRed
                        red={"INST/FANPAGE"}
                        color={"#db5781"}
                        icono={"./images/instagram_icon.webp"}
                        seguidores={"135 K"}
                    />
                    <SeguidoresRed
                        red={"FK/FANPAGE"}
                        color={"#3e8ba4"}
                        icono={"./images/facebook_icon.webp"}
                        seguidores={"205 K"}
                    />
                    <SeguidoresRed
                        red={"TIK TOK"}
                        color={"#60605f"}
                        icono={"./images/tiktok_icon.webp"}
                        seguidores={"312.5 k"}
                    />
                    <SeguidoresRed
                        red={"YOUTUBE"}
                        color={"#e6231c"}
                        icono={"./images/youtube_icon.webp"}
                        seguidores={"1,88 k"}
                    />
                    <SeguidoresRed
                        red={"INST/PERSONAL"}
                        color={"#e33f72"}
                        icono={"./images/instagram_icon.webp"}
                        seguidores={"44.7 K"}
                    />
                    <SeguidoresRed
                        red={"FK/PERSONAL"}
                        color={"#35758a"}
                        icono={"./images/facebook_icon.webp"}
                        seguidores={"6.6 K"}
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-2'>
                    <SegmentacionGenero />
                    <SegmentacionEdad />
                </div>

                <div className='mt-2'>
                    <SegmentacionGeografica />
                </div>
            </div>
        </div>
    );
};

export default Metricas;
