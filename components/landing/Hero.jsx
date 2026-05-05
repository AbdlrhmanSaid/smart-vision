import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="min-h-screen flex items-center pt-[120px] pb-10"
      id="hero"
    >
      <div className=" mx-auto px-[22px] flex flex-col md:flex-row items-center justify-center gap-[30px] ">
        <div className="max-w-[560px] text-center md:text-left">
          <span className="inline-flex items-center gap-[10px] bg-[#00e5ff]/14 text-[#00e5ff] border border-[#00e5ff]/25 p-[10px_18px] rounded-full text-[0.84rem] tracking-[0.12em]">
            INTELLIGENCE REIMAGINED
          </span>
          <h1 className="mt-6 text-[clamp(3rem,5vw,5.4rem)] leading-[0.95] tracking-[-0.05em] text-white font-bold">
            Smart <span className="text-[#00e5ff]">Vision</span>
          </h1>
          <p className="my-[26px] md:my-[38px] text-[#cbd5e5] text-[1.05rem] leading-[1.8] max-w-[520px] mx-auto md:mx-0">
            Pioneering the future of intelligence. We bridge the gap between
            human perception and computational power.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-[18px]">
            <a
              href="#about"
              className="inline-flex items-center justify-center bg-linear-to-br from-[#00e5ff] to-[#3fd1ff] text-[#08101b] rounded-full p-[14px_32px] no-underline font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,229,255,0.18)] w-full sm:w-auto"
            >
              Explore Our Vision
            </a>
            <a
              href="#team"
              className="inline-flex items-center justify-center border border-white/20 text-white rounded-full p-[14px_32px] no-underline font-bold transition-all duration-300 hover:bg-white/5 w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="w-full max-w-[520px] rounded-[32px] overflow-hidden relative shadow-[0_30px_80px_rgba(0,229,255,0.16)] border border-white/10 bg-linear-to-b from-[#080e24]/94 to-[#020612]/98 group before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.18),transparent_40%)]">
          <Image
            width={500}
            height={500}
            className="w-full h-full block rounded-[32px] transition-transform duration-500 group-hover:scale-105"
            src="/eye.png"
            alt="Technology Eye"
            priority
            quality={75}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
