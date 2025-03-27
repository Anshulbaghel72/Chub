import Home from "./Home";
import StarA from "./Star";
import ChannelCreator from "./channel_area";
import AboutSlide from "./AboutSlide";


function Hare() {
  return (<>
    <Home/>
    <StarA />
    <div className="w-full bg-black z-2">
      <div className="flex justify-center items-center w-full ">
        <h1 className="text-[6rem]  text-zinc-100 uppercase font-bold">Channels</h1>
      </div>
      <ChannelCreator />
    </div>
    <AboutSlide />
  </>
  )
}

export default Hare