import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import Slider from "react-slick";
import VideoModal from  "./VideoModal"

const CustomNextArrow = (props) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white h-6 w-6 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            onClick={props.onClick}>
            <span className="icon-[material-symbols--arrow-forward-ios] h-3 w-3"></span>
        </div>
    );
};

const CustomPrevArrow = (props) => {
    return (
        <div
            className="absolute top-1/2 transform -translate-y-1/2 left-3 z-10 cursor-pointer rounded-full bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white h-6 w-6 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            onClick={props.onClick}>
            <span className="icon-[material-symbols--arrow-back-ios-new] h-3 w-3"></span>
        </div>
    );
};

const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                arrows: false,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
            },
        },
    ]
};

const VideoCard = ({ entrada, index, onVideoClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div  className="h-full cursor-pointer  "
                 onClick={() => onVideoClick(index)}
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
                    <div className={`absolute inset-0  opacity-0  z-10 `}></div>
                    <iframe
                        className="w-full h-full object-cover "
                        src={entrada.url}
                        title={entrada.titulo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group">
                        {entrada.titulo}
                        <span className={`block h-0.5 bg-[#005F6B] transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`}></span>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-grow">{entrada.contenido}</p>
                    <div className={`text-[#96c121] text-sm font-medium transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
                        Leer más →
                    </div>
                </div>
            </div>
        </div>
    );
};

const Entradas = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const entradas = [
        {
            id: 1,
            titulo: "Desmintiendo el mito del cangrejo en Churute",
            contenido: "Hola, hola, hola. Amigos viajeros ¿se han preguntado como se obtiene la pulpa de cangrejo? Bueno, después de tantos años de comprarle a mi buena amiga Melva, quien ha vendido pulpa de cangrejos durante más de 30 años en Churute (en la provincia del Guayas). Me pregunté ¿cómo lo hace?",
            url: "https://www.youtube.com/embed/SduXEHsPzYE"
        },
        {
            id: 2,
            titulo: "Experiencias gastronómicas en Ecuador",
            contenido: "La cocina ecuatoriana es una de las más diversas de América Latina. En este video exploramos las delicias culinarias de la costa, sierra y amazonía, descubriendo sabores únicos y tradiciones ancestrales que han perdurado hasta nuestros días.",
            url: "https://www.youtube.com/embed/QaL6cG4LCNU"
        },
        {
            id: 3,
            titulo: "Aventuras en las Islas Galápagos",
            contenido: "Les comparto mi experiencia navegando por el archipiélago de Galápagos, un paraíso natural único en el mundo. Desde nadar con tortugas marinas hasta observar aves exóticas, cada día fue una aventura inolvidable en este laboratorio viviente de evolución.",
            url: "https://www.youtube.com/embed/_xPNgNvS4wg"
        },
        {
            id: 4,
            titulo: "Desmintiendo el mito del cangrejo en Churute",
            contenido: "Hola, hola, hola. Amigos viajeros ¿se han preguntado como se obtiene la pulpa de cangrejo? Bueno, después de tantos años de comprarle a mi buena amiga Melva, quien ha vendido pulpa de cangrejos durante más de 30 años en Churute (en la provincia del Guayas). Me pregunté ¿cómo lo hace?",
            url: "https://www.youtube.com/embed/SduXEHsPzYE"
        }
    ];
    const handleVideoClick = (index) => {
        setCurrentVideoIndex(index);
        setIsModalOpen(true);
    };

    return (
        <div className='w-full '>
            <Slider {...settings} className="blog-slider ">
                {entradas.map((entrada, index) => (
                    <VideoCard
                        key={entrada.id}
                        entrada={entrada}
                        index={index}
                        onVideoClick={handleVideoClick}
                    />
                ))}
            </Slider>

            {isModalOpen && (
                <VideoModal
                    videos={entradas}
                    initialIndex={currentVideoIndex}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Entradas;
