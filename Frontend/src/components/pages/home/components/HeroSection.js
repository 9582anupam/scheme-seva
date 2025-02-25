import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import banner2 from "../../../../assets/banner2.webp";
import banner3 from "../../../../assets/banner3.jpg";
import banner4 from "../../../../assets/banner4.jpg";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const images = [
        {
            src: banner2,
            alt: "Government Schemes Banner 1",
            priority: true // First image gets high priority
        },
        {
            src: banner3,
            alt: "Government Schemes Banner 2",
            priority: false
        },
        {
            src: banner4,
            alt: "Government Schemes Banner 3",
            priority: false
        }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleExplore = () => {
        navigate("/schemes");
    };

    return (
        <section className="relative h-[calc(100vh-5rem)] overflow-hidden">
            <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" 
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover flex-shrink-0"
                        loading={image.priority ? "eager" : "lazy"}
                        fetchpriority={image.priority ? "high" : "auto"}
                        decoding="async"
                    />
                ))}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4 sm:px-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Government Schemes for You</h1>
                    <p className="text-xl mb-8">
                        Get information about all the government schemes, categorized and easy to explore
                    </p>
                    <button
                        onClick={handleExplore}
                        className="bg-[#74B83E] text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center hover:bg-[#5d9b2b] transition duration-300"
                        aria-label="Explore Government Schemes"
                    >
                        Explore Schemes
                        <ChevronRight className="ml-2" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hidden sm:block"
                aria-label="Previous slide"
            >
                <ChevronLeft className="text-black" aria-hidden="true" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hidden sm:block"
                aria-label="Next slide"
            >
                <ChevronRight className="text-black" aria-hidden="true" />
            </button>
        </section>
    );
};

export default HeroSection;