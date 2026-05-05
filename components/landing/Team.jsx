import React from "react";
import Image from "next/image";

const teamMembers = [
  { name: "Alex Chen", role: "Lead AI Scientist", img: "/num1.jpg" },
  { name: "Sarah Jenkins", role: "Senior Developer", img: "/num2.jpg" },
  { name: "Marcus Thorne", role: "UI/UX Designer", img: "/num3.jpg" },
  { name: "Elena Rodriguez", role: "Systems Architect", img: "/num1.jpg" },
];

const Team = () => {
  return (
    <section id="team" className="py-[100px] px-0">
      <div className="container mx-auto px-[22px] max-w-[1200px]">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">The Architects</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#080e1e]/95 border border-white/10 rounded-[28px] p-[34px_24px] text-center transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(0,229,255,0.12)] group"
            >
              <div className="w-[132px] h-[132px] mx-auto mb-5 rounded-full overflow-hidden border-2 border-[#00e5ff]/18 relative group-hover:border-[#00e5ff] transition-colors">
                <Image
                  width={132}
                  height={132}
                  src={member.img}
                  alt={member.name}
                  quality={70}
                  style={{ height: "auto" }}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="mb-2.5 text-white text-[1.25rem] font-bold">{member.name}</h3>
              <p className="text-[#6cd7ff] uppercase tracking-[0.08em] text-[0.88rem] m-0 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
