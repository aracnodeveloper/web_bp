import  { useState, useEffect, useMemo } from 'react';
import Destacado from './Destacado';
import imgP from '../../imagenes/Social/instas.webp';
import imgP1 from '../../imagenes/Social/img_1.webp'
import imgP4 from '../../imagenes/Social/img_3.webp'
import imgP7 from '../../imagenes/Social/img_6.webp'
import imgP20 from '../../imagenes/img_20.webp'
import imgP21 from '../../imagenes/img_21.webp'
import imgP22 from '../../imagenes/img_22.webp'
import imgP23 from '../../imagenes/img_23.webp'
import imgP24 from '../../imagenes/img_24.webp'

const Contenido = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [visiblePosts, setVisiblePosts] = useState([]);

    const allPosts = useMemo(() => [

        //FACEBOOK
        {
            id: 1,
            fecha: "08 de junio de 2022",
            iconoRed: <span className="icon-[ri--facebook-fill] h-6 w-6 text-[#3b5998]"></span>,
            colorRed: "#3b5998",
            linkPost: "https://www.facebook.com/watch/?v=691013228632325",
            linkPerfil: "https://www.facebook.com/bernardopolopolito",
            imagePost: "./images/img_4.png",
            mensajePost: "El aeropuerto de Cuenca ahora también es un centro comercial Bacán!!! Cristian Zamora - Alcalde de Cuenca 2023 Aeropuerto Cuenca Bernardo Polo #VisitaEcuador #BernardoPolo #Aeropuerto #Cuenca #innovacion #trabajo #alcaldia",
            platform: "facebook"
        },
        {
            id: 8,
            fecha: "07 de marzo de 2025",
            iconoRed: <span className="icon-[ri--facebook-fill] h-6 w-6 text-[#3b5998]"></span>,
            colorRed: "#3b5998",
            linkPost: "https://www.facebook.com/bernardopolopolito/videos/972486391672261",
            linkPerfil: "https://www.facebook.com/bernardopolopolito",
            imagePost: imgP20,
            mensajePost: "Peugeot NUNCA MÁS !!\n" +
                "3 Razones por las que jamás volvería a comprar un Peugeot\n" +
                "#BernardoPolo #VisitaEcuador #Peugeot #marca #NuncaMas #autos #falla Bernardo Polo",
            platform: "facebook"
        },
        {
            id: 9,
            fecha: "07 de marzo de 2025",
            iconoRed: <span className="icon-[ri--facebook-fill] h-6 w-6 text-[#3b5998]"></span>,
            colorRed: "#3b5998",
            linkPost: "https://www.facebook.com/bernardopolopolito/videos/1265249671208902",
            linkPerfil: "https://www.facebook.com/bernardopolopolito",
            imagePost: imgP7,
            mensajePost: "Así se ve un cojudo pidiendo comida para llevar !! 🤪 #BernardoPolo #VisitaEcuador #McMary #food #fastfood #hamburgesas #delivery #ComidaParaLlevar #CojudoYContento #DeliveryFail #ComiendoComoCojudo #RisaYComida\n" +
                "#CojudoYHambriento #Cuenca #viral #humor #contenido #Ecuador Mac Mary Cuenca Bernardo Polo",
            platform: "facebook"
        },


        //INS/FANPAGE
        {
            id: 2,
            fecha: "28 de octubre de 2024",
            iconoRed: <span className="icon-[mdi--instagram] h-6 w-6 text-[#dd2a7b]"></span>,
            colorRed: "#dd2a7b",
            linkPost: "https://www.instagram.com/p/CkRuvyDJHdE/",
            linkPerfil: "https://www.instagram.com/bernardopolopolito/",
            imagePost: "./images/destacado_instagram.webp",
            mensajePost: "No es de la forma que pensaban 😅 #bernardopolo #hotelesfullvacations #clubvisita #disneyconcierge #fenancaptour #yovendoazuay #yovendoguayaquil #Ecuador #Turismo #cangrejos #comida #food #mariscos #churute #guayaquil",
            platform: "instagram"
        },
        {
            id: 15,
            fecha: "22 de Abril de 2025",
            iconoRed: <span className="icon-[mdi--instagram] h-6 w-6 text-[#dd2a7b]"></span>,
            colorRed: "#dd2a7b",
            linkPost: "https://www.instagram.com/reel/DIxD8aSxpx4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
            linkPerfil: "https://www.instagram.com/bernardopolopolito/",
            imagePost: "./images/img_5.png",
            mensajePost: "Porqué todo el mundo habla de éste auto?? Aquí la razón ⬇️ #BernardoPolo #VisitaEcuador #BYD #Auto #Electrico #innovacion #medioambiente #velocidad #futuro  #Viral",
            platform: "instagram"
        },
        {
            id: 16,
            fecha: "10 de marzo de 2025",
            iconoRed: <span className="icon-[mdi--instagram] h-6 w-6 text-[#dd2a7b]"></span>,
            colorRed: "#dd2a7b",
            linkPost: "https://www.instagram.com/reel/DIewJv_z_rc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
            linkPerfil: "https://www.instagram.com/bernardopolopolito/",
            imagePost: "./images/img_6.png",
            mensajePost: "Precio de distribuidor para todos! 😱😱 Victoria Salcedo aprueba los zapatos de #Ivannas #BernardoPolo #VictoriaSalcedo #ChocolateFilmsEc #VisitaEcuador #Turismo #Emprendimiento #Zapatos #comodidad #calidad #Gualaceo #Viral #Cuenca",
            platform: "instagram"
        },


        //TIKTOK
        {
            id: 10,
            fecha: "03 de enero de 2024",
            iconoRed: <span className="icon-[mingcute--tiktok-fill] h-6 w-6 text-black"></span>,
            colorRed: "#000000",
            linkPost: "https://www.tiktok.com/@bernardopolopolito/video/7481020990613409029",
            linkPerfil: "https://www.tiktok.com/@bernardopolopolito",
            imagePost: "./images/img_7.png",
            mensajePost: "Peugeot NUNCA MÁS !! La historia completa. #BernardoPolo #VisitaEcuador #Peugeot #falla #NuncaMas #Viral",
            platform: "tiktok"
        },
        {
            id: 11,
            fecha: "02 de febrero de 2025",
            iconoRed: <span className="icon-[mingcute--tiktok-fill] h-6 w-6 text-black"></span>,
            colorRed: "#000000",
            linkPost: "https://www.tiktok.com/@bernardopolopolito/video/7448043683816934662",
            linkPerfil: "https://www.tiktok.com/@bernardopolopolito",
            imagePost: "./images/img_8.png",
            mensajePost: "Mc Mary modo navidad 🎄 🤶 #bernardopolo #visitaecuador #McMary #Hamburguesas #LasMejoresHamburguesas #OjalaTeAtores #Sonsonazo @McMary Cuenca",
            platform: "tiktok"
        },
        {
            id: 12,
            fecha: "01 de enero de 2020",
            iconoRed: <span className="icon-[mingcute--tiktok-fill] h-6 w-6 text-black"></span>,
            colorRed: "#000000",
            linkPost: "https://www.tiktok.com/@bernardopolopolito/video/7448052915199069446",
            linkPerfil: "https://www.tiktok.com/@bernardopolopolito",
            imagePost: "./images/img_9.png",
            mensajePost: "El sonsonazo sí existe !! 😱😱😱 @McMary Cuenca #Bernardopolo #visitaecuador #McMary #sonsonazo #hamburguesas #comida #food #fastfood #navidad",
            platform: "tiktok"
        },


        //YOUTUBE
        {
            id: 4,
            fecha: "05 de marzo de 2024",
            iconoRed: <span className="icon-[mdi--youtube] h-6 w-6 text-[#c4302b]"></span>,
            colorRed: "#c4302b",
            linkPost: "https://www.youtube.com/watch?v=AyV6vy9NyMI&t=552s",
            linkPerfil: "https://www.youtube.com/@bernardopolopolito",
            imagePost: "./images/destacado_youtube.webp",
            mensajePost: "De empleada domestica a EMPRESARIA 😱👏🔝 #elsalado #ecuador #azuay #cuenca #visitaecuador #viral #Ecuador #PoliTo #visitaecuador #bernardopolo #emprendedoresdeexito #VISITANOS #viral #virals #tour #PolitoRecomienda #ElPadrinoPolito #elpolitoteinvita  #morcho #estadosunidos #empoderamiento #empresaria  #mujeres",
            platform: "youtube"
        },
        {
            id: 13,
            fecha: "02 de septiembre de 2022",
            iconoRed: <span className="icon-[mdi--youtube] h-6 w-6 text-[#c4302b]"></span>,
            colorRed: "#c4302b",
            linkPost: "https://www.youtube.com/watch?v=BlUzarq9ZXw",
            linkPerfil: "https://www.youtube.com/@bernardopolopolito",
            imagePost: imgP21,
            mensajePost: "#HackerDelTurismo #EmpresarioDisruptivo #Bloguero\n" +
                "¿quieres saber dónde comer el mejor encebollado de Guayaquil? Mira éste video y entérate junto a Holbach Muñetón, presidente de la Federación de Cámaras de Turismo del Ecuador FENACAPTUR.",
            platform: "youtube"
        },
        {
            id: 14,
            fecha: "19 de junio de 2024",
            iconoRed: <span className="icon-[mdi--youtube] h-6 w-6 text-[#c4302b]"></span>,
            colorRed: "#c4302b",
            linkPost: "https://www.youtube.com/watch?v=xSksCVoN0-c",
            linkPerfil: "https://www.youtube.com/@bernardopolopolito",
            imagePost: imgP22,
            mensajePost: "Las alitas más PICANTES del Cuenca 🥵 / Atención‼️ Video PICANTE y con SORPRESA 😳🤩\n" +
                "\n" +
                "🔋Pilas Pilas Pilasssss, mira todo el video y GANATE 1 de estas deliciosas ordenes de hamburgesas y alitas😋\n" +
                "\n" +
                "Requisitos? Participar, compartir, seguir a Bernardo Polo Polito y Alasas Cuenca 🔝\n" +
                "\n" +
                "#cuenca #alasascuenca #ecuador #politoinvita #Ecuador #PoliTo #alaitas #viral #virals #emprendedoresdeexito #PolitoRecomienda #picante #bebida #restaurante",
            platform: "youtube"
        },


        //LINKEIND
        {
            id: 5,
            fecha: "03 de mayo de 2024",
            iconoRed: <span className="icon-[akar-icons--linkedinv2-fill] h-6 w-6 text-[#0e76a8]"></span>,
            colorRed: "#0e76a8",
            linkPost: "https://es.linkedin.com/posts/bernardo-polo-polito-70560250_acabando-con-los-saya-jeans-en-la-feria-libre-activity-7192293823203475456-mEFB?trk=public_profile",
            linkPerfil: "https://www.linkedin.com/in/bernardo-polo-polito-70560250",
            imagePost: "./images/destacado_linkedin.webp",
            mensajePost: "Acabando con los SAYA-JEANS en la Feria Libre 👖🤣 PayPhone #cuenca #ferialibre#visitaecuador #PoliTo #visitaecuador #bernardopolo #emprendedoresdeexito #PolitoRecomienda #fashion #jeans #moda",
            platform: "linkedin"
        },


        //X
        {
            id: 6,
            fecha: "01 de mayo de 2024",
            iconoRed: <span className="icon-[ph--x-logo-bold] h-6 w-6 text-black"></span>,
            colorRed: "#000000",
            linkPost: "https://twitter.com/bernardopolo10/status/1785801895300259930?s=46&t=Gc-sy8GhHrdeEtlmQlStbQ",
            linkPerfil: "https://twitter.com/bernardopolo10",
            imagePost: "./images/destacado_x.webp",
            mensajePost: "Mis SEGUIDORES me dejan CHIRO por regalarles LANGOSTINOS del Abogado tírate un paso 🥲🦐 Dolger Velasquez PayPhone #dolgervelasquez#cuenca #cangrejoscuenca#ecuador #visitaecuador #PoliTo #visitaecuador #emprendedoresdeexito #VISITANOS #PolitoRecomienda #ElPadrinoPolito #politoteinvita #cangrejo #abogadotirateunpaso",
            platform: "twitter"
        },


        //INS/PERSONAL
        {
            id: 7,
            fecha: "06 de marzo de 2025",
            iconoRed: <span className="icon-[mdi--instagram] h-6 w-6 text-[#dd2a7b]"></span>,
            colorRed: "#dd2a7b",
            linkPost: "https://www.instagram.com/reel/DJ7KG8xxcY9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA== ",
            linkPerfil: "https://www.instagram.com/bernardopoloa/",
            imagePost: "./images/img_10.png",
            mensajePost: "@pacoelmorlaco sueña con poder ayudar a mas personas, ayúdanos a llegar a las personas que más lo necesitan #pacoelmorlaco #protesis #ayuda #fundacion #social #apoyo #donar #mano",
            platform: "instagram"
        }
    ], []);

    useEffect(() => {
        if (activeTab === 'all') {
            setVisiblePosts(allPosts);
        } else {
            setVisiblePosts(allPosts.filter(post => post.platform === activeTab));
        }
    }, [activeTab, allPosts]);

    const platforms = [
        { id: 'all', name: 'Todo', icon: <span className="icon-[heroicons--squares-2x2] h-5 w-5"></span> },
        { id: 'instagram', name: 'Instagram', icon: <span className="icon-[mdi--instagram] h-5 w-5 text-[#dd2a7b]"></span> },
        { id: 'facebook', name: 'Facebook', icon: <span className="icon-[ri--facebook-fill] h-5 w-5 text-[#3b5998]"></span> },
        { id: 'tiktok', name: 'TikTok', icon: <span className="icon-[mingcute--tiktok-fill] h-5 w-5"></span> },
        { id: 'youtube', name: 'YouTube', icon: <span className="icon-[mdi--youtube] h-5 w-5 text-[#c4302b]"></span> },
        { id: 'linkedin', name: 'LinkedIn', icon: <span className="icon-[akar-icons--linkedinv2-fill] h-5 w-5 text-[#0e76a8]"></span> },
        { id: 'twitter', name: 'Twitter', icon: <span className="icon-[ph--x-logo-bold] h-5 w-5"></span> }
    ];

    return (
        <div className="bg-gray-50 py-8" id="contenido">
            <div id='explora' className='flex flex-col gap-6 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full'>
                <div className="mb-6">
                    <h2 className='text-2xl font-semibold'>Explora mi contenido</h2>
                    <p className='text-gray-500 text-sm'>
                        ¡Descubre mi esencia en cada publicación! Sumérgete en el universo digital
                        que he creado para ti. ¡Bienvenido a mi selección de contenido!
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {platforms.map(platform => (
                        <button
                            key={platform.id}
                            onClick={() => setActiveTab(platform.id)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${
                                activeTab === platform.id
                                    ? 'bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {platform.icon}
                            <span>{platform.name}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {visiblePosts.map(post => (
                        <Destacado
                            key={post.id}
                            fecha={post.fecha}
                            iconoRed={post.iconoRed}
                            colorRed={post.colorRed}
                            linkPost={post.linkPost}
                            linkPerfil={post.linkPerfil}
                            imagePost={post.imagePost}
                            mensajePost={post.mensajePost}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contenido;
