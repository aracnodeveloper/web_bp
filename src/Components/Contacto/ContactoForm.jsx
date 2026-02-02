import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const ContactoForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState({
        message: '',
        type: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFocus = (field) => {
        setFocusedField(field);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const serviceId = 'service_ufrmo5o';
        const templateId = 'template_naf21gn';
        const publicKey = 'b8FnJzq7CCpSd02Jx';

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            to_email: 'polobernardo@gmail.com',
            message: formData.message
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                setStatus({
                    message: 'Mensaje enviado exitosamente!',
                    type: 'success'
                });

                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            })
            .catch((error) => {
                setStatus({
                    message: 'Hubo un error al enviar el mensaje. Por favor, intente nuevamente.',
                    type: 'error'
                });
                console.error('Email send error:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    useEffect(() => {
        if (status.message) {
            const timer = setTimeout(() => {
                setStatus({ message: '', type: '' });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const whatsappNumber = '+593985862555'; // Cleaned up the number format
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[+\s()-]/g, '')}?text=Hola,%20estoy%20interesado%20en%20obtener%20m%C3%A1s%20informaci%C3%B3n`;


    return (
        <div className='bg-gradient-to-b from-teal-50 to-gray-100 py-16'>
            <div className='flex flex-col md:flex-row mx-auto max-w-6xl sm:px-6 lg:px-8 w-full gap-8 lg:gap-16 px-4 relative overflow-hidden'>


                <div className="absolute w-64 h-64 rounded-full bg-[#96c121] opacity-30 -top-20 -left-20 z-0"></div>
                <div className="absolute w-96 h-96 rounded-full bg-[#005F6B] opacity-20 -bottom-48 -right-48 z-0"></div>


                <div className='w-full md:w-6/12 flex flex-col justify-between relative z-10'>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contáctanos</h2>
                        <p className="text-gray-600 mb-8">Estamos aquí para responder tus preguntas y ayudarte a planificar tu próxima aventura en Ecuador.</p>

                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] p-2">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <span className="text-gray-700">polobernardo@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                                >
                                    <div
                                        className="rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] p-2 h-9 -py-1">
                                        <span className="w-5 h-5 text-white icon-[mdi--whatsapp]"/>
                                    </div>
                                    <span className="text-gray-700">+593 0985862555</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <img
                            className='h-auto max-h-[320px] object-contain mx-auto md:mx-0 drop-shadow-xl transform transition-transform hover:scale-105 duration-500'
                            src='./images/contacto_image.webp'
                            alt='Contacto'
                        />
                        <div
                            className="absolute top-1/4 -left-6 h-12 w-12 bg-yellow-100 rounded-full animate-pulse"></div>
                        <div
                            className="absolute bottom-1/4 -right-6 h-16 w-16 bg-teal-100 rounded-full animate-pulse delay-700"></div>
                    </div>
                </div>


                <div className='w-full md:w-6/12 flex flex-col gap-4 relative z-10'>
                    <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
                        <h3 className='font-semibold text-2xl text-gray-800 mb-6'>Envía tu mensaje</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('name')}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border-0 border-b-2 px-1 py-2 pb-3 focus:outline-none focus:ring-0 transition-colors duration-300 ${
                                        focusedField === 'name' ? 'border-teal-500' : 'border-gray-300'
                                    }`}
                                    placeholder='Nombre'
                                    required
                                />
                                <label className={`absolute left-0 transition-all duration-300 pointer-events-none text-sm ${
                                    formData.name || focusedField === 'name' ? '-top-5 text-teal-600 text-xs' : 'top-2 text-gray-500'
                                }`}>

                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border-0 border-b-2 px-1 py-2 pb-3 focus:outline-none focus:ring-0 transition-colors duration-300 ${
                                        focusedField === 'email' ? 'border-teal-500' : 'border-gray-300'
                                    }`}
                                    placeholder='Email'
                                    required
                                />
                                <label className={`absolute left-0 transition-all duration-300 pointer-events-none text-sm ${
                                    formData.email || focusedField === 'email' ? '-top-5 text-teal-600 text-xs' : 'top-2 text-gray-500'
                                }`}>

                                </label>
                            </div>

                            <div className="relative">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('message')}
                                    onBlur={handleBlur}
                                    className={`w-full bg-transparent border-0 border-b-2 px-1 py-2 pb-3 focus:outline-none focus:ring-0 transition-colors duration-300 min-h-[100px] ${
                                        focusedField === 'message' ? 'border-teal-500' : 'border-gray-300'
                                    }`}
                                    placeholder='Mensaje'
                                    required
                                />
                                <label className={`absolute left-0 transition-all duration-300 pointer-events-none text-sm ${
                                    formData.message || focusedField === 'message' ? '-top-5 text-teal-600 text-xs' : 'top-2 text-gray-500'
                                }`}>

                                </label>
                            </div>

                            {status.message && (
                                <div className={`py-3 px-4 rounded-lg flex items-center gap-2 ${
                                    status.type === 'success'
                                        ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                                        : 'bg-red-50 text-red-700 border-l-4 border-red-500'
                                }`}>
                                    {status.type === 'success' ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                        </svg>
                                    )}
                                    {status.message}
                                </div>
                            )}

                            <div className='w-full flex justify-end pt-4'>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className='text-white bg-[#96c121] px-7 py-3 rounded-lg font-medium hover:bg-[#005F6B] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            ENVIANDO...
                                        </>
                                    ) : (
                                        <>
                                            ENVIAR MENSAJE
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactoForm;
