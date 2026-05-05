import React from "react";

const About = () => {
  return (
    <section className="py-[100px] px-0" id="about">
      <div className="container mx-auto px-[22px] max-w-[1200px]">
        <div className="text-center mb-8">
          <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">Our Mission & Vision</h2>
          <span className="block w-[72px] h-1 mx-auto mt-[18px] rounded-full bg-gradient-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0c1226]/90 border border-white/10 rounded-[28px] p-[36px_30px] text-left transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,229,255,0.14)] group">
            <div className="text-[2.3rem] text-[#00e5ff] mb-[18px] group-hover:scale-110 transition-transform inline-block">
              <i className="fas fa-rocket"></i>
            </div>
            <h3 className="text-white mb-3.5 text-2xl font-bold">Our Mission</h3>
            <p className="text-[#b6c4db] leading-[1.85]">
              To provide innovative artificial intelligence solutions that
              contribute to industry development and make people's lives easier
              through computer vision technologies.
            </p>
          </div>
          <div className="bg-[#0c1226]/90 border border-white/10 rounded-[28px] p-[36px_30px] text-left transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,229,255,0.14)] group">
            <div className="text-[2.3rem] text-[#00e5ff] mb-[18px] group-hover:scale-110 transition-transform inline-block">
              <i className="fas fa-eye"></i>
            </div>
            <h3 className="text-white mb-3.5 text-2xl font-bold">Our Vision</h3>
            <p className="text-[#b6c4db] leading-[1.85]">
              To become a leading team in transforming complex ideas into
              tangible reality using the most advanced AI technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
