import React from 'react';
import { IconDeviceDesktop, IconCpu, IconPalette, IconClipboardList, IconServer, IconBrain } from '@tabler/icons-react';

const About = () => {
  return (
    <section className="py-[100px] px-0 relative" id="about">
      <div className="container mx-auto px-[22px] max-w-[1200px] relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">
            About Smart Vision
          </h2>
          <span className="block w-[72px] h-1 mx-auto mt-[18px] rounded-full bg-linear-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-20 text-[#b6c4db] leading-[1.85] text-lg">
          <p>
            Smart Vision is a team of 26 Information Technology students passionate about innovation, automation, and intelligent systems. Our team brings together expertise in software development, embedded systems, hardware integration, project management, and digital media to create practical solutions for real-world challenges.
          </p>
          <p>
            Our flagship project, <span className="text-white font-semibold">Smart Warehouse Control</span>, is an intelligent warehouse automation system designed to improve storage management through robotics and smart technologies. The project integrates a robotic arm, embedded controllers, sensors, and wireless communication to automate warehouse operations, reduce human error, and enhance efficiency.
          </p>
          <p>
            The system provides real-time monitoring and control capabilities, allowing users to manage warehouse activities through a user-friendly interface. By combining hardware and software technologies, Smart Warehouse Control demonstrates how automation can transform traditional warehouse environments into smart, connected, and efficient systems.
          </p>
          <div className="bg-[#0c1226]/80 border border-[#00e5ff]/20 rounded-2xl p-6 mt-4">
            <p className="text-white m-0">
              At Smart Vision, we believe that teamwork, creativity, and continuous learning are the foundations of successful innovation. Through this project, we aim to contribute to the future of smart industrial solutions and warehouse automation.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl text-white font-bold">Our Departments</h3>
          <span className="block w-[50px] h-1 mx-auto mt-4 rounded-full bg-linear-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Front-End */}
          <div className="bg-[#0c1226]/90 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[#00e5ff] mb-4">
               <IconDeviceDesktop size={40} stroke={1.5} />
            </div>
            <h4 className="text-xl text-white font-bold mb-4">Front-End Development</h4>
            <p className="text-[#b6c4db] text-sm leading-[1.8]">
              Building the interactive dashboard and responsive user interface for seamless monitoring.
            </p>
          </div>

          {/* Back-End */}
          <div className="bg-[#0c1226]/90 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[#00e5ff] mb-4">
               <IconServer size={40} stroke={1.5} />
            </div>
            <h4 className="text-xl text-white font-bold mb-4">Back-End Development</h4>
            <p className="text-[#b6c4db] text-sm leading-[1.8]">
              Developing robust APIs, database management, and system architecture for data tracking.
            </p>
          </div>

          {/* AI & Model Training */}
          <div className="bg-[#0c1226]/90 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[#00e5ff] mb-4">
               <IconBrain size={40} stroke={1.5} />
            </div>
            <h4 className="text-xl text-white font-bold mb-4">AI & Model Training</h4>
            <p className="text-[#b6c4db] text-sm leading-[1.8]">
              Training YOLOv8 models for intelligent product detection and shelf monitoring.
            </p>
          </div>

          {/* Hardware */}
          <div className="bg-[#0c1226]/90 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[#00e5ff] mb-4">
               <IconCpu size={40} stroke={1.5} />
            </div>
            <h4 className="text-xl text-white font-bold mb-4">Hardware & Embedded</h4>
            <p className="text-[#b6c4db] text-sm leading-[1.8]">
              Integrating the robotic arm, ESP32, and servo motors for physical automation.
            </p>
          </div>

          {/* Media */}
          <div className="bg-[#0c1226]/90 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[#00e5ff] mb-4">
               <IconPalette size={40} stroke={1.5} />
            </div>
            <h4 className="text-xl text-white font-bold mb-4">Media & Design</h4>
            <p className="text-[#b6c4db] text-sm leading-[1.8]">
              Creating the project's visual identity, UI/UX designs, and technical documentation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
