import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center pt-[100px] pb-10 relative overflow-hidden"
      id="hero"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#00e5ff]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-[22px] flex flex-col items-center justify-center relative z-10">
        <div className="max-w-[800px] text-center flex flex-col items-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-[10px] bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20 px-5 py-2.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase mb-8">
            Intelligence Reimagined
          </span>

          {/* Main Title with Logo */}
          <h1 className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[clamp(3.5rem,8vw,6rem)] leading-[1] tracking-[-0.04em] text-white font-bold mb-8">
            <img
              src="/logo-removebg.png"
              alt="Smart Vision Logo"
              className="w-[1.2em] h-[1.2em] object-contain drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]"
            />
            <span>
              Smart{" "}
              <span className="text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                Vision
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#b6c4db] text-lg md:text-xl leading-[1.8] max-w-[640px] mx-auto mb-12">
            Pioneering the future of intelligence. We bridge the gap between
            human perception and computational power to build smart, automated
            warehouse solutions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center bg-linear-to-r from-[#00e5ff] to-[#3fd1ff] text-[#040712] rounded-full px-8 py-4 no-underline font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,229,255,0.25)] w-full sm:w-auto"
            >
              Explore Portfolio
            </Link>
            <a
              href="#team"
              className="inline-flex items-center justify-center border-2 border-white/10 text-white rounded-full px-8 py-4 no-underline font-bold text-lg transition-all duration-300 hover:bg-white/5 hover:border-white/20 w-full sm:w-auto"
            >
              Meet The Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
