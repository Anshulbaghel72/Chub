import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import logolight from "@/assets/logo-light.png"


function AboutContent() {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
            );
        }
    }, []);

    return (
        <div
            ref={textRef}
            className="expo text-white relative text-center flex flex-col justify-center items-center h-full "
        >
            <div className="absolute flex flex-col top-0 left-10 cursor-none">
                {"EXPLORE".split("").map((char, index) => (
                    <span
                        key={index}
                        className="
        text-8xl font-bold 
        h-23 leading-none
        transition-all duration-500 
        hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500
        hover:scale-110 hover:translate-x-4
        group
      "
                        style={{
                            animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`,
                            opacity: 0
                        }}
                    >
                        <span className="group-hover:rotate-12 transition-transform duration-300 inline-block">
                            {char}
                        </span>
                    </span>
                ))}
            </div>
              
              <img src={logolight} alt="" className="absolute left-140 top-15 h-50 transform rotate-[-26deg]" />
            <p className="text-3xl font-semibold w-[80%] leading-relaxed  cursor-none">
  {"We are a team of passionate individuals dedicated to delivering exceptional experiences. Our mission is to innovate and inspire."
    .split("")
    .map((char, index) => (
      <span
        key={index}
        className="transition-all duration-500 hover:duration-100"
        style={{
          color: '#ddd',
          textShadow: '0 0 0px transparent',
        }}
        onMouseEnter={(e) => {
          const hue = (index * 12) % 360;
          e.currentTarget.style.color = `hsl(${hue}, 100%, 80%)`;
          e.currentTarget.style.textShadow = `0 0 10px hsl(${hue}, 100%, 50%), 0 0 20px hsl(${hue}, 100%, 50%)`;
          e.currentTarget.style.transform = 'scale(1.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#ddd';
          e.currentTarget.style.textShadow = '0 0 0px transparent';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {char}
      </span>
    ))}
</p>
        </div>
    );
}

export default AboutContent;