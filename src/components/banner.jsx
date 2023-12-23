import './style/banner.css';
import { useEffect, useRef } from 'react';

const Banner = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const { current } = imageRef;
            if (current) {
                const offset = window.scrollY;
                current.style.transform = `translateY(-${offset * 0.3}px)`; // Atur nilai yang sesuai untuk efek parallax
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative overflow-hidden banner">
            <div className="absolute inset-0 overflow-hidden z-0">
                <img
                    ref={imageRef}
                    src='src/asset/darah-rendah.jpeg'
                    alt="Banner Image"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20"></div>
                <div className="text-content md:pl-10 md:text-left lg:text-center lg:pl-20">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Judul Banner</h1>
                    <p className="mt-2 text-base md:text-lg lg:text-xl">Deskripsi banner yang menarik</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
