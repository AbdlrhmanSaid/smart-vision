import {
  IconRobot,
  IconEye,
  IconWorld,
  IconChartLine,
  IconCpu,
  IconBrain,
  IconCode,
  IconBraces,
  IconStack2,
  IconServer,
  IconDatabase,
  IconKey,
  IconSettings,
  IconBuildingWarehouse,
  IconScanEye,
  IconWifi,
  IconDeviceLaptop,
  IconChartPie,
  IconCheck,
} from "@tabler/icons-react";
import Link from "next/link";

const Portfolio = () => {
  const projects = [
    {
      title: "Robotic Arm Control System",
      category: "Hardware & Embedded Systems",
      description:
        "A smart robotic arm powered by ESP32 and PCA9685 controller, designed to handle products inside the warehouse with precision and reliability.",
      features: [
        "7 MG995 Servo Motors",
        "Wireless Control",
        "Precision Movement",
        "Power Management System",
      ],
      icon: <IconRobot size={20} />,
      placeholderImg: "/arm1.png",
    },
    {
      title: "AI Shelf Monitoring System",
      category: "Artificial Intelligence",
      description:
        "An intelligent computer vision system using YOLOv8 to detect products, monitor shelf status, and generate real-time warehouse reports.",
      features: [
        "Product Detection",
        "Real-Time Monitoring",
        "Smart Reporting",
        "Multithreading Processing",
      ],
      icon: <IconEye size={20} />,
      placeholderImg: "/ai.png",
    },
    {
      title: "Smart Vision Web Platform",
      category: "Full Stack Development",
      description:
        "A complete web platform for warehouse management, analytics, and monitoring with a secure and scalable architecture.",
      features: [
        "Interactive Dashboard",
        "Inventory Tracking",
        "Activity Logs",
        "Secure Authentication",
      ],
      techs: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB"],
      icon: <IconWorld size={20} />,
      placeholderImg: "/web1.jpg",
    },
    {
      title: "System Dashboard",
      category: "Management & Analytics",
      description:
        "A centralized dashboard to control and monitor all warehouse activities in real-time.",
      features: [
        "Real-Time Statistics",
        "Warehouse Monitoring",
        "User Management",
        "Activity Tracking",
      ],
      icon: <IconChartLine size={20} />,
      placeholderImg: "/web2.jpg",
    },
  ];

  const technologies = [
    { name: "ESP32", icon: <IconCpu size={32} stroke={1.5} /> },
    { name: "YOLOv8", icon: <IconBrain size={32} stroke={1.5} /> },
    { name: "C++", icon: <IconCode size={32} stroke={1.5} /> },
    { name: "React", icon: <IconBraces size={32} stroke={1.5} /> },
    { name: "Next.js", icon: <IconStack2 size={32} stroke={1.5} /> },
    { name: "Node.js", icon: <IconServer size={32} stroke={1.5} /> },
    { name: "Express.js", icon: <IconServer size={32} stroke={1.5} /> },
    { name: "MongoDB", icon: <IconDatabase size={32} stroke={1.5} /> },
    { name: "JWT", icon: <IconKey size={32} stroke={1.5} /> },
    { name: "PCA9685", icon: <IconSettings size={32} stroke={1.5} /> },
  ];

  const achievements = [
    {
      name: "Smart Warehouse Automation",
      icon: <IconBuildingWarehouse size={24} stroke={1.5} />,
    },
    {
      name: "Robotic Arm Integration",
      icon: <IconRobot size={24} stroke={1.5} />,
    },
    {
      name: "AI-Powered Shelf Detection",
      icon: <IconScanEye size={24} stroke={1.5} />,
    },
    {
      name: "Wireless Communication",
      icon: <IconWifi size={24} stroke={1.5} />,
    },
    {
      name: "Full-Stack Web Platform",
      icon: <IconDeviceLaptop size={24} stroke={1.5} />,
    },
    {
      name: "Real-Time Monitoring",
      icon: <IconChartPie size={24} stroke={1.5} />,
    },
  ];

  return (
    <section
      className="py-[100px] px-0 bg-[#040712] relative overflow-hidden"
      id="portfolio"
    >
      <div className="container mx-auto px-[22px] max-w-[1200px] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">
            Portfolio & Our Work
          </h2>{" "}
          <div className=" text-white font-bold mt-6">
            <Link
              href="/dashboard"
              className=" bg-linear-to-r from-[#00e5ff] to-[#3fd1ff] text-[#08101b] rounded-full py-2.5 px-6 font-bold transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#00e5ff]/20 active:translate-y-0"
            >
              Show Dashboard
            </Link>
          </div>{" "}
          <span className="block w-[72px] h-1 mx-auto mt-[18px] mb-[30px] rounded-full bg-linear-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
          <p className="max-w-[800px] mx-auto text-[#b6c4db] leading-[1.85] text-lg">
            Explore the key components that make Smart Warehouse Control a
            complete intelligent warehouse automation solution.
          </p>
        </div>

        {/* Projects Listing */}
        <div className="flex flex-col gap-16 mb-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-10 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="w-full lg:w-1/2">
                <div className="rounded-2xl overflow-hidden border border-white/10 group relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <img
                    src={project.placeholderImg}
                    alt={project.title}
                    className="w-full h-auto aspect-16/10 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-sm font-semibold mb-4 border border-[#00e5ff]/20 gap-2">
                    {project.icon} {project.category}
                  </div>
                  <h3 className="text-3xl text-white font-bold mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[#b6c4db] leading-[1.8]">
                    {project.description}
                  </p>
                </div>

                <div className="bg-[#0c1226]/50 rounded-xl p-5 border border-white/5">
                  <h4 className="text-white font-semibold mb-3">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#8f9eb8] text-sm">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <IconCheck size={16} className="text-[#00e5ff]" />{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.techs && (
                  <div>
                    <h4 className="text-white font-semibold mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techs.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[#b6c4db] text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Used Grid */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <h3 className="text-3xl text-white font-bold">Technologies Used</h3>
            <span className="block w-[50px] h-1 mx-auto mt-4 rounded-full bg-linear-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="bg-[#0c1226]/80 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-[#00e5ff]/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-[#8f9eb8] group-hover:text-[#00e5ff] transition-colors">
                  {tech.icon}
                </div>
                <span className="text-white font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Achievements */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-3xl text-white font-bold">
              Project Achievements
            </h3>
            <span className="block w-[50px] h-1 mx-auto mt-4 rounded-full bg-linear-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-[#0c1226] to-[#0a0f1d] border border-white/10 rounded-2xl p-6 flex items-center gap-5 shadow-lg hover:shadow-[0_10px_30px_rgba(0,229,255,0.08)] transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-[#00e5ff]/10 flex items-center justify-center shrink-0 border border-[#00e5ff]/20 text-[#00e5ff]">
                  {ach.icon}
                </div>
                <h4 className="text-white font-bold text-lg">{ach.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
