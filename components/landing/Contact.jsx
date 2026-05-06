"use client";

import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-[100px] px-0">
      <div className="container mx-auto px-[22px] max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">
              Initiate <span className="text-[#00e5ff]">Contact</span>
            </h2>
          </div>
          <p className="text-[#97aed1] mb-12 leading-[1.8] text-lg">
            Ready to deploy Smart Vision in your ecosystem? Reach out to our
            technical team for a demonstration.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-[18px]">
              <span className="w-[52px] h-[52px] rounded-[18px] bg-[#00e5ff]/10 text-[#00e5ff] grid place-items-center text-[1.1rem] shrink-0 shadow-lg shadow-[#00e5ff]/10">
                <i className="fas fa-envelope"></i>
              </span>
              <div>
                <span className="text-[#70ccff] text-[0.78rem] tracking-[0.12em] uppercase mb-1.5 block font-bold">
                  Inquiries
                </span>
                <p className="text-[#c1d1e3] m-0">hello@smartvision.ai</p>
              </div>
            </div>
            <div className="flex items-start gap-[18px]">
              <span className="w-[52px] h-[52px] rounded-[18px] bg-[#00e5ff]/10 text-[#00e5ff] grid place-items-center text-[1.1rem] shrink-0 shadow-lg shadow-[#00e5ff]/10">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <div>
                <span className="text-[#70ccff] text-[0.78rem] tracking-[0.12em] uppercase mb-1.5 block font-bold">
                  Headquarters
                </span>
                <p className="text-[#c1d1e3] m-0">Silicon Valley, CA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#080e1e]/95 border border-white/10 rounded-[32px] p-10 shadow-2xl backdrop-blur-sm">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block mb-2.5 text-[#9db5d3] text-[0.85rem] font-bold">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-white/10 bg-[#0a1120]/95 text-white rounded-[18px] p-[18px_20px] text-[0.95rem] outline-none focus:border-[#00e5ff]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block mb-2.5 text-[#9db5d3] text-[0.85rem] font-bold">
                Professional Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full border border-white/10 bg-[#0a1120]/95 text-white rounded-[18px] p-[18px_20px] text-[0.95rem] outline-none focus:border-[#00e5ff]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block mb-2.5 text-[#9db5d3] text-[0.85rem] font-bold">
                Project Scope
              </label>
              <textarea
                placeholder="Tell us about your visual intelligence needs..."
                className="w-full border border-white/10 bg-[#0a1120]/95 text-white rounded-[18px] p-[18px_20px] text-[0.95rem] outline-none focus:border-[#00e5ff]/50 transition-colors min-h-[150px] resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-linear-to-r from-[#00e5ff] to-[#3fc9ff] border-none rounded-[24px] text-[#08101b] p-4 font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,229,255,0.14)] active:scale-95"
            >
              Send Signal
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
