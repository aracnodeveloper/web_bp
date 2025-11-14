import React from 'react';
import ProyectoSection from './ProyectoSection';
import imgP from '../../imagenes/Social/img.png'
import imgP1 from '../../imagenes/Social/img_1.png'
import imgP2 from '../../imagenes/Social/img_2.png'
import imgP3 from '../../imagenes/Social/img_2.webp'
import imgP4 from '../../imagenes/Social/img_3.webp'
import imgP5 from '../../imagenes/Social/img_4.webp'
import imgP6 from '../../imagenes/Social/img_5.webp'
import imgP7 from '../../imagenes/Social/img_6.webp'
import imgP8 from '../../imagenes/Social/img_7.webp'
import imgP9 from '../../imagenes/Social/img_8.webp'
import imgP10 from '../../imagenes/Social/img_9.webp'
import imgP11 from '../../imagenes/Social/img_10.webp'
import imgP12 from '../../imagenes/Social/img_11.webp'
import imgP13 from '../../imagenes/Social/img_12.webp'
import imgP14 from '../../imagenes/Social/img_13.webp'
import imgP15 from '../../imagenes/Social/img_14.webp'
import imgP16 from '../../imagenes/Social/img_15.webp'
import imgP17 from '../../imagenes/Social/img_16.webp'
import imgP18 from '../../imagenes/Social/img_17.webp'
import imgP19 from '../../imagenes/Social/img_18.webp'
import imgP20 from '../../imagenes/Social/img_19.webp'
import imgP21 from '../../imagenes/Social/img_3.png'
import imgP22 from '../../imagenes/Social/img_26.webp'
import imgP23 from '../../imagenes/Social/img_4.png'

const ImpactoSocial = () => {
    return (
        <div className="w-full mx-auto px-4 py-8 sm:py-12 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
                <h1 className='text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]'>Proyecto
                    de Impacto Social</h1>
                <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">Trascendiendo números: el alma de nuestra comunidad
                    digital</h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 mx-auto max-w-3xl">
                    En "Impactos Sociales", vamos más allá de las métricas. Cada interacción, comentario y gesto es una
                    semilla de conexión genuina.
                    En la comunidad de Bernardo Polo, el valor reside en el impacto humano, no en los números.
                    ¡Únete a nosotros y sé parte de algo significativo!
                </p>
            </div>
            <div className="max-w-6xl mx-auto">
                <ProyectoSection
                    titulo="Emprendedores"
                    proyectos={[
                        {
                            imagen: imgP,
                            enlace: "https://www.instagram.com/reel/DOKE1aFEYdy/",
                            mensaje: "El sánduche es con carne pues ñaño… pero este sánduche vegetariano de Pamilas estuvo BRUTAL! @pamilastogo @camipinedaq 🤯😋 ",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP1,
                            enlace: "https://www.instagram.com/reel/DNrJAeJUhxX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
                            mensaje: "El MEJOR bollo que he probado ñaño 🤤😮‍💨 Llegué en mi @cuencataxi a comer en Q’ RIKO BOLLO y ñaño… está como para chuparse los dedos 💥 ",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP2,
                            enlace: "https://www.instagram.com/reel/DN1hR4y4hoX/",
                            mensaje: "Me encontré con estas maravillas de cristales de murano😱 \n" +
                                "\n" +
                                "#bernardopolopolito #turismo #artesanias #ecuador #visitaecuador #Quito #polito #reels",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP21,
                            enlace: "https://www.instagram.com/reel/DNYTp8dN9aD/",
                            mensaje: "🚨¡CONFIRMADO ÑAÑO! Cuenca salvó al cóndor 🦅 \n" +
                                "Me fui a conocer a la primera guambra cóndor CUENCANA de taitas del Azuay 👀 nacida en cautiverio.  Sí ñaño, el cóndor es 100% CUENCANO. 💥\n" +
                                "Lo que hace Amaru Bioparque Cuenca - Zoológico para cuidar a esta especie es puro orgullo cuencano 💛❤️\n" +
                                "Ya sabes... aquí viven más de 2500 especies. ¡Apoya y ponte pilas ñaño! \n" +
                                "@danielnoboaok  @nielsolsen  @czamoramatute ",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP23,
                            enlace: "https://www.instagram.com/reel/DNI7ZLKtIat/",
                            mensaje: "🧺 ¿Canastas con brea y gasolina? 😱\n" +
                                " ¡Pilas ñaño! Estas son las canastas de Luchito en el barrio Juan Pablo en San Joaquín \n" +
                                "\n" +
                                "#bernardopolopolito  #canastas  #visitaecuador  #CuencaEcuador  #producciónlocal #ecuador #PoliTo",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP22,
                            enlace: "https://www.instagram.com/reel/DEgHsrkJCQ3/",
                            mensaje: "ALERTA DE DULCE!! Mochi-licioso 😋",
                            ubicacion: "Cuenca, Ecuador"
                        },
                    ]}
                />

                <ProyectoSection
                    titulo="La Sazón De"
                    proyectos={[
                        {
                            imagen: imgP1,
                            enlace: "https://www.instagram.com/reel/DNrJAeJUhxX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
                            mensaje: "El MEJOR bollo que he probado ñaño 🤤😮‍💨 Llegué en mi @cuencataxi a comer en Q’ RIKO BOLLO y ñaño… está como para chuparse los dedos 💥 ",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP3,
                            enlace: "https://www.instagram.com/reel/DGEWygVp6QK/",
                            mensaje: "Si te gusta la pieza ya sabes donde es! 😉🌭 #HotDogsDeDonMaño #BernardoPolo",
                            ubicacion: "Manabí, Ecuador"
                        },
                        {
                            imagen: imgP4,
                            enlace: "https://www.instagram.com/reel/DFya9PmJMlo/",
                            mensaje: "Güecaquil: Un restaurante costeño bacán con el puro sabor ecuatoriano. 🇪🇨🦞🍤 #BernardoPolo #VisitaEcuador",
                            ubicacion: "Esmeraldas, Ecuador"
                        },
                        {
                            imagen: imgP5,
                            enlace: "https://www.instagram.com/reel/DFYpUzyJkZz/",
                            mensaje: "Nos pegamos unos cueritos en el mercado 😋🤤: La sazón de Estefania Vintimilla #BernardoPolo #VisitaEcuador",
                            ubicacion: "Loja, Ecuador"
                        },
                        {
                            imagen: imgP12,
                            enlace: "https://www.instagram.com/reel/DFOVzHTJloo/",
                            mensaje: "No creerás lo buenas que están éstas fresas con crema!😍🍓 Si eres amante del dulce tienes que ver este video",
                            ubicacion: "Manabí, Ecuador"
                        },
                        {
                            imagen: imgP13,
                            enlace: "https://www.instagram.com/reel/DDP9aRWJWTQ/",
                            mensaje: "Una salchipapa hecha con mucho pero mucho AMORRR!\n" +
                                "\n" +
                                "#bernardopolo #visitaecuador",
                            ubicacion: "Esmeraldas, Ecuador"
                        },
                        {
                            imagen: imgP14,
                            enlace: "https://www.instagram.com/reel/DBrqxP9p1rF/",
                            mensaje: "Preparamos un levanta m*3rto$ !!😱 La Sazón de Oss Ventura.\n" +
                                "\n" +
                                "#bernardopolo #visitaecuador ",
                            ubicacion: "Loja, Ecuador"
                        }
                    ]}
                />

                <ProyectoSection
                    titulo="Longo de Barrio"
                    proyectos={[
                        {
                            imagen: imgP6,
                            enlace: "https://www.instagram.com/reel/DG3RJf6poaC/",
                            mensaje: "Polito Longo de Barrio (Parte 1) #BernardoPolo #BarrioLaGloria",
                            ubicacion: "Ambato, Ecuador"
                        },
                        {
                            imagen: imgP7,
                            enlace: "https://www.instagram.com/reel/DF_VABfpAyN/",
                            mensaje: "Así se ve un cojudo pidiendo comida para llevar !! 🤪 #BernardoPolo #VisitaEcuador #McMary #food ",
                            ubicacion: "Santo Domingo, Ecuador"
                        },
                        {
                            imagen: imgP8,
                            enlace: "https://www.instagram.com/reel/DFd0MD4JJls/",
                            mensaje: "Aquí vuelves a ser un niño!! Una experiencia única la que vivimos en BLOW YOUR MIND. #BernardoPolo #VisitaEcuador",
                            ubicacion: "Machala, Ecuador"
                        },
                        {
                            imagen: imgP15,
                            enlace: "https://www.instagram.com/reel/DE3PTbnpw55/",
                            mensaje: "En ésta cafetería puedes crear tu obra de arte con café en mano TE VA A ENCANTAR !! 😍👩🏻‍🎨☕️🎨 #bernardopolo #visitaecuador ",
                            ubicacion: "Ambato, Ecuador"
                        },
                        {
                            imagen: imgP16,
                            enlace: "https://www.instagram.com/reel/DEyLIrJJhN_/",
                            mensaje: "Una Chococafetería espectacular, ubicada en el corazón de Cuenca 🍫☕️ #bernardopolo #visitaecuado",
                            ubicacion: "Santo Domingo, Ecuador"
                        },
                        {
                            imagen: imgP17,
                            enlace: "https://www.instagram.com/reel/DDiXLpjJgJV/",
                            mensaje: "Mc Mary modo navidad 🎄 🤶 #bernardopolo #visitaecuador #McMary",
                            ubicacion: "Machala, Ecuador"
                        }
                    ]}
                />

                <ProyectoSection
                    titulo="Los Clásicos"
                    proyectos={[
                        {
                            imagen: imgP9,
                            enlace: "https://www.instagram.com/reel/C0nE-7bx15F/",
                            mensaje: "Me pasó lo mismo que la Luisito!….netflix? #luisitocomunica #dientes #netflix",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP10,
                            enlace: "https://www.instagram.com/reel/C1p-RV9J22h/",
                            mensaje: "Explorando la CASA EMBRUJADA de Cuenca..misterios PARANORMALES🧟‍🦇",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP11,
                            enlace: "https://www.instagram.com/reel/CkRuvyDJHdE/",
                            mensaje: "No es de la forma que pensaban 😅\n" +
                                "\n" +
                                "#bernardopolo #hotelesfullvacations #clubvisita #disneyconcierge",
                            ubicacion: "Otavalo, Ecuador"
                        },
                        {
                            imagen: imgP18,
                            enlace: "https://www.instagram.com/reel/DDvGVb2JaG5/",
                            mensaje: "Bumblebee llegó a Visita Ecuador!!\n" +
                                "\n" +
                                "#bernardopolo #vistaecuador #polito #Bumblebee",
                            ubicacion: "Riobamba, Ecuador"
                        },
                        {
                            imagen: imgP19,
                            enlace: "https://www.instagram.com/reel/DAFGkBSpsXJ/",
                            mensaje: "🤪Pachito te lo lava 🫧\n" +
                                "Por solo $7 te lo deja reluciente no importa si es 4x4 o deportivo #bernardopolo ",
                            ubicacion: "Ibarra, Ecuador"
                        },
                        {
                            imagen: imgP20,
                            enlace: "https://www.instagram.com/reel/C_wMrSyp-Qp/",
                            mensaje: "Festividades ancestrales que unen a las comunidades",
                            ubicacion: "Otavalo, Ecuador"
                        }
                    ]}
                />
                <ProyectoSection
                    titulo="Toma mi Mano 🤝"
                    proyectos={[
                        {
                            imagen: imgP9,
                            enlace: "https://www.instagram.com/reel/C0nE-7bx15F/",
                            mensaje: "Me pasó lo mismo que la Luisito!….netflix? #luisitocomunica #dientes #netflix",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP10,
                            enlace: "https://www.instagram.com/reel/C1p-RV9J22h/",
                            mensaje: "Explorando la CASA EMBRUJADA de Cuenca..misterios PARANORMALES🧟‍🦇",
                            ubicacion: "Cuenca, Ecuador"
                        },
                        {
                            imagen: imgP11,
                            enlace: "https://www.instagram.com/reel/CkRuvyDJHdE/",
                            mensaje: "No es de la forma que pensaban 😅\n" +
                                "\n" +
                                "#bernardopolo #hotelesfullvacations #clubvisita #disneyconcierge",
                            ubicacion: "Otavalo, Ecuador"
                        },
                        {
                            imagen: imgP18,
                            enlace: "https://www.instagram.com/reel/DDvGVb2JaG5/",
                            mensaje: "Bumblebee llegó a Visita Ecuador!!\n" +
                                "\n" +
                                "#bernardopolo #vistaecuador #polito #Bumblebee",
                            ubicacion: "Riobamba, Ecuador"
                        },
                        {
                            imagen: imgP19,
                            enlace: "https://www.instagram.com/reel/DAFGkBSpsXJ/",
                            mensaje: "🤪Pachito te lo lava 🫧\n" +
                                "Por solo $7 te lo deja reluciente no importa si es 4x4 o deportivo #bernardopolo ",
                            ubicacion: "Ibarra, Ecuador"
                        },
                        {
                            imagen: imgP20,
                            enlace: "https://www.instagram.com/reel/C_wMrSyp-Qp/",
                            mensaje: "Festividades ancestrales que unen a las comunidades",
                            ubicacion: "Otavalo, Ecuador"
                        }
                    ]}
                />


            </div>
        </div>
    );
};

export default ImpactoSocial;
