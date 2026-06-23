"use client";
import React from "react";
import { IconMail, IconMapPin, IconUsers, IconSend } from "@tabler/icons-react";

const Contact = () => {
  return (
    <section
      className="py-[100px] px-0 bg-[#040712] relative overflow-hidden"
      id="contact"
    >
      <div className="container mx-auto px-[22px] max-w-[1200px] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">
            Get In Touch
          </h2>
          <span className="block w-[72px] h-1 mx-auto mt-[18px] mb-[30px] rounded-full bg-linear-to-r from-[#00e5ff] to-[#5fd6ff]"></span>
          <p className="max-w-[800px] mx-auto text-[#b6c4db] leading-[1.85] text-lg">
            Interested in Smart Warehouse Control? We'd love to hear from you.
            Feel free to contact our team for project inquiries, collaborations,
            or technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl text-white font-bold mb-6">
              Contact Information
            </h3>

            <div className="bg-[#0c1226]/80 border border-white/10 rounded-2xl p-6 flex items-start gap-5 hover:border-[#00e5ff]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#00e5ff]/10 flex items-center justify-center shrink-0 text-[#00e5ff]">
                <IconMail size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email</h4>
                <a
                  href="mailto:smartvision.team@example.com"
                  className="text-[#b6c4db] hover:text-[#00e5ff] transition-colors"
                >
                  smartvision.team@example.com
                </a>
              </div>
            </div>

            <div className="bg-[#0c1226]/80 border border-white/10 rounded-2xl p-6 flex items-start gap-5 hover:border-[#00e5ff]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#00e5ff]/10 flex items-center justify-center shrink-0 text-[#00e5ff]">
                <IconMapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Location</h4>
                <p className="text-[#b6c4db]">
                  Borg El Arab Technological University, Egypt
                </p>
              </div>
            </div>

            <div className="bg-[#0c1226]/80 border border-white/10 rounded-2xl p-6 flex items-start gap-5 hover:border-[#00e5ff]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#00e5ff]/10 flex items-center justify-center shrink-0 text-[#00e5ff]">
                <IconUsers size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Team</h4>
                <p className="text-[#b6c4db]">Smart Vision Team</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#0c1226]/90 border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl">
            <h3 className="text-2xl text-white font-bold mb-8">
              Send a Message
            </h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#b6c4db] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#040712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/50 transition-all placeholder:text-white/20"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b6c4db] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-[#040712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/50 transition-all placeholder:text-white/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#b6c4db] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full bg-[#040712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/50 transition-all placeholder:text-white/20"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#b6c4db] mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-[#040712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/50 transition-all resize-none placeholder:text-white/20"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#00e5ff] text-[#040712] font-bold py-3 px-8 rounded-xl hover:bg-[#5fd6ff] transition-colors w-full sm:w-auto inline-flex justify-center items-center gap-2"
              >
                <span>Send Message</span>
                <IconSend size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Project Information */}
        <div className="bg-linear-to-r from-[#0c1226]/80 to-[#080c18]/80 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <h3 className="text-2xl text-white font-bold mb-8 text-center relative z-10">
            Project Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            <div className="text-center sm:text-left">
              <p className="text-[#8f9eb8] text-sm mb-1 uppercase tracking-wider font-semibold">
                Project Name
              </p>
              <p className="text-white font-bold text-lg">
                Smart Warehouse Control
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[#8f9eb8] text-sm mb-1 uppercase tracking-wider font-semibold">
                Developed By
              </p>
              <p className="text-white font-bold text-lg">Smart Vision Team</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[#8f9eb8] text-sm mb-1 uppercase tracking-wider font-semibold">
                Team Members
              </p>
              <p className="text-white font-bold text-lg">26 IT Students</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[#8f9eb8] text-sm mb-1 uppercase tracking-wider font-semibold">
                Technologies
              </p>
              <p className="text-[#00e5ff] font-medium text-sm md:text-base">
                AI &bull; Robotics &bull; Embedded Systems &bull; Full Stack
                Development
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
