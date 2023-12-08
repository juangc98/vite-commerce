import React from 'react'
//pexels-markus-spiske-114296
import heroImg from '/pexels-markus-spiske-114296.jpg'

const Hero = (props) => {

    function scrollDown() {
        const currentPosition = window.scrollY;
        const targetPosition = currentPosition + window.innerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    return (
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
            <div className="absolute inset-0">
                <img src={heroImg} alt="Background Image" className="object-cover object-center w-full h-full" />
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                <h1 className="text-5xl font-bold leading-tight mb-4">{ props.title }</h1>
                <p className="text-lg text-gray-300 mb-8">{ props.subtitle }</p>
                <a onClick={scrollDown} className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">{ props.cta }</a>
            </div>
        </div>

    )
}

export default Hero