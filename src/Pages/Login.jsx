import React, { useState } from "react";
import Cookies from "js-cookie";
import {
    Alert,
    Button,
    Form,
    Input,
    Layout,
    Typography,
} from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const { Content } = Layout;

export const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        if (!login) {
            setError("Login functionality is not available.");
            setLoading(false);
            return;
        }

        try {
            const email = values.email || values.Email;
            const response = await login(email, values.password);

            if (response && response.success) {
                const token = Cookies.get("accessToken");
                if (token) {
                    navigate("/admin/sobre-mi", { replace: true });
                } else {
                    setError("Login failed. No token found.");
                }
            } else {
                setError("Login failed. Please check your email and password.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Content className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#92b509] via-[#a8c830] to-[#7a9907] p-4 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-75"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Card principal con glassmorphism */}
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
                    {/* Header con gradiente */}
                    <div className="bg-gradient-to-r from-[#92b509] to-[#a8c830] p-8 text-center relative">
                        <div className="absolute inset-0 bg-black/5"></div>
                        <div className="relative z-10">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white rounded-full p-2 shadow-xl transform transition-transform hover:scale-105">
                                    <img
                                        className="h-20 w-20 rounded-full object-contain"
                                        src="./images/foto_inicio.webp"
                                        alt="Foto de inicio"
                                    />
                                </div>
                            </div>
                            <img
                                className="h-24 mx-auto filter drop-shadow-lg"
                                src="./images/logo_vertical.webp"
                                alt="Logo Vertical"
                            />
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="p-8 space-y-6">
                        <div className="text-center">
                            <Typography.Title level={3} className="mb-2 text-gray-800 font-bold">
                                Bienvenido de nuevo
                            </Typography.Title>
                            <p className="text-gray-500 text-sm">
                                Inicia sesión para acceder al panel de administración
                            </p>
                        </div>

                        {error && (
                            <Alert
                                message={error}
                                type="error"
                                showIcon
                                className="rounded-xl border-0 shadow-sm"
                                closable
                                onClose={() => setError(null)}
                            />
                        )}

                        <Form
                            name="login"
                            onFinish={onFinish}
                            layout="vertical"
                            size="large"
                            className="space-y-4"
                        >
                            <Form.Item
                                name="Email"
                                label={<span className="text-gray-700 font-medium">Correo electrónico</span>}
                                rules={[
                                    { required: true, message: "Por favor ingresa tu email" },
                                    { type: "email", message: "Por favor ingresa un email válido" }
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined className="text-gray-400 mr-2" />}
                                    placeholder="tu@email.com"
                                    className="rounded-xl h-12 border-gray-300 hover:border-[#92b509] focus:border-[#92b509]"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label={<span className="text-gray-700 font-medium">Contraseña</span>}
                                rules={[
                                    { required: true, message: "Por favor ingresa tu contraseña" },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-400 mr-2" />}
                                    placeholder="••••••••"
                                    className="rounded-xl h-12 border-gray-300 hover:border-[#92b509] focus:border-[#92b509]"
                                />
                            </Form.Item>

                            <Form.Item className="mb-0 pt-2">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#92b509] to-[#a8c830] hover:from-[#7a9907] hover:to-[#92b509] border-none text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    {/* Footer decorativo */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 text-center border-t border-gray-200">
                        <p className="text-xs text-gray-500 font-medium">
                            🔒 Panel de Administración Seguro
                        </p>
                    </div>
                </div>

                {/* Texto adicional debajo */}
                <div className="text-center mt-6">
                    <p className="text-white/80 text-sm">
                        © 2024 Bernardo Pelo Polito
                    </p>
                </div>
            </div>
        </Content>
    );
};