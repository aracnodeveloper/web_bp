import React, { useState } from "react";
import Cookies from "js-cookie";
import {
    Alert,
    Button,
    Card,
    Form,
    Input,
    Layout,
    Space,
    Typography,
} from "antd";

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
            const email = values.email || values.Email; // accept either key
            const response = await login(email, values.password);

            if (response && response.success) {
                const token = Cookies.get("accessToken"); //localStorage.getItem('accessToken');
                if (token) {
                    navigate("/administracion", { replace: true });
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
        <>
            <Content className="h-screen flex justify-center items-center">
                <Card className="w-96 p-6 rounded-2xl shadow-lg text-center ">
                    <Space direction="vertical" align="center" size="large">
                        <img
                            className='h-24 w-24 rounded-full object-contain'
                            src='./images/foto_inicio.webp'
                            alt="Foto de inicio"
                        />

                        <Typography.Title level={4} className="m-0">
                            <img className='h-28 sm:h-36' src='./images/logo_vertical.webp' alt="Logo Vertical"/>
                        </Typography.Title>

                        {error && (
                            <Alert
                                message={error}
                                type="error"
                                showIcon
                                className="mb-4"
                            />
                        )}

                        <Form
                            name="login"
                            onFinish={onFinish}
                            className="w-full"
                            layout="vertical"
                        >
                            <Form.Item
                                name="Email"
                                label="Email"
                                rules={[
                                    { required: true, message: "E-mail required" },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: "Password required" },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full"
                                    loading={loading}
                                >
                                    Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                    </Space>
                </Card>
            </Content>
        </>
    );
};