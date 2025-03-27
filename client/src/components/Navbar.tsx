import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
// import { Menu, X } from "lucide-react"
import logoDark from "@/assets/logo-dark.png"
import { cn } from "@/lib/utils"
import AnimatedMenu from "./Menu"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLDivElement>(null)

  // Handle menu animations
  useEffect(() => {
    if (menuOpen) {
      // Animate menu opening
      document.body.style.overflow = "hidden" // Prevent scrolling when menu is open

      gsap.fromTo(
        menuRef.current,
        {
          clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
          opacity: 0,
        },
        {
          clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      )
    } else if (menuRef.current) {
      // Animate menu closing
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        onComplete: () => {
          document.body.style.overflow = "" // Re-enable scrolling
        },
      })
    }
  }, [menuOpen])

  // Animate navbar on mount
  useEffect(() => {
    gsap.fromTo(navbarRef.current, { y: -100 }, { y: 0, duration: 0.8, ease: "power3.out" })
  }, [])

  return (
    <>
      <div className="flex h-20 justify-between bg-[#e8e8e8] items-center px-4 md:px-20 relative">
        <div className="h-12 flex items-center">
          <img src={logoDark} alt="logo" className="h-14 cursor-pointer" />
        </div>
        <div className="hidden md:flex justify-between md:text-[1.4vw] items-center gap-4 md:gap-12  md:text-base">
    {["Home", "Channels", "About", "Contact"].map((item, index) => (
      <Link
        key={index}
        to={`/${item.toLowerCase()}`}
        className={cn(
          "relative py-2 font-medium text-foreground/80 hover:text-foreground transition-colors duration-300",
          "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary",
          "after:transition-all after:duration-300 hover:after:w-full",
        )}
      >
        {item}
      </Link>
    ))}
  </div>
        <div
          className={`px-3 py-2 inset-0 z-3 rounded-[50px] cursor-pointer duration-300 ${
            menuOpen ? "bg-zinc-200 text-zinc-800" : "hover:bg-zinc-800 hover:text-zinc-200"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`ri-${menuOpen ? "close-line" : "menu-2-line"} text-2xl`}></i>
        </div>
      </div>

      {/* Full-Screen Menu */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-2 bg-gradient-to-br from-background to-background/95",
          "flex flex-col items-center justify-center",
          menuOpen ? "pointer-events-auto" : "pointer-events-none opacity-0",
        )}
        style={{
          clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        }}
      >
          <AnimatedMenu />
      </div>
    </>
  )
}










{/* <div ref={navbarRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
<div className="flex h-20 justify-between items-center px-4 md:px-20 relative container mx-auto">
  <div className="h-12 flex items-center">
    <div className="h-12 flex items-center">
      <img src={logoDark} alt="logo" className="h-14 cursor-pointer" />
    </div>
  </div>
  
  <div
    className="relativepx-2 py-1 px-2 rounded-[50px] hover:bg-zinc-800 hover:text-zinc-200 cursor-pointer duration-300 "
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label={menuOpen ? "Close menu" : "Open menu"}
  >
   <i className={`ri-${menuOpen ? "close-line" : "menu-2-line"} text-2xl`}></i>
  </div>
</div>
</div> */}











