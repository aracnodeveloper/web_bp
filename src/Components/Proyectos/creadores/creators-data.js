import imgP from "../../../imagenes/profiles/img_6.webp";
import imgP1 from "../../../imagenes/profiles/img_7.webp";
import imgP2 from "../../../imagenes/profiles/img.webp";
import imgP3 from "../../../imagenes/profiles/img_1.webp";
import imgP4 from "../../../imagenes/profiles/img_2.webp";
import imgP5 from "../../../imagenes/profiles/img_3.webp";
import imgP6 from "../../../imagenes/profiles/img_4.webp";
import imgP7 from "../../../imagenes/profiles/img_5.webp";
import imgP8 from "../../../imagenes/profiles/img_8.webp";
import imgP9 from "../../../imagenes/profiles/img_10.webp";
import imgP10 from "../../../imagenes/profiles/img_9.webp";
import imgP11 from "../../../imagenes/profiles/img_11.webp";
import imgP12 from "../../../imagenes/profiles/img_12.webp";
import imgP13 from "../../../imagenes/profiles/img_13.webp";

import imgP14 from "../../../imagenes/Influencers/img_5.webp";
import imgP15 from "../../../imagenes/Influencers/img_12.webp";
import imgP16 from "../../../imagenes/Influencers/img_25.webp";
import imgP17 from "../../../imagenes/Influencers/img_23.webp";
import imgP18 from "../../../imagenes/Influencers/img_26.webp";
import imgP19 from "../../../imagenes/Influencers/img_27.webp";
import imgP20 from "../../../imagenes/Influencers/img_28.webp";
import imgP21 from "../../../imagenes/Influencers/img_31.webp";
import imgP22 from "../../../imagenes/Influencers/img_32.webp";
import imgP23 from "../../../imagenes/Influencers/img_33.webp";
import imgP24 from "../../../imagenes/Influencers/img_34.webp";
import imgP25 from "../../../imagenes/Influencers/img_35.webp";
import imgP26 from "../../../imagenes/Influencers/img_36.webp";
import imgP27 from "../../../imagenes/Influencers/img.webp";
import imgP28 from "../../../imagenes/Influencers/img_9.webp";
import imgP29 from "../../../imagenes/Influencers/img_37.webp";
import imgP30 from "../../../imagenes/Influencers/img_38.webp";
import imgP31 from "../../../imagenes/Influencers/img_39.webp";
import imgP32 from "../../../imagenes/Influencers/img_40.webp";
import imgP33 from "../../../imagenes/Influencers/img_41.webp";
import imgP34 from "../../../imagenes/Influencers/img_42.webp";
import imgP35 from "../../../imagenes/Influencers/img_43.webp";
import imgP36 from "../../../imagenes/Influencers/img_44.webp";
import imgP37 from "../../../imagenes/Influencers/img_45.webp";
import imgP38 from "../../../imagenes/Influencers/img_46.webp";
import imgP39 from "../../../imagenes/Influencers/img_47.webp";
import imgP40 from "../../../imagenes/Influencers/img_48.webp";
import imgP41 from "../../../imagenes/Influencers/img_49.webp";
import imgP42 from "../../../imagenes/Influencers/img_50.webp";
import imgP43 from "../../../imagenes/Influencers/img_51.webp";
import imgP44 from "../../../imagenes/Influencers/img_52.webp";
import imgP45 from "../../../imagenes/Influencers/img_53.webp";
import imgP46 from "../../../imagenes/Influencers/img_54.webp";

export const socialIconMap = {
  facebook: {
    icon: "icon-[mage--facebook]",
    color: "bg-[#3b5998]",
  },
  instagram: {
    icon: "icon-[mdi--instagram]",
    color: "bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
  },
  twitter: {
    icon: "icon-[mage--x]",
    color: "bg-black",
  },
  tiktok: {
    icon: "icon-[mage--tiktok]",
    color: "bg-black",
  },
  youtube: {
    icon: "icon-[mage--youtube]",
    color: "bg-[#FF0000]",
  },
  default: {
    icon: "icon-[mdi--link]",
    color: "bg-gray-500",
  },
};

export const influencersData = [
  {
    id: 1,
    name: "Alexa Rodas",
    role: "Creadora de contenido 🎬\nCuenca-Ecuador 🇪🇨",
    imageUrl: imgP,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/alexa42rodas/" },
      { platform: "twitter", url: "https://www.threads.net/@alexa42rodas" },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP15,
        videoUrl:
          "https://www.tiktok.com/@visitaecuadorinfl/video/7394500130772094214?is_from_webapp=1&web_id=7478707606246213126",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP29,
        videoUrl: "https://www.instagram.com/reel/C9TNCN7pnDR/",
      },
      {
        id: "video3",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP30,
        videoUrl: "https://www.instagram.com/reel/C90Z1PPJgaV/",
      },
      {
        id: "video4",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP31,
        videoUrl: "https://www.instagram.com/reel/C-qqvsGJ9ly/",
      },
    ],
  },
  {
    id: 2,
    name: "yankicaldas",
    role: "🎬Creador de contenido \n🎭Actor\n🏊‍♂️ profesor de natación\n",
    imageUrl: imgP1,
    bio:
      "🎬Creador de contenido 👌🏽\n" +
      "🎭Actor\n" +
      "🎥Realizador audiovisual\n" +
      "🫧Estratega y consultor de marketing digital\n" +
      "🏊‍♂️ profesor de natación\n" +
      "🌚soy pana 😎.",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/yankicaldas/" },
      { platform: "twitter", url: "https://www.threads.net/@yankicaldas" },
      {
        platform: "facebook",
        url: "https://www.facebook.com/jean.lopescaldas/",
      },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP16,
        videoUrl: "https://www.instagram.com/reel/C9V0YuKMHKS/",
      },
    ],
  },
  {
    id: 3,
    name: "Anibal Casis",
    role:
      "𝖩𝗂𝗎 𝖩𝗂𝗍𝗌𝗎 4𝗅𝗂f𝖾 🏅🤼‍♂️\n" +
      "l𝗮 𝗣𝘃𝘁𝗲𝗮𝗱𝗶𝘁𝗮 𝗱𝗲𝗹 𝗦𝗮𝗯𝗼𝗿 🗺🧭\n" +
      "⭐️𝙴𝙼𝙿𝚁𝙴𝙽𝙳𝙴𝙳𝙾𝚁 💯🤩",
    imageUrl: imgP2,
    bio: "Padre, amigo, deportista, 📌T⃨i⃨k⃨T⃨o⃨k⃨: 𝗃𝗈𝗋𝗀𝖾𝖺𝗇𝗂𝖻𝖺𝗅𝖼𝖺𝗌𝗌𝗂𝗌.",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/jorgeanibalcassisoficial/",
      },
      {
        platform: "twitter",
        url: "https://www.threads.net/@jorgeanibalcassisoficial",
      },
      { platform: "tiktok", url: "https://www.tiktok.com/@jorgeanibalcassis" },
      {
        platform: "youtube",
        url: "https://www.youtube.com/channel/UCCwg4ptDDrkYXYy_cgd-ndQ",
      },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP2,
        videoUrl: "https://www.instagram.com/p/C9Vh84Cp5AL/",
      },
    ],
  },
  {
    id: 4,
    name: "Cristy Ortega",
    role: "REINA DE CUENCA 2018-2019 👑\nCreadora de @cookris.ec 💜🍪",
    imageUrl: imgP3,
    bio:
      "REINA DE CUENCA 2018-2019👑\n" +
      "Mis postres : tartle.cue 🤍\n" +
      "Restaurante: olivetto.cue 🍷\n" +
      "Joyas: c.o.chains ✨\n" +
      "Fundadora : operacionfelicidad.ec 💙.",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/cristyortega22/",
      },
      { platform: "twitter", url: "https://www.threads.net/@cristyortega22" },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP17,
        videoUrl: "https://www.instagram.com/p/C9SX-UpJGgL/",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP32,
        videoUrl: "https://www.instagram.com/reel/C-235qjBvv9/",
      },
      {
        id: "video3",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP35,
        videoUrl: "https://www.instagram.com/reel/C9P3ECYJ_tl/",
      },
    ],
  },
  {
    id: 5,
    name: "Kamiramona",
    role:
      "🧩 Arquitecta, DJ y creadora de contenido\n" +
      "🎨 Promuevo arte, música y cultura.\n" +
      "🧿 Host de @lapina.fest & @coffeecat.loja\n" +
      "❤️‍🔥 canal de difusión👇🏼",
    imageUrl: imgP4,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/kamiramona/" },
      { platform: "twitter", url: "https://www.threads.net/@kamiramona" },
      { platform: "tiktok", url: "https://www.tiktok.com/@kamiramona" },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP14,
        videoUrl:
          "https://www.tiktok.com/@kamiramona/video/7375240984218586374?_r=1&_t=ZM-8ux7qc5v6r1",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP27,
        videoUrl:
          "https://www.tiktok.com/@kamiramona/video/7389314739437899014?_r=1&_t=ZM-8ux7vsQOcNj",
      },
      {
        id: "video3",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP28,
        videoUrl:
          "https://www.tiktok.com/@kamiramona/video/7361224495941553414",
      },
    ],
  },
  {
    id: 6,
    name: "Victor Leon",
    role: "TIKTOK victor.leon93 (+300K)\n#PulgarArriba\n#LargaVida",
    imageUrl: imgP5,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/vjleon93/" },
      { platform: "twitter", url: "https://www.threads.net/@vjleon93" },
      { platform: "facebook", url: "https://www.facebook.com/cifufit" },
      { platform: "tiktok", url: "https://www.tiktok.com/@victorleon.93" },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP18,
        videoUrl: "https://www.instagram.com/p/C2IMpd3uWFz/",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP33,
        videoUrl: "https://www.instagram.com/reel/C8M94MuJp1k/",
      },
      {
        id: "video3",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP34,
        videoUrl: "https://www.instagram.com/reel/C-23Y49BOmT/",
      },
      {
        id: "video3",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP36,
        videoUrl: "https://www.instagram.com/reel/C6MpX77pzN8/",
      },
    ],
  },
  {
    id: 7,
    name: "Nico Bell",
    role:
      "Creador digital\n" +
      "Donde estés, con quien estes y lo que estés haciendo GÓZALA♾\n",
    imageUrl: imgP6,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/bellnico/" },
      { platform: "twitter", url: "https://www.threads.net/@bellnico" },
      { platform: "facebook", url: "https://www.tiktok.com/@bellnicobell" },
      {
        platform: "tiktok",
        url: "https://www.facebook.com/bellnicobell?mibextid=LQQJ4d&rdid=z5EpYne11L2lZjas&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FBy62FPrtuiTagGwH%2F%3Fmibextid%3DLQQJ4d",
      },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP19,
        videoUrl: "https://www.instagram.com/p/C6G0GMVOqhQ/",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP39,
        videoUrl: "https://www.instagram.com/reel/C6q6kqFOYDR/",
      },
    ],
  },
  {
    id: 8,
    name: "Bernardo Polito",
    role: "Hacker del Turismo🏝️\nEmprendedor disruptivo 🇪🇨\nBloguero 🤳",
    imageUrl: imgP7,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/bernardopolopolito/",
      },
      { platform: "twitter", url: "https://x.com/bernardopolo10" },
      {
        platform: "facebook",
        url: "https://www.facebook.com/bernardopolopolito",
      },
      { platform: "tiktok", url: "https://www.tiktok.com/@bernardopolopolito" },
      {
        platform: "youtube",
        url: "https://www.youtube.com/@bernardopolopolito",
      },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP20,
        videoUrl: "https://www.instagram.com/p/C1c1fNoJRqW/",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP45,
        videoUrl: "https://www.instagram.com/reel/C6eodMAJ7eq/",
      },
      {
        id: "video3",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP46,
        videoUrl:
          "https://www.instagram.com/visitaecuadorcom/reel/C56vLalpjVn/",
      },
    ],
  },
  {
    id: 9,
    name: "maurygarnica",
    role: "Locutor y productor de radio (también redes je je ) #maurygarnica",
    imageUrl: imgP8,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/maurygarnica/" },
      { platform: "twitter", url: "https://www.threads.net/@maurygarnica" },
      {
        platform: "facebook",
        url: "https://www.facebook.com/maurygarnicaoficial",
      },
      { platform: "tiktok", url: "https://www.tiktok.com/@maurygarnica1" },
      {
        platform: "youtube",
        url: "https://www.youtube.com/channel/UCHroZbHoK74nCEUjsWAgpww",
      },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP21,
        videoUrl: "https://www.instagram.com/p/C6Oxx-jO0Yz/",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP40,
        videoUrl: "https://www.instagram.com/reel/C_L4TCMBV0J/",
      },
    ],
  },
  {
    id: 10,
    name: "Cristina Tacuri",
    role:
      "👑 THT 👑\n" +
      "MAQUILLADORA PROFESIONAL\n" +
      "Artista Maquillaje Permanente\n" +
      "Modelo\n" +
      "Bailarina\n" +
      "Cuenca - Ecuador 🇪🇨",
    imageUrl: imgP9,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/cristinatacuri_ec/",
      },
      {
        platform: "twitter",
        url: "https://www.threads.net/@cristinatacuri_ec",
      },
      {
        platform: "facebook",
        url: "https://www.facebook.com/cristinatacuriec",
      },
      { platform: "tiktok", url: "https://www.tiktok.com/@cristinatacuri_ec" },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP22,
        videoUrl: "https://www.instagram.com/p/C50y-hbOw1M/",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP37,
        videoUrl: "https://www.instagram.com/reel/C-26J-_BZw5/",
      },
    ],
  },
  {
    id: 11,
    name: "Paco el Morlaco",
    role:
      "Blog personal\n" +
      "Sueño con poder Servir al Mundo pero en especial a los animales 🐶😸🌎",
    imageUrl: imgP10,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/pacoelmorlaco/",
      },
      { platform: "twitter", url: "https://www.threads.net/@pacoelmorlaco" },
      { platform: "tiktok", url: "https://www.tiktok.com/@pacoelmorlaco99" },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP23,
        videoUrl: "https://www.instagram.com/reel/C5BfXMLuWjf/",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP41,
        videoUrl: "https://www.instagram.com/reel/C1KagySOnaN/",
      },
      {
        id: "video3",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP42,
        videoUrl: "https://www.instagram.com/reel/C1UmMAxOI2Y/",
      },
    ],
  },
  {
    id: 12,
    name: "Lucho Bresciani",
    role:
      "Creador de videos\n" +
      "#QueTiroMisCholos\n" +
      "Te cuento sobre mi aldea 🇪🇨\n" +
      "Jama🍗 Drinks🍹 Trips✈️\n" +
      "angy.arebalo, bernardopolopolito ",
    imageUrl: imgP11,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/brescianilucho/",
      },
      { platform: "tiktok", url: "https://www.tiktok.com/@brescianilucho" },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP24,
        videoUrl: "https://www.instagram.com/reel/C71oehIOvW-/",
      },
      {
        id: "video2",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP38,
        videoUrl: "https://www.instagram.com/reel/C6tg7aPOqGM/",
      },
      {
        id: "video3",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP43,
        videoUrl: "https://www.instagram.com/reel/C3GgbgSp0LS/",
      },
    ],
  },
  {
    id: 13,
    name: "Abigail Jaramillo",
    role:
      "Bloguero(a)\n" +
      "Fashion l Beauty I Travel & Lifestyle.\n" +
      "Conectando el deporte @oxsportagency\n" +
      "🇪🇨",
    imageUrl: imgP12,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/abigailjaramillo_viteri/",
      },
      {
        platform: "twitter",
        url: "https://www.threads.net/@abigailjaramillo_viteri",
      },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP25,
        videoUrl: "https://www.instagram.com/reel/C3-be97OyAU/",
      },
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP44,
        videoUrl: "https://www.instagram.com/reel/C2fiZW0Akk2/",
      },
    ],
  },
  {
    id: 14,
    name: "Aaron Soplete",
    role: "Figura pública\n📍/Orlando🇪🇨✈️🇺🇸",
    imageUrl: imgP13,
    bio: "Apasionada creadora de contenido de Cuenca, Ecuador. Comparto mi vida y experiencias con autenticidad.",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/sopletee_/" },
      { platform: "twitter", url: "https://www.threads.net/@sopletee_" },
      { platform: "facebook", url: "https://www.facebook.com/Sopletintrixxx" },
      { platform: "tiktok", url: "https://www.tiktok.com/@aaronraffogalindo" },
    ],
    videos: [
      {
        id: "video1",
        title: "Un día en Cuenca",
        thumbnailUrl: imgP26,
        videoUrl: "https://www.instagram.com/reel/C2P083pOw3q/",
      },
    ],
  },
];
