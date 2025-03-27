import { ArrowUpRight } from "lucide-react";
import hh from "@/assets/hh.png"
import hh1 from "@/assets/hh1.png"
import Marquee from "react-fast-marquee";

const Home = () => {
    return (
       <>
         <div className="flex relative justify-between bg-[#e8e8e8] cursor-default select-none z-0">
      <div className="flex text-[8vw] md:text-[4vw] flex-col items-center justify-center h-143 w-full md:w-[65%] px-4 md:px-0 md:pt-10">
        <h1 className="text-[10vw] md:h-80 md:text-[6vw] font-black leading-none tracking-[-1px] md:tracking-[-4px] text-transparent text-stroke uppercase mx-2 md:mx-14 ">
          Hello, This is Chat-Hub a chat with each other in real-time.
        </h1>
        <button className="absolute bottom-8 cursor-pointer left-16 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
            <ArrowUpRight className="text-black" size={20} />
          </div>
          <span className="text-lg font-medium">Let's Talk</span>
        </button>
      </div>


      <div className="reletive md:w-[35%] h-143 ">
        <img
          src={hh1}
          alt="HH1"
          className="absolute w-1/2 h-80 w-45 transform rotate-[-26deg] right-30 bottom-65"
        />
        <img
          src={hh}
          alt="HH"
          className="absolute w-1/2 h-80 w-45 transform rotate-[-30deg] right-60 bottom-15"
        />

      </div>
      <div className="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-[#e8e8e8] to-transparent"></div>
    </div>
    <div className="bg-white py-4">
      <Marquee speed={50} gradient={false}>
        <span className="text-[10vw] font-bold text-[#B2BAC7] border-y-2 border-[#e8e8e8] ">
          Explore <span className="text-zinc-800">Breathtaking</span> Destinations &bull;  <span className="text-zinc-800">Immerse</span> in <span className="text-zinc-800">360°</span> Virtual Tours &bull; <span className="text-zinc-800">Adventure</span>  Awaits!
        </span>
      </Marquee>
    </div>
       </>
    );
};

export default Home;