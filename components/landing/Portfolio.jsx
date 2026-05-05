import React from "react";
import Image from "next/image";

const cases = [
  {
    title: "Computer Vision App",
    tag: "MOBILE AI",
    desc: "Real-time object recognition for logistics inventory management.",
    img: "/num1.jpg",
  },
  {
    title: "Smart City Hub",
    tag: "INFRASTRUCTURE",
    desc: "Autonomous traffic flow optimization and public safety network.",
    img: "/num2.jpg",
  },
  {
    title: "AI Health Assistant",
    tag: "HEALTHCARE",
    desc: "Deep-tissue scan analysis for early detection of complex pathologies.",
    img: "/num3.jpg",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-[100px] px-0">
      <div className="container mx-auto px-[22px] max-w-[1200px]">
        <div className="text-center mb-8">
          <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">Case Studies</h2>
        </div>
        <p className="text-[#97aed1] max-w-[700px] mx-auto mb-12 text-center leading-[1.8] text-lg">
          Witness how Smart Vision transforms massive data streams into
          actionable operational intelligence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <div key={index} className="bg-[#080e1e]/94 border border-white/10 rounded-[28px] overflow-hidden transition-all duration-350 hover:-translate-y-2 hover:border-[#00e5ff]/22 group">
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  width={400}
                  height={220}
                  src={item.img}
                  alt={item.title}
                  quality={70}
                  style={{ height: "auto" }}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="inline-flex m-[20px_20px_10px] p-[8px_14px] rounded-full bg-[#5e5cf6]/14 text-[#c5cfff] text-[0.76rem] tracking-[0.08em] font-bold">{item.tag}</span>
              <h3 className="m-[0_20px_12px] text-white text-[1.25rem] font-bold group-hover:text-[#00e5ff] transition-colors">{item.title}</h3>
              <p className="m-[0_20px_20px] text-[#a8bad5] leading-[1.75] text-sm">{item.desc}</p>
              <a href="#" className="inline-flex items-center m-[0_20px_24px] text-[#00e5ff] font-bold no-underline group-hover:gap-3 transition-all">
                Explore Case <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
