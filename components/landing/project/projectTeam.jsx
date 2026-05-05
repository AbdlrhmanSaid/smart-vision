import React from "react";
import Image from "next/image";

const teamData = [
  {
    name: "Alex Thorne",
    role: "Lead AI Architect",
    desc: "Specialist in convolutional neural networks and spatial mapping.",
    img: "/item1.jpeg",
  },
  {
    name: "Sarah Chen",
    role: "Robotics Lead",
    desc: "Former aerospace engineer focusing on kinetic automation systems.",
    img: "/item2.jpeg",
  },
  {
    name: "Marcus Vane",
    role: "Systems Designer",
    desc: "Focused on human-AI interface design and data visualization systems.",
    img: "/item3.jpeg",
  },
];

export default function IdeaTeam() {
  return (
    <section className="bg-[#05070d] text-white py-20 px-[22px]" id="Team">
      <div className="container mx-auto max-w-[1200px]">
        <div>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold mb-3">
            Smart Vision <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Engineers.</span>
          </h2>
          <p className="text-[#9ca3af] mt-3 mb-12 leading-relaxed">
            The minds behind the neural framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <div key={index} className="bg-[#0b0f19] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-105 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full relative overflow-hidden shrink-0 border-2 border-[#a855f7]/30 group-hover:border-[#a855f7] transition-colors">
                  <Image
                    fill
                    src={member.img}
                    alt={member.name}
                    quality={70}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[1.1rem] text-white mb-1 group-hover:text-[#a855f7] transition-colors">{member.name}</h3>
                  <p className="text-[#a855f7] text-sm font-medium">{member.role}</p>
                </div>
              </div>
              <p className="text-[#9ca3af] text-sm leading-relaxed m-0">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
