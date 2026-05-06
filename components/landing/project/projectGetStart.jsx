import React from "react";

const IdeaGetStart = () => {
  return (
    <section className="bg-[#05070a] py-24 px-[22px]" id="GetStarted">
      <div className="container mx-auto max-w-[1100px] bg-[#0b1019] rounded-[40px] p-8 md:p-16 border border-white/5 shadow-[0_0_50px_rgba(0,229,255,0.05)] relative overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#00e5ff] to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          {/* Left: Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-none mb-6">
              Initialize <br />
              <span className="bg-linear-to-r from-[#00e5ff] to-[#a855f7] bg-clip-text text-transparent">
                Partnership.
              </span>
            </h2>
            <p className="text-[#9ca3af] text-lg mb-10 max-w-[400px] leading-relaxed">
              Ready to transform your warehouse operations? Let's connect and
              build the future together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-2xl bg-[#22d3ee]/10 flex items-center justify-center transition-transform group-hover/item:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="text-white font-medium hover:text-[#22d3ee] transition-colors cursor-pointer text-lg">
                  ops@smartvision.ai
                </span>
              </div>

              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-2xl bg-[#a855f7]/10 flex items-center justify-center transition-transform group-hover/item:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="text-white font-medium hover:text-[#a855f7] transition-colors cursor-pointer text-lg">
                  Silicon Valley Hub, CA
                </span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[#0f172a]/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm shadow-inner">
            <div className="space-y-6">
              <div>
                <label className="block text-[#94a3b8] text-xs font-bold uppercase tracking-widest mb-2.5 ml-1">
                  Project Identity
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#05070a]/50 border border-white/10 text-white rounded-2xl p-4 outline-none focus:border-[#00e5ff]/50 transition-all placeholder:text-[#475569]"
                />
              </div>

              <div>
                <label className="block text-[#94a3b8] text-xs font-bold uppercase tracking-widest mb-2.5 ml-1">
                  Communication Channel
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-[#05070a]/50 border border-white/10 text-white rounded-2xl p-4 outline-none focus:border-[#00e5ff]/50 transition-all placeholder:text-[#475569]"
                />
              </div>

              <div>
                <label className="block text-[#94a3b8] text-xs font-bold uppercase tracking-widest mb-2.5 ml-1">
                  Project Directive
                </label>
                <textarea
                  rows="4"
                  placeholder="How can we assist your logistics?"
                  className="w-full bg-[#05070a]/50 border border-white/10 text-white rounded-2xl p-4 outline-none focus:border-[#00e5ff]/50 transition-all placeholder:text-[#475569] resize-none"
                />
              </div>

              <button className="w-full bg-linear-to-r from-[#00e5ff] to-[#3fd1ff] hover:from-[#3fd1ff] hover:to-[#00e5ff] text-[#08101b] rounded-2xl py-5 font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#00e5ff]/20">
                Send Transmission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaGetStart;
