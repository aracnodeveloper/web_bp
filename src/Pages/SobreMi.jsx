import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Global/Navbar';
import Introduccion from '../Components/SobreMi/Introduccion';
import Logros from '../Components/SobreMi/Logros';
import Galeria from '../Components/SobreMi/Galeria';
import Blog from '../Components/SobreMi/Blog';
import Footer from '../Components/Global/Footer';
import FooterHome from "../Components/Home/FooterHome";

const SobreMi = () => {
    const location = useLocation();
    const introduccionRef = useRef(null);
    const logrosRef = useRef(null);
    const galeriaRef = useRef(null);
    const blogRef = useRef(null);

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const section = location.state.scrollTo;

            setTimeout(() => {
                if (section === 'introduccion' && introduccionRef.current) {
                    const yOffset = -80;
                    const element = introduccionRef.current;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                } else if (section === 'logros' && logrosRef.current) {
                    const yOffset = -80;
                    const element = logrosRef.current;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                } else if (section === 'galeria' && galeriaRef.current) {
                    const yOffset = -80;
                    const element = galeriaRef.current;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                } else if (section === 'blog' && blogRef.current) {
                    const yOffset = -80;
                    const element = blogRef.current;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <>
            <Navbar activo={1}/>
            <div className="pt-16">
                <div ref={introduccionRef}>
                    <Introduccion/>
                </div>
                <div ref={logrosRef}>
                    <Logros/>
                </div>
                <div ref={galeriaRef}>
                    <Galeria/>
                </div>
                <div ref={blogRef}>
                    <Blog/>
                </div>
                <FooterHome/>
            </div>
            </>
            );
            };

            export default SobreMi;
