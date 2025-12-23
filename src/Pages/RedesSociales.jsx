import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Global/Navbar';
import Footer from '../Components/Global/Footer';
import Contenido from '../Components/RedesSociales/Contenido';
import Metricas from '../Components/RedesSociales/Metricas';
import FooterHome from "../Components/Home/FooterHome";

const RedesSociales = () => {
    const location = useLocation();
    const contenidoRef = useRef(null);
    const metricasRef = useRef(null);

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const section = location.state.scrollTo;
            setTimeout(() => {
                if (section === 'contenido' && contenidoRef.current) {
                const yOffset = -80;
                const element = contenidoRef.current;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
                } else if (section === 'metricas' && metricasRef.current) {
                const yOffset = -80;
                const element = metricasRef.current;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
                }
            },100);
        }
    }, [location]);


    return (
        <div>
            <Navbar activo={2}/>
            <div className="pt-16">
                <div ref={contenidoRef}>
                    <Contenido/>
                </div>
                <div ref={metricasRef}>
                    <Metricas/>
                </div>
                <FooterHome/>
            </div>
            </div>
            );
            };

            export default RedesSociales;
