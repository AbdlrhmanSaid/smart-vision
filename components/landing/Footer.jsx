import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#060a18] text-[#9fb6d1] py-[60px] border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-[22px] max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <a
            href="#hero"
            className="text-white font-['Poiret_One'] text-[1.55rem] tracking-wide no-underline hover:scale-105 transition-transform"
          >
            Smart <span className="text-[#00e5ff]">Vision</span>
          </a>
          <p className="max-w-md leading-relaxed mx-auto md:mx-0 text-sm">
            Leading the next generation of computer vision and artificial
            intelligence solutions. We transform complex data into actionable
            insights.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            {["facebook", "twitter", "linkedin", "github", "instagram"].map(
              (social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[#00e5ff] text-xl transition-all hover:scale-125 hover:rotate-6"
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ),
            )}
          </div>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="list-none p-0 flex flex-col gap-3">
            {["Home", "Our Team", "Portfolio", "Contact Us"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "")}`}
                  className="no-underline text-[#9fb6d1] hover:text-white hover:pl-2 transition-all"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-white font-bold mb-6 text-lg">Get In Touch</h4>
          <div className="flex flex-col gap-4 items-center md:items-start">
            <p className="flex items-center gap-3">
              <i className="fas fa-envelope text-[#00e5ff]"></i>{" "}
              smart@aivision.com
            </p>
            <p className="flex items-center gap-3">
              <i className="fas fa-map-marker-alt text-[#00e5ff]"></i> Alex,
              Egypt
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-8 border-t border-white/5 text-center text-[#71839e] text-sm px-4">
        <p>
          &copy; 2026 Smart Vision. Celestial Observer AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
