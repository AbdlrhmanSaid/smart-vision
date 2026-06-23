import React from "react";
import { IconEye, IconBrandGithub, IconBrandLinkedin, IconBrandYoutube } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-[#02050c] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#00e5ff]/20 to-transparent"></div>
      
      <div className="container mx-auto px-[22px] max-w-[1200px] relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3 mb-6 group cursor-pointer">
            <img src="/logo-removebg.png" alt="Smart Vision Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all" />
            <span className="text-3xl font-bold text-white tracking-wide">
              Smart<span className="text-[#00e5ff]">Vision</span>
            </span>
          </div>
          
          {/* Tagline */}
          <p className="max-w-[600px] text-[#b6c4db] text-lg leading-[1.8] mb-8">
            Building Intelligent Warehouse Automation Through
            <span className="block mt-1 font-semibold text-white">
              Artificial Intelligence, Robotics, and Modern Web Technologies.
            </span>
          </p>

          {/* Optional Social/Nav links could go here if needed, but keeping it minimal as requested */}
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#b6c4db] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/10 transition-all">
              <IconBrandGithub size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#b6c4db] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/10 transition-all">
              <IconBrandLinkedin size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#b6c4db] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/10 transition-all">
              <IconBrandYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8f9eb8] text-sm">
            &copy; 2026 Smart Vision Team. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#8f9eb8]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
