"use client";
import React, { useState } from "react";
import {
  IconDeviceDesktop,
  IconServer,
  IconBrain,
  IconCpu,
  IconPalette,
  IconChevronDown,
  IconBrandGithub,
  IconBrandLinkedin,
  IconLink,
} from "@tabler/icons-react";
import teamData from "../../data/team.json";

const Team = () => {
  const [activeDept, setActiveDept] = useState(null);

  const toggleDept = (index) => {
    if (activeDept === index) {
      setActiveDept(null);
    } else {
      setActiveDept(index);
    }
  };

  const departmentsInfo = [
    {
      id: "Front-End",
      name: "Front-End Development",
      icon: <IconDeviceDesktop size={28} stroke={1.5} />,
      role: "Responsible for building the user interface and web experience.",
    },
    {
      id: "Back-End",
      name: "Back-End Development",
      icon: <IconServer size={28} stroke={1.5} />,
      role: "Responsible for API development, database management, and system architecture.",
    },
    {
      id: "AI & Model Training",
      name: "AI & Model Training",
      icon: <IconBrain size={28} stroke={1.5} />,
      role: "Responsible for intelligent shelf monitoring, YOLOv8 model training, and computer vision.",
    },
    {
      id: "Hardware",
      name: "Hardware & Embedded Systems",
      icon: <IconCpu size={28} stroke={1.5} />,
      role: "Responsible for robotics, ESP32, servo motors, and hardware integration.",
    },
    {
      id: "Media",
      name: "Media & Design",
      icon: <IconPalette size={28} stroke={1.5} />,
      role: "Responsible for visual identity, UI/UX, and project documentation.",
    },
  ];

  return (
    <section className="py-[100px] px-0 bg-[#040712]" id="team">
      <div className="container mx-auto px-[22px] max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">
            Meet The Team
          </h2>
          <span className="block w-[72px] h-1 mx-auto mt-[18px] mb-[30px] rounded-full bg-linear-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
          <p className="max-w-[800px] mx-auto text-[#b6c4db] leading-[1.85] text-lg">
            Behind Smart Warehouse Control is a multidisciplinary team of 26
            Information Technology students working together to develop
            intelligent warehouse automation solutions.
          </p>
        </div>

        {/* Accordion / Cards Grid */}
        <div className="flex flex-col gap-6 mb-20">
          {departmentsInfo.map((dept, idx) => {
            const members = teamData.filter((m) => m.department === dept.id);

            return (
              <div
                key={idx}
                className="bg-[#0c1226]/90 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleDept(idx)}
                  className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-[#00e5ff]/10 flex items-center justify-center text-[#00e5ff] shrink-0">
                      {dept.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl md:text-2xl text-white font-bold mb-1">
                        {dept.name}
                      </h3>
                      <p className="text-[#8f9eb8] text-sm md:text-base hidden md:block">
                        {dept.role}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-[#00e5ff] transition-transform duration-300"
                    style={{
                      transform:
                        activeDept === idx ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    <IconChevronDown size={28} stroke={1.5} />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${activeDept === idx ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="p-6 md:p-8 border-t border-white/5 bg-[#080d1e]">
                    <p className="text-[#b6c4db] mb-8 block md:hidden text-center">
                      {dept.role}
                    </p>

                    {members.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members
                          .sort((a, b) => b.isLeader - a.isLeader)
                          .map((member) => (
                            <div
                              key={member.id}
                              className={`bg-[#0c1226] border rounded-xl overflow-hidden group hover:-translate-y-1 transition-all ${member.isLeader ? "border-[#00e5ff]/50 shadow-[0_10px_30px_rgba(0,229,255,0.1)]" : "border-white/10"}`}
                            >
                              <div className="relative aspect-square">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                                {member.isLeader && (
                                  <div className="absolute top-3 right-3 bg-linear-to-r from-[#00e5ff] to-[#0077ff] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    Leader
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                                <div className="absolute bottom-0 left-0 w-full p-5 translate-y-2 group-hover:translate-y-0 transition-transform">
                                  <h4 className="text-white font-bold text-lg">
                                    {member.name}
                                  </h4>
                                  <p className="text-[#00e5ff] text-sm font-medium mb-3">
                                    {member.role}
                                  </p>

                                  <div className="flex items-center gap-3">
                                    {member.links?.github && (
                                      <a
                                        href={member.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#00e5ff] hover:text-[#040712] transition-colors"
                                      >
                                        <IconBrandGithub size={16} stroke={2} />
                                      </a>
                                    )}
                                    {member.links?.linkedin && (
                                      <a
                                        href={member.links.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#00e5ff] hover:text-[#040712] transition-colors"
                                      >
                                        <IconBrandLinkedin
                                          size={16}
                                          stroke={2}
                                        />
                                      </a>
                                    )}
                                    {member.links?.portfolio && (
                                      <a
                                        href={member.links.portfolio}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#00e5ff] hover:text-[#040712] transition-colors"
                                      >
                                        <IconLink 
                                          size={16}
                                          stroke={2}
                                        />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-center text-[#8f9eb8] py-8">
                        Members will be added soon via team.json.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Statistics */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl text-white font-bold">Team Statistics</h3>
            <span className="block w-[40px] h-1 mx-auto mt-4 rounded-full bg-linear-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-[#0c1226]/80 border border-white/10 rounded-2xl p-6 text-center hover:border-[#00e5ff]/30 transition-colors">
              <div className="text-4xl text-[#00e5ff] font-bold mb-2">26</div>
              <div className="text-[#b6c4db] text-sm md:text-base">
                Team Members
              </div>
            </div>
            <div className="bg-[#0c1226]/80 border border-white/10 rounded-2xl p-6 text-center hover:border-[#00e5ff]/30 transition-colors">
              <div className="text-4xl text-[#00e5ff] font-bold mb-2">5</div>
              <div className="text-[#b6c4db] text-sm md:text-base">
                Departments
              </div>
            </div>
            <div className="bg-[#0c1226]/80 border border-white/10 rounded-2xl p-6 text-center hover:border-[#00e5ff]/30 transition-colors">
              <div className="text-4xl text-[#00e5ff] font-bold mb-2">3</div>
              <div className="text-[#b6c4db] text-sm md:text-base">
                Integrated Systems
              </div>
            </div>
            <div className="bg-[#0c1226]/80 border border-white/10 rounded-2xl p-6 text-center hover:border-[#00e5ff]/30 transition-colors">
              <div className="text-4xl text-[#00e5ff] font-bold mb-2">1</div>
              <div className="text-[#b6c4db] text-sm md:text-base text-balance">
                Smart Warehouse Solution
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
