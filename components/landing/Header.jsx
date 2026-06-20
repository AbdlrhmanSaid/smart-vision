"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = ({ isIdeaPage }) => {
  const [scrolled, setScrolled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-1000 w-full transition-all duration-300 ease-in-out ${scrolled ? "bg-[#060a18]/96 py-3.5 shadow-2xl backdrop-blur-md border-b border-white/5" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-[22px] max-w-[1200px]">
        <a
          href={isIdeaPage ? "/#hero" : "/#hero"}
          className="text-[1.55rem] font-['Poiret_One'] tracking-wide text-white no-underline whitespace-nowrap transition-transform hover:scale-105"
          onClick={handleLinkClick}
        >
          Smart{" "}
          <span className="text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
            Vision
          </span>
        </a>
        <nav
          className={`fixed inset-x-0 top-[70px] md:top-0 w-full bg-[#060a18]/98 md:bg-transparent transition-all duration-300 border-b border-white/10 md:border-none md:static md:w-auto md:opacity-100 md:visible ${mobileMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible md:translate-y-0"}`}
        >
          <ul className="flex flex-col md:flex-row gap-6 md:gap-8 p-8 md:p-0 list-none items-center">
            {[
              "About",
              "Team",
              isIdeaPage ? "Features" : "Portfolio",
              "Contact",
            ].map((item) => (
              <li key={item}>
                <a
                  href={
                    isIdeaPage ? `/project#${item}` : `/#${item.toLowerCase()}`
                  }
                  className="relative text-white/70 font-semibold tracking-wide no-underline hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#00e5ff] after:transition-all hover:after:w-full"
                  onClick={handleLinkClick}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="flex flex-col gap-4 mt-4 md:hidden w-full">
              <Link
                href="/dashboard"
                className="w-full text-center bg-linear-to-r from-[#00e5ff] to-[#3fd1ff] text-[#08101b] rounded-full py-3 px-6 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#00e5ff]/20"
                onClick={handleLinkClick}
              >
                Get Started
              </Link>
              <button
                className="w-full text-center bg-linear-to-r from-[#6d28d9] to-[#a855f7] text-white rounded-full py-3 px-6 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#6d28d9]/20"
                onClick={() => {
                  handleLinkClick();
                  router.push(isIdeaPage ? "/" : "/project");
                }}
              >
                {isIdeaPage ? "Main Site" : "Project Site"}
              </button>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="bg-linear-to-r from-[#00e5ff] to-[#3fd1ff] text-[#08101b] rounded-full py-2.5 px-6 font-bold transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#00e5ff]/20 active:translate-y-0"
            >
              Get Started
            </Link>
            <button
              className="bg-linear-to-r from-[#6d28d9] to-[#a855f7] text-white rounded-full py-2.5 px-6 font-bold transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#6d28d9]/20 active:translate-y-0"
              onClick={() => router.push(isIdeaPage ? "/" : "/project")}
            >
              {isIdeaPage ? "Main Site" : "Project Site"}
            </button>
          </div>
          <button
            className="flex md:hidden flex-col justify-between w-7 h-5 bg-transparent border-none cursor-pointer z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[3px] w-full rounded-full bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-[8.5px]" : ""}`}
            ></span>
            <span
              className={`block h-[3px] w-full rounded-full bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block h-[3px] w-full rounded-full bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-[8.5px]" : ""}`}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
