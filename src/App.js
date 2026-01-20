import Home from './Pages/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SobreMi from './Pages/SobreMi';
import RedesSociales from './Pages/RedesSociales';
import Proyectos from './Pages/Proyectos';
import Contacto from './Pages/Contacto';
import Marcablanca from "./Components/VE/Marcablanca";
import {AuthProvider} from "./context/AuthContext";
import {Login} from "./Pages/Login";
import AdminAboutMe from './Pages/AdminAboutMe';
import AdminSocialNetwork from "./Pages/AdminSocialNetwork";
import AdminProjects from "./Pages/AdminProjects";
import AdminSidebar from "./Components/Global/AdminSideBar";
import PrivateRoute from "./constants/PrivateRoute";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home></Home>}/>
                        <Route path="/sobre-mi" element={<SobreMi></SobreMi>}/>
                        <Route path="/redes-sociales" element={<RedesSociales></RedesSociales>}/>
                        <Route path="/proyectos" element={<Proyectos></Proyectos>}/>
                        <Route path="/contacto" element={<Contacto></Contacto>}/>
                        <Route path="/ve" element={<Marcablanca></Marcablanca>}/>
                        <Route path="/login" element={<Login />} />

                        {/* Rutas de administración protegidas */}
                        <Route path="/admin/sobre-mi" element={
                            <PrivateRoute>
                                <AdminSidebar>
                                    <AdminAboutMe />
                                </AdminSidebar>
                            </PrivateRoute>
                        } />
                        <Route path="/admin/redes-sociales" element={
                            <PrivateRoute>
                                <AdminSidebar>
                                    <AdminSocialNetwork />
                                </AdminSidebar>
                            </PrivateRoute>
                        } />
                        <Route path="/admin/projects" element={
                            <PrivateRoute>
                                <AdminSidebar>
                                    <AdminProjects />
                                </AdminSidebar>
                            </PrivateRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;