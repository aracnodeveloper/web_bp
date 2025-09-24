import React from 'react';
import Navbar from '../Components/Global/Navbar';
import Cabecera from '../Components/Home/Cabecera';
import FooterHome from '../Components/Home/FooterHome';

const Home = () => {
    return (
        <div>
            <Navbar activo={0}/>
            <div className="pt-16">
                <Cabecera/>
                <FooterHome/>
            </div>
            </div>
            );
            };

        export default Home;
