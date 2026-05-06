import React from "react";
import Image from "next/image";

const IdeaAbout = () => {
  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat py-20"
      style={{
        backgroundImage: "url('/WhatsApp Image 2026-04-13 at 5.32.42 PM.jpeg')",
      }}
      id="About"
    >
      <div className="absolute inset-0 bg-black/60 transition-opacity" />

      <div className="container mx-auto px-[22px] max-w-[1200px] relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Text */}
        <div>
          <span className="inline-block text-[#22d3ee] text-sm border border-[#22d3ee] px-3 py-1 rounded-full">
            AI-POWERED LOGISTICS
          </span>

          <h1 className="mt-6 text-[clamp(2.4rem,4vw,3.75rem)] font-bold text-white leading-[1.1]">
            Smart Warehouse <br />
            <span className="bg-linear-to-r from-[#22d3ee] to-[#a855f7] bg-clip-text text-transparent">
              Controller
            </span>
          </h1>

          <p className="mt-6 text-[#d1d5db] max-w-lg leading-relaxed text-lg">
            Revolutionizing inventory management with advanced Computer Vision
            and autonomous robotic coordination. Real-time precision at scale.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-[#22d3ee] text-black px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:bg-[#67e8f9]">
              Explore System
            </button>
            <button className="bg-[#1f2937] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:bg-[#374151]">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right: Status Card */}
        <div className="relative bg-[#111827]/70 backdrop-blur-md p-4 rounded-2xl shadow-2xl overflow-hidden group">
          <p className="text-[#9ca3af] text-sm mb-4">SYSTEM STATUS</p>
          <span className="absolute top-3 right-4 font-bold text-[#38bdf8] text-lg">
            OPTIMIZED
          </span>

          <div className="flex gap-4 mb-4">
            <div className="bg-black p-4 rounded-lg flex-1 text-center">
              <p className="text-[#9ca3af] text-sm m-0">Active Scanners</p>
              <h2 className="text-white text-2xl font-bold mt-1">124</h2>
            </div>
            <div className="bg-black p-4 rounded-lg flex-1 text-center">
              <p className="text-[#9ca3af] text-sm m-0">AI Confidence</p>
              <h2 className="text-white text-2xl font-bold mt-1">99.8%</h2>
            </div>
          </div>

          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image
              fill
              src="/WhatsApp Image 2026-04-13 at 5.32.41 PM.jpeg"
              alt="AI chip"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaAbout;
