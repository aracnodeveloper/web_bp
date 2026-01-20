import React, { useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../Components/Global/Navbar';
import Footer from '../Components/Global/Footer';
import ImpactoSocial from '../Components/Proyectos/ImpactoSocial';
import Influencers from "../Components/Proyectos/Influencers";
import FooterHome from "../Components/Home/FooterHome";

const Proyectos = () => {
    const location = useLocation();
    const influencerRef = useRef(null);
    const socialRef = useRef(null);

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const section = location.state.scrollTo;
            setTimeout(() => {
                if (section === 'Social' && socialRef.current) {
                    const yOffset = -80;
                    const element = socialRef.current;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                } else if (section === 'Influencers' && influencerRef.current) {
                    const yOffset = -80;
                    const element = influencerRef.current;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar activo={3} />
            <main className="flex-grow pt-16">
                <div ref={socialRef} className="w-full">
                    <ImpactoSocial />
                </div>
                <div ref={influencerRef} className="w-full">
                    <Influencers />
                </div>
            </main>
            <FooterHome/>
        </div>
    );
};

export default Proyectos;
