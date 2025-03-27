"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Import images
import star from "@/assets/9ebf3ea921509e646d746fd204962124.jpg"
import Chat from "@/assets/chat.png"
import Chat2 from "@/assets/chat2.png"
import Chat3 from "@/assets/chat3.png"
import Chat4 from "@/assets/chat4.png"

function StarAnimation() {
    const homeRef = useRef<HTMLDivElement>(null)
    const starRef = useRef<HTMLDivElement>(null)
    const marqueeRef = useRef<HTMLDivElement>(null)

    // GSAP animations setup
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    
        // Ensure initial states
        gsap.set(".star", { clipPath: "circle(100% at 50% 50%)" });
        gsap.set(".slides", { scale: 5 });
    
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".home",
                start: "top center",
                end: "bottom center",
                scrub: 1,
            }
        });
    
        tl.to(".star", {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power4.inOut",
            duration: 5,
        }, 0) // Ensure both animations start together
    
        .to(".slides", {
            scale: 0.6,
            ease: "power2.out",
            duration: 5,
        }, 0)
        
    
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const people = [
        { name: "welcome", img: Chat },
        { name: "back", img: Chat4 },
        { name: "again", img: Chat },
        { name: "chat", img: Chat2 },
        { name: "hub", img: Chat3 },
        { name: "station", img: Chat3 },
        { name: "back", img: Chat4 },
        { name: "again", img: Chat },
        { name: "chat", img: Chat2 },
    ]

    return (
        <div className="w-full" ref={homeRef}>
            {/* Hero Section */}
            <div className="home h-screen relative">
                <div
                    ref={starRef}
                    className="flex star absolute z-10 h-screen w-full gap-5 bg-zinc-100"
                    style={{ clipPath: "circle(100% at 50% 50%)" }}
                >
                    <div className="w-[40%] flex items-center justify-center">
                        <img src={star || "/placeholder.svg"} alt="star" className="h-100 w-100" />
                    </div>
                    <div className="w-[60%] flex items-center justify-center">
                        <div className="text-center md:text-left space-y-4">
                            <h2 className="text-2xl md:text-3xl font-semibold">
                                ChatHub is an innovative and dynamic real-time messaging platform designed for seamless communication.
                                <span className="text-gray-400"> effortless </span>
                                connectivity across multiple channels and private conversations. Whether for personal or professional
                                use, providing a secure,
                                <span className="text-gray-400"> engaging, </span>
                                and immersive chat experience. ChatHub redefines the way people connect, making conversations more
                                interactive, efficient, and enjoyable.
                            </h2>
                            <div className="pt-4">
                                <Button className="rounded-full px-6 border-2 bg-primary hover:bg-white cursor-pointer hover:text-black text-white transition-colors duration-300">
                                    Our Services <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Marquee Section */}
                <div
                    ref={marqueeRef}
                    className="marquee w-full h-screen relative bg-black text-white font-semibold font-[Poppins] overflow-hidden"
                >
                    <div className="slides absolute scale-[.6] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] ">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className={`row flex items-center gap-10 whitespace-nowrap w-full`}
                                style={{
                                    transform: `translateX(${i === 0 ? "-55%" : i === 1 ? "-46.67%" : i === 2 ? "-33.33%" : "-50%"})`,
                                }}
                            >
                                {people.map((person, index) => (
                                    <div key={index} className="elem flex items-center gap-10">
                                        <h1 className="text-6xl md:text-8xl">{person.name}</h1>
                                        <div className="img w-[2.5rem] h-[2.5rem] md:w-[3.5rem] md:h-[3.5rem] rounded-full mt-4">
                                            <img
                                                src={person.img || "/placeholder.svg"}
                                                alt={person.name}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StarAnimation




// Star animation
        // gsap.to(".star", {
        //     scrollTrigger: {
        //         trigger: ".home",
        //         start: "top center",
        //         end: "bottom center",
        //         scrub: 0.5,
        //     },
        //     clipPath: "circle(0% at 50% 50%)",
        //     ease: "power4.inOut",
        //     duration: 10,
        // })


        // Marquee animations
        // const rows = document.querySelectorAll(".row")
        // rows.forEach((row, index) => {
        //   const direction = index % 2 === 0 ? -1 : 1
        //   const speed = 50 + index * 10

        //   gsap.to(row, {
        //     x: direction * 100 + "%",
        //     duration: speed,
        //     repeat: -1,
        //     ease: "none",
        //     modifiers: {
        //       x: gsap.utils.unitize((x) => Number.parseFloat(x) % 100),
        //     },
        //   })
        // })