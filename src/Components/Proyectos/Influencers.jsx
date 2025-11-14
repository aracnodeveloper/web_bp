import React from "react";
import ProyectoSection from "./ProyectoSection";
import imgP from "../../imagenes/Influencers/img_29.webp";
import imgP1 from "../../imagenes/Influencers/img_5.webp";
import imgP2 from "../../imagenes/Influencers/img.webp";
import imgP3 from "../../imagenes/Influencers/img_6.webp";
import imgP4 from "../../imagenes/Influencers/img_7.webp";
import imgP5 from "../../imagenes/Influencers/img_3.webp";
import imgP6 from "../../imagenes/Influencers/img_4.webp";
import imgP7 from "../../imagenes/Influencers/img_8.webp";
import imgP8 from "../../imagenes/Influencers/img_9.webp";
import imgP9 from "../../imagenes/Influencers/img_10.png";
import imgP10 from "../../imagenes/Influencers/img_11.webp";
import imgP11 from "../../imagenes/Influencers/img_12.webp";
import imgP12 from "../../imagenes/Influencers/img_13.webp";
import imgP13 from "../../imagenes/Influencers/img_14.webp";
import imgP15 from "../../imagenes/Influencers/img_16.webp";
import imgP16 from "../../imagenes/Influencers/img_17.webp";
import imgP17 from "../../imagenes/Influencers/img_20.webp";
import imgP18 from "../../imagenes/Influencers/img_19.webp";
import imgP19 from "../../imagenes/Influencers/img_23.webp";
import imgP20 from "../../imagenes/Influencers/img_22.webp";
import imgP21 from "../../imagenes/Influencers/img_24.webp";
import imgP22 from "../../imagenes/Influencers/img_25.webp";
import imgP23 from "../../imagenes/Influencers/img_26.webp";
import imgP24 from "../../imagenes/Influencers/img_27.webp";
import imgP25 from "../../imagenes/Influencers/img_28.webp";
import imgP26 from "../../imagenes/Influencers/img_31.webp";
import imgP27 from "../../imagenes/Influencers/img_32.webp";
import imgP28 from "../../imagenes/Influencers/img_33.webp";
import imgP29 from "../../imagenes/Influencers/img_35.webp";
import imgP30 from "../../imagenes/Influencers/img_37.webp";
import imgP31 from "../../imagenes/Influencers/img_38.webp";
import imgP32 from "../../imagenes/Influencers/img_39.webp";
import imgP33 from "../../imagenes/Influencers/img_40.webp";
import imgP34 from "../../imagenes/Influencers/img_41.webp";
import imgP35 from "../../imagenes/Influencers/img_42.webp";
import imgP36 from "../../imagenes/Influencers/img_43.webp";
import imgP37 from "../../imagenes/Influencers/img_44.webp";
import imgP38 from "../../imagenes/Influencers/img_45.webp";
import imgP39 from "../../imagenes/Influencers/img_46.webp";
import imgP40 from "../../imagenes/Influencers/img_47.webp";
import imgP41 from "../../imagenes/Influencers/img.png";
import imgP42 from "../../imagenes/Influencers/img_1.png";
import imgP43 from "../../imagenes/Influencers/img_2.png";

import CreadoresNetworking from "./CreadoresNetworking";

const Influencers = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121]">
          Programa de Influencers
        </h1>
        <h2 className="text-xl sm:text-2xl mb-4">
          Embajadores digitales del Ecuador
        </h2>
        <p className="text-base sm:text-lg mb-8 mx-auto">
          Con Visita Ecuador, queremos que los influencers viajen por todo
          nuestro hermoso Ecuador para activar el turismo y mejorar la economía
          del país. A través de su alcance y autenticidad, estos creadores de
          contenido pueden mostrar la riqueza cultural, natural y gastronómica
          de nuestras regiones, generando un impacto positivo en las comunidades
          locales y atrayendo visitantes tanto nacionales como internacionales.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <CreadoresNetworking />

        <ProyectoSection
          titulo="Gastronomía Local"
          proyectos={[
            {
              imagen: imgP42,
              enlace:
                "https://www.instagram.com/reel/DJnLG9zxadu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
              mensaje:
                "😱 Caldo de Salchicha con 🦀 \n" +
                "Estas cosas solo se las encuentran en Guayaquil tu que Opinas, te gustaría Probarlo?\n" +
                "#caldodesalchica #caldodecangrejo #caldo #guayaquil #polito #bernardopolo",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP43,
              enlace: "https://www.instagram.com/reel/DIzpXE0xtUi/",
              mensaje:
                "Las tripas del gordo y la suca ¿La mejor chanfaina  de Cuenca? #BernardoPolo #VisitaEcuador #huecas #chanfaina #comida #viral #tripas",
              ubicacion: "Cuenca, Ecuador",
            },
            {
              imagen: imgP9,
              enlace:
                "https://www.tiktok.com/@visitaecuadorinfl/video/7327353822030892294?_r=1&_t=ZM-8uxEcSeIWu5",
              mensaje:
                "Víctor León estuvo por el Mercado 27 de Febrero deleitando su paladar con un delicioso hornado, gracias a Visita Ecuador Influencers.",
              ubicacion: "Cuenca, Ecuador",
            },
            {
              imagen: imgP10,
              enlace:
                "https://www.tiktok.com/@visitaecuador.com/video/7406461590242905349?_r=1&_t=ZM-8uxHX2S4Y5d",
              mensaje:
                "Las 3 botellas son tuyas mira cómo retirarlas 🍾 \n" +
                " Hoy vinimos a la Cava San Miguel y mira lo que pasó 😏  #bernardopolo  #polito  #visitaecuador  ",
              ubicacion: "Los Ríos, Ecuador",
            },
            {
              imagen: imgP13,
              enlace:
                "https://www.tiktok.com/@bernardopolopolito/video/7442068121470405943",
              mensaje:
                "Ver este video te hará querer probar estos ceviches ahora!🍋🍤 La sazón de Maury Garnica 😋 ",
              ubicacion: "Esmeraldas, Ecuador",
            },
            {
              imagen: imgP18,
              enlace:
                "https://www.tiktok.com/@museodelagastronomia/video/7484722918811798791?_r=1&_t=ZM-8uxMDLuQCRj",
              mensaje:
                "Por 0,45 centavos una picadita en @CasaYangoe  😋🤯❤️ Pueden comprar el Azuay Turístico en el Museo y en todas las empresas participantes 🇪🇨",
              ubicacion: "Azuay, Ecuador",
            },
            {
              imagen: imgP20,
              enlace: "https://www.instagram.com/reel/DHAImayp2an/",
              mensaje: "Que buen seco por santa. 🐷🐽 #cuenca #ecuador #seco",
              ubicacion: "Los Ríos, Ecuador",
            },
            {
              imagen: imgP41,
              enlace:
                "https://www.instagram.com/reel/DL5sYy2oOoD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
              mensaje:
                "Ñaño, la sazón de Cevicheria 7 Palos está como para chuparse los dedos 🦐💥\n" +
                "¡Ponte pilas!\n" +
                "@cevicheria7_palos \n" +
                "\n" +
                "#cuencaecuador #bernardopolopolito #cevicheria7palos #gastronomia #comidacosteña #visitaecuador #comidaecuatoriana #foodlover #PoliTo",
              ubicacion: "Cuenca, Ecuador",
            },
          ]}
        />

        <ProyectoSection
          titulo="Cultura y Turismo"
          proyectos={[
            {
              imagen: imgP12,
              enlace:
                "https://www.tiktok.com/@visitaecuadorinfl/video/7320668120027385093?is_from_webapp=1&web_id=7478707606246213126",
              mensaje:
                "¿Sabías que? Paco el Morlaco conoció al diseñador en común que tienen el Papa, la Reina Sofía y Salma Hayek… 🧶 ",
              ubicacion: "Gualaceo, Ecuador",
            },
            {
              imagen: imgP16,
              enlace: "https://www.instagram.com/p/C1uwTfxJhT5/",
              mensaje:
                "¿Tenías idea de qué? Con VisitaEcuador.com puedes entrar a lugares no antes explorados como es la Casa de las Cruces donde existe mucho misterio en saber ",
              ubicacion: "Cuenca, Ecuador",
            },
            {
              imagen: imgP17,
              enlace:
                "https://www.tiktok.com/@visitaecuadorinfl/video/7320313444085828870?is_from_webapp=1&web_id=7478707606246213126",
              mensaje:
                "Paco el Morlaco pedaleo 300 km en su bici hecha con más de 450 botellas PET hacia lo más alto…. EL CHIMBORAZO 🚵🏻🗻",
              ubicacion: "Chimborazo, Ecuador",
            },
            {
              imagen: imgP21,
              enlace: "https://www.instagram.com/reel/DFYFpFIPkEt/",
              mensaje:
                "Desbloqueando nuevos lugares en la bella provincia de Santa Elena 📸📹 @denisseroxx\n" +
                "Unblocking new spots on the Ecuadorian coast 📸 @denisseroxx\n" +
                "#ecuador #santaelena#visitecuador",
              ubicacion: "Santa Elena, Ecuador",
            },
            {
              imagen: "./images/proyecto_imagen01.webp",
              enlace: "https://ejemplo.com/cultura2",
              mensaje: "Tejidos ancestrales: técnicas y simbolismos",
              ubicacion: "Tungurahua, Ecuador",
            },
            {
              imagen: "./images/proyecto_imagen01.webp",
              enlace: "https://ejemplo.com/cultura3",
              mensaje: "Lenguas originarias y su preservación cultural",
              ubicacion: "Pastaza, Ecuador",
            },
          ]}
        />

        <ProyectoSection
          titulo="Hoteles"
          proyectos={[
            {
              imagen: imgP,
              enlace:
                "https://www.tiktok.com/@jorgeanibalcassis/video/7386770049886932229?_r=1&_d=secCgYIASAHKAESPgo8FxFM7H9eTNlvanfQ8V8fWjN6sNdUC9tGXMOuJfupV%2B1ZBr9NNyPOFR52xvfOEPK%2BmfxcrFsGlztg3PdfGgA%3D&u_code=dd5eafk33deb56&share_item_id=7386770049886932229&timestamp=1725891763&share_app_id=1233",
              mensaje:
                "Deben aprovechar que con mi código, les dan 2 años de suscripción por el pago de 1 !!! \n" +
                " Pilassssss \n" +
                "   #laquinta  #visitaecuador  ",
              ubicacion: "Quito, Ecuador",
            },
            {
              imagen: imgP1,
              enlace:
                "https://www.tiktok.com/@kamiramona/video/7375240984218586374?_r=1&_t=ZM-8ux7qc5v6r1",
              mensaje:
                "Ya conoces Lojaaa? Acá un tip de hospedaje #hoteles #loja  @visitaecuador.com @Payphone 🛣️💰🙌🏼",
              ubicacion: "Loja, Ecuador",
            },
            {
              imagen: imgP3,
              enlace:
                "https://www.tiktok.com/@brescianilucho/video/7450263771488128262?_r=1&_t=ZM-8ux82x97bk7",
              mensaje:
                "Hospedate como millonario gracias a “VisitaEcuador.com” ",
              ubicacion: "El Oro, Ecuador",
            },
            {
              imagen: imgP2,
              enlace:
                "https://www.tiktok.com/@kamiramona/video/7389314739437899014?_r=1&_t=ZM-8ux7vsQOcNj",
              mensaje:
                "Este es un increíble hospedaje en Vilcabamba, Loja, Ecuador #hoteles  #loja  #ecuador @visitaecuador.com ",
              ubicacion: "Loja, Ecuador",
            },
            {
              imagen: imgP4,
              enlace:
                "https://www.tiktok.com/@mateo_canizares_/video/7390182689049005317?_r=1&_t=ZM-8ux87TW0vrh",
              mensaje:
                "1000/10 🫶  @visitaecuador.com  @bernardopolopolito  #fyp  #ecuador  #quito  #viajes  #travel ",
              ubicacion: "Tungurahua, Ecuador",
            },
            {
              imagen: imgP5,
              enlace:
                "https://www.tiktok.com/@pacoelmorlaco99/video/7404279169149947142?_r=1&_t=ZM-8ux8NsGxAmL",
              mensaje:
                "hoy fui a @Playa Paraíso  y me ahorre un monton utilizando @visitaecuador.com  #villamil  #playa  #hotel   ",
              ubicacion: "Pastaza, Ecuador",
            },
            {
              imagen: imgP6,
              enlace: "https://www.instagram.com/reel/DE_SjZcsByi/",
              mensaje:
                "Sinceramente el Hotel @trypbywyndhamguayaquil me encantó, súper recomendado @visitaecuadorcom @visitaecuadorinfluencer ",
              ubicacion: "Pastaza, Ecuador",
            },
            {
              imagen: imgP7,
              enlace: "https://www.instagram.com/p/C2P083pOw3q/",
              mensaje:
                "@sopletee_ se hospedo en el @trypbywyndhamguayaquil donde durante su estadía disfruto  ¡Todo gracias a su suscripción de VisitaEcuador.com!",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP8,
              enlace:
                "https://www.tiktok.com/@kamiramona/video/7361224495941553414",
              mensaje:
                "Nueva forma para viajar desbloqueada ✈️✨ @visitaecuador.com",
              ubicacion: "Quito, Ecuador",
            },
            {
              imagen: imgP11,
              enlace:
                "https://www.tiktok.com/@visitaecuadorinfl/video/7394500130772094214?is_from_webapp=1&web_id=7478707606246213126",
              mensaje:
                "Alexa Rodas se hospedo en el Hotel River Garden gracias a su suscripción de VisitaEcuador.com. ",
              ubicacion: "Quito, Ecuador",
            },
            {
              imagen: imgP15,
              enlace: "https://www.instagram.com/reel/DBM4TdnplER/",
              mensaje:
                "Blogsito cumpleañero🥰🥳 empezamos bonito los 26❤️ gracias a @visitaecuadorcom",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP19,
              enlace: "https://www.instagram.com/p/C9SX-UpJGgL/",
              mensaje: "Amandooooo 🐚🏝️🌞 gracias a @visitaecuadorcom",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP22,
              enlace: "https://www.instagram.com/reel/C9V0YuKMHKS/",
              mensaje: "Vlogsito de mi viaje a quito con @visitaecuadorcom",
              ubicacion: "Quito, Ecuador",
            },
            {
              imagen: imgP23,
              enlace: "https://www.instagram.com/p/C2IMpd3uWFz/",
              mensaje:
                "@vjleon93 nos cuenta su experiencia en el @hotelsheratonguayaquil",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP24,
              enlace: "https://www.instagram.com/p/C6G0GMVOqhQ/",
              mensaje:
                "\n" +
                "@bellnico gracias a su suscripción de VisitaEcuador.com se hospedo en el @wyndhamgardenquito . ",
              ubicacion: "Quito, Ecuador",
            },
            {
              imagen: imgP25,
              enlace: "https://www.instagram.com/p/C1c1fNoJRqW/",
              mensaje:
                "Aquí les dejo mi experiencia de Lujo y Confort en el Hotel Wyndham Garden de Quito. 🛌",
              ubicacion: "Quito, Ecuador",
            },
            {
              imagen: imgP26,
              enlace: "https://www.instagram.com/p/C6Oxx-jO0Yz/",
              mensaje:
                "@maurygarnica se hospedo con su familia y disfrutarón en el @trypbywyndhamguayaquil gracias a su suscripción de VisitaEcuador.com.",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP27,
              enlace: "https://www.instagram.com/p/C50y-hbOw1M/",
              mensaje:
                "@cristinatacuri_ec gracias a su suscripción de VisitaEcuador.com se hospedo en el @trypbywyndhamguayaquil ",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP28,
              enlace: "https://www.instagram.com/reel/C5BfXMLuWjf/",
              mensaje:
                "@pacoelmorlaco gracias a su suscripción de VisitaEcuador.com se hospedo en el @hotelmedinadellago .",
              ubicacion: "Otavalo, Ecuador",
            },
            {
              imagen: imgP29,
              enlace: "https://www.instagram.com/reel/C3-be97OyAU/",
              mensaje:
                "@abigailjaramillo_viteri se hospedo en el @fenixhotelquito , gracias a su suscripción de VisitaEcuador.com",
              ubicacion: "Quito, Ecuador",
            },
            {
              imagen: imgP30,
              enlace: "https://www.instagram.com/p/C9TNCN7pnDR/",
              mensaje:
                "Tuve la increíble oportunidad de conocer el @radissonguayaquil en Guayaquil gracias a @visitaecuadorcom y fue una experiencia inolvidable. 🏨✨",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP31,
              enlace: "https://www.instagram.com/reel/C90Z1PPJgaV/",
              mensaje:
                "Descubre la elegancia y comodidad en el corazón de Guayaquil. 🌟 ✨ Gracias a @visitaecuadorcom y no olvides usar mi código ADRV1 para obtener un descuento especial.",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP32,
              enlace: "https://www.instagram.com/reel/C-qqvsGJ9ly/",
              mensaje:
                "✨ ¡Hola a todos! Tuve una experiencia increíble en el @hotelsheratonguayaquil , y tenía que compartirlo. 🌟 💸 Lo mejor de todo es que reservé a través de @visitaecuadorcom donde conseguí precios increíbles que no encontré en otros sitios como Booking, ¡y el desayuno estaba incluido! ",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP33,
              enlace: "https://www.instagram.com/reel/C-235qjBvv9/",
              mensaje:
                "@cristyortega22 se quedo en el @radissonguayaquil y esto paso...\n" +
                "#radisson #hotel #guayaquil #cris #cristina",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP34,
              enlace: "https://www.instagram.com/reel/C8M94MuJp1k/",
              mensaje:
                "Victor León se hospedo y disfruto en el @wyndhamguayaquil gracias a su suscripción de VisitaEcuador.com.",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP35,
              enlace: "https://www.instagram.com/reel/C-23Y49BOmT/",
              mensaje:
                "@brescianilucho se hospedo y disfruto en el @reec_machala gracias a su suscripción de VisitaEcuador.com. Resalta una atención increíble, instalaciones de lujo, el sistema ágil de reservación en la aplicación, el ahorro y el delicioso desayuno buffet ilimitado 🤩",
              ubicacion: "Machala, Ecuador",
            },
            {
              imagen: imgP36,
              enlace: "http://instagram.com/reel/C9P3ECYJ_tl/",
              mensaje:
                "@cristyortega22 se hospedo en el @sanjuanhotelcuenca gracias a su suscripción de VisitaEcuador.com.",
              ubicacion: "Cuenca, Ecuador",
            },
            {
              imagen: imgP37,
              enlace: "https://www.instagram.com/reel/C6MpX77pzN8/",
              mensaje:
                "En Ecuador, somos la mejor plataforma para reserva de hoteles TOP. Te certificamos el mejor precio ✅ ✅ Adquiere una suscripción desde nuestra aplicación Visitaecuador.com,",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP38,
              enlace: "https://www.instagram.com/reel/C-26J-_BZw5/",
              mensaje:
                "En Ecuador, somos la mejor plataforma para reserva de hoteles TOP. Te certificamos el mejor precio ✅ ✅ Adquiere una suscripción desde nuestra aplicación Visitaecuador.com,",
              ubicacion: "Guayaquil, Ecuador",
            },
            {
              imagen: imgP39,
              enlace: "https://www.instagram.com/reel/C6tg7aPOqGM/",
              mensaje:
                "@brescianilucho se hospedo en el @oroverde_machala y disfrutó de instalaciones de lujo y completas, atención increíble y desayuno buffet ilimitado muy delicioso 🤩.,",
              ubicacion: "Machala, Ecuador",
            },
            {
              imagen: imgP40,
              enlace: "https://www.instagram.com/reel/C6q6kqFOYDR/",
              mensaje:
                "@bellnico gracias a su suscripción de VisitaEcuador.com se hospedo en el @wyndhamquito .",
              ubicacion: "Quito, Ecuador",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Influencers;
