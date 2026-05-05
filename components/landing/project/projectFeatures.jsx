import React from "react";
import Image from "next/image";
import { Joystick, Video } from "lucide-react";

const IdeaFeatures = () => {
  return (
    <section className="bg-[#0b0f19] text-white py-20 px-[22px]" id="Features">
      <div className="container mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="relative group">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
            <Image
              fill
              src="/WhatsApp Image 2026-04-17 at 7.05.29 PM.jpeg"
              alt="warehouse"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-4 max-w-[250px] bg-[#121826]/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/10">
            <h4 className="text-[#38bdf8] text-xs font-bold mb-2">TECHNICAL CORE</h4>
            <p className="text-[#d1d5db] text-sm leading-relaxed">
              Multi-spectral camera arrays feed real-time visual data into our
              neural framework.
            </p>
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight mb-8">
            Structured Intelligence <br />
            for <span className="text-[#a855f7]">Chaotic</span> Spaces.
          </h2>

          <div className="flex items-start gap-4 mb-6 group">
            <div
              className="p-3 rounded-lg text-xl shrink-0 transition-transform group-hover:scale-110 shadow-lg"
              style={{ background: "rgba(6,182,212,0.9)" }}
            >
              <Video />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1.5">Omni-Vision Cameras</h4>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                High-speed scanning capture every movement within the warehouse
                floor, detecting products with zero latency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6 group">
            <div
              className="p-3 rounded-lg text-xl shrink-0 transition-transform group-hover:scale-110 shadow-lg"
              style={{ background: "#f87171" }}
            >
              <Joystick />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1.5">Neural Stand Logic</h4>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                AI segments storage into granular Stand and Section logic,
                transforming physical space into a digital queryable database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaFeatures;
