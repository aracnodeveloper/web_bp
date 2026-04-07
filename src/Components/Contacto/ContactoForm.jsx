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
    const [showQR, setShowQR] = useState(false);

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

    const whatsappNumber = '+593985862555';
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
                                    <div className="rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] p-2 h-9 -py-1">
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
                        <div className="absolute top-1/4 -left-6 h-12 w-12 bg-yellow-100 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-1/4 -right-6 h-16 w-16 bg-teal-100 rounded-full animate-pulse delay-700"></div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className='w-full md:w-6/12 flex flex-col gap-4 relative z-10'>

                    {showQR ? (
                        /* ── QR VIEW ── */
                        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center gap-3 min-h-[420px] transform transition-all duration-500 hover:shadow-xl">
                            <h3 className='font-semibold text-xl text-gray-800'>Escanea el QR</h3>
                            <p className="text-gray-500 text-sm text-center">Apunta la cámara de tu teléfono para conectarte directamente con nosotros.</p>
                            <img
                                src='/images/qr.jpeg'
                                alt='QR Code'
                                className='w-80 h-80 object-contain drop-shadow-lg rounded-lg'
                            />
                            <button
                                onClick={() => setShowQR(false)}
                                className='text-white bg-[#005F6B] px-7 py-3 rounded-lg font-medium hover:bg-[#96c121] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2'
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Volver al formulario
                            </button>
                        </div>
                    ) : (
                        /* ── FORM VIEW ── */
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
                                    }`}></label>
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
                                    }`}></label>
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
                                    }`}></label>
                                </div>

                                {status.message && (
                                    <div className={`py-3 px-4 rounded-lg flex items-center gap-2 ${
                                        status.type === 'success'
                                            ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                                            : 'bg-red-50 text-red-700 border-l-4 border-red-500'
                                    }`}>
                                        {status.type === 'success' ? (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* QR thumbnail strip — hidden when QR is fullscreen */}
                    {!showQR && (
                        <div className='flex flex-wrap w-full items-center gap-6 p-4 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl'>
                            <img
                                src='/images/qr.jpeg'
                                alt='QR'
                                className='w-20 h-20 object-contain mx-auto md:mx-0 drop-shadow-xl transform transition-transform hover:scale-105 duration-500'
                            />
                            <div className='pt-4'>
                                <button
                                    onClick={() => setShowQR(true)}
                                    className='text-white bg-[#96c121] px-7 py-3 rounded-lg font-medium hover:bg-[#005F6B] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2'
                                >
                                    Escanear QR
                                    <svg className='h-5 w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 4C5.11929 4 4 5.11929 4 6.5V7C4 7.55228 3.55228 8 3 8C2.44772 8 2 7.55228 2 7V6.5C2 4.01472 4.01472 2 6.5 2H7C7.55228 2 8 2.44772 8 3C8 3.55228 7.55228 4 7 4H6.5Z" fill="#FFFFFF"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.9598 6C10.294 5.99998 9.73444 5.99997 9.27657 6.03738C8.79785 6.07649 8.34289 6.16143 7.91103 6.38148C7.25247 6.71703 6.71703 7.25247 6.38148 7.91103C6.16143 8.34289 6.07649 8.79785 6.03738 9.27657C6.01958 9.49452 6.01025 9.73549 6.00536 10H4C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12H20C20.5523 12 21 11.5523 21 11C21 10.4477 20.5523 10 20 10H17.9946C17.9898 9.73549 17.9804 9.49451 17.9626 9.27657C17.9235 8.79785 17.8386 8.34289 17.6185 7.91103C17.283 7.25247 16.7475 6.71703 16.089 6.38148C15.6571 6.16143 15.2021 6.07649 14.7234 6.03738C14.2656 5.99997 13.706 5.99998 13.0402 6H10.9598ZM15.9943 10C15.99 9.7843 15.9825 9.60112 15.9693 9.43944C15.9403 9.0844 15.889 8.92194 15.8365 8.81901C15.6927 8.53677 15.4632 8.3073 15.181 8.16349C15.0781 8.11105 14.9156 8.05975 14.5606 8.03074C14.1938 8.00078 13.7166 8 13 8H11C10.2834 8 9.80615 8.00078 9.43944 8.03074C9.0844 8.05975 8.92194 8.11105 8.81901 8.16349C8.53677 8.3073 8.3073 8.53677 8.16349 8.81901C8.11105 8.92194 8.05975 9.0844 8.03074 9.43944C8.01753 9.60112 8.00999 9.7843 8.00569 10H15.9943Z" fill="#FFFFFF"/>
                                        <path d="M14.0757 18L10.9598 18C10.2941 18 9.7344 18 9.27657 17.9626C8.79785 17.9235 8.34289 17.8386 7.91103 17.6185C7.25247 17.283 6.71703 16.7475 6.38148 16.089C6.34482 16.017 6.32528 15.9835 6.29997 15.9401C6.28429 15.9132 6.26639 15.8825 6.24083 15.8365C6.17247 15.7135 6.09846 15.5585 6.05426 15.342C6.01816 15.1651 6.00895 14.9784 6.00455 14.795C6 14.6058 6 14.3522 6 14.0159V14C6 13.4477 6.44772 13 7 13C7.55229 13 8 13.4477 8 14C8 14.3558 8.00007 14.5848 8.00397 14.7469C8.0058 14.823 8.00837 14.872 8.01047 14.9021C8.04313 14.9585 8.10631 15.0688 8.16349 15.181C8.3073 15.4632 8.53677 15.6927 8.81901 15.8365C8.92194 15.889 9.0844 15.9403 9.43944 15.9693C9.80615 15.9992 10.2834 16 11 16H14C14.5027 16 14.6376 15.9969 14.7347 15.9815C15.3765 15.8799 15.8799 15.3765 15.9815 14.7347C15.9969 14.6376 16 14.5027 16 14C16 13.4477 16.4477 13 17 13C17.5523 13 18 13.4477 18 14L18 14.0757C18.0002 14.4657 18.0003 14.7734 17.9569 15.0475C17.7197 16.5451 16.5451 17.7197 15.0475 17.9569C14.7734 18.0003 14.4657 18.0002 14.0757 18Z" fill="#FFFFFF"/>
                                        <path d="M22 17C22 16.4477 21.5523 16 21 16C20.4477 16 20 16.4477 20 17V17.5C20 18.8807 18.8807 20 17.5 20H17C16.4477 20 16 20.4477 16 21C16 21.5523 16.4477 22 17 22H17.5C19.9853 22 22 19.9853 22 17.5V17Z" fill="#FFFFFF"/>
                                        <path d="M16 3C16 2.44772 16.4477 2 17 2H17.5C19.9853 2 22 4.01472 22 6.5V7C22 7.55228 21.5523 8 21 8C20.4477 8 20 7.55228 20 7V6.5C20 5.11929 18.8807 4 17.5 4H17C16.4477 4 16 3.55228 16 3Z" fill="#FFFFFF"/>
                                        <path d="M4 17C4 16.4477 3.55228 16 3 16C2.44772 16 2 16.4477 2 17V17.5C2 19.9853 4.01472 22 6.5 22H7C7.55228 22 8 21.5523 8 21C8 20.4477 7.55228 20 7 20H6.5C5.11929 20 4 18.8807 4 17.5V17Z" fill="#FFFFFF"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactoForm;