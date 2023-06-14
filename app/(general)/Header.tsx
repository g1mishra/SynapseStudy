"use client";

import { Logo } from "@/components/Icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const matches = useMediaQuery("(min-width: 768px)");

  const handleLinkClick = (e: any, id: string) => {
    e.preventDefault();

    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: matches ? "center" : "start",
      });
    }
  };

  return (
    <>
      <header className={cn("navbar bg-black-primary text-white fixed h-20 z-[60]")}>
        <nav className="container mx-auto px-4 py-2 flex items-center justify-between relative">
          <svg
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 block md:hidden"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>
          <Link href="/" className="text-xl font-bold flex justify-center items-center gap-5">
            <Logo /> SynapseStudy
          </Link>
          <div className="block sm:hidden" />
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link
                onClick={(e) => handleLinkClick(e, "#about")}
                href="#about"
                className="btn btn-ghost"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => handleLinkClick(e, "#features")}
                href="#features"
                className="btn btn-ghost"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => handleLinkClick(e, "#contact")}
                href="#contact"
                className="btn btn-ghost"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/g1mishra/SynapseStudy"
                className="btn btn-ghost"
                target="_blank"
              >
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  fill="#ffffff"
                >
                  <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
                </svg>
              </a>
            </li>
          </ul>
          {isMenuOpen && (
            <ul className="fixed bg-black-primary top-20 left-0 w-full py-4">
              <li>
                <Link
                  onClick={(e) => handleLinkClick(e, "#about")}
                  href="#about"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleLinkClick(e, "#features")}
                  href="#features"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  href="#contact"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/g1mishra/SynapseStudy"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
            </ul>
          )}
        </nav>
      </header>
      <div className="h-20" />
    </>
  );
};

export default Header;
