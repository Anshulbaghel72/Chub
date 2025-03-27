import AboutContent from "./about";

function AboutSlide() {
    return (
        <>
            <div className="sticky top-20 left-0 flex w-full h-full overflow-hidden">
                <div className=" w-full h-screen flex-shrink-0 bg-black">
                    <AboutContent/>
                </div>
                <div className="flex relative w-full h-screen flex-shrink-0 bg-green-700 align-center justify-center items-center">

                </div>
                <div className=" w-full h-screen flex-shrink-0 bg-zinc-400"></div>
                <div className=" w-full h-screen flex-shrink-0 bg-yellow-700"></div>
            </div>
        </>
    );
}

export default AboutSlide;