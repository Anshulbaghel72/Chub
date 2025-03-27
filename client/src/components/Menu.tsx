import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import gsap from "gsap";

const menuItems = ["Home", "About", "Services", "Projects", "Contact"];

const MenuItem = ({ text, position }: { text: string; position: [number, number, number] }) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current.position,
      { y: position[1] + 2, opacity: 0 },
      { y: position[1], opacity: 1, duration: 1.2, ease: "power3.out", delay: position[1] * 0.2 }
    );
  }, []);

  const handleHover = (scale: number) => {
    gsap.to(ref.current.scale, { x: scale, y: scale, z: scale, duration: 0.3 });
  };

  return (
    <Text
      ref={ref}
      fontSize={1.2}
      color="white"
      position={position}
      onPointerEnter={() => handleHover(1.2)}
      onPointerLeave={() => handleHover(1)}
    >
      {text}
    </Text>
  );
};

const AnimatedMenu = () => {
  return (
    <div className=" w-screen h-screen flex justify-between bg-zinc-800 ">
     
      <Canvas
        camera={{ position: [0, 0, 5] }}
        className="absolute inset-0 z-2 w-full"
        style={{ width: "100vw" }}
      >
        <ambientLight intensity={0.5} />
        {menuItems.map((item, index) => (
          <MenuItem key={item} text={item} position={[-4.2, 2.5 - index * 1.2, 0]} />
        ))}
      </Canvas>     
    </div>
  );
};

export default AnimatedMenu;