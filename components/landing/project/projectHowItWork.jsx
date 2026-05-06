export default function IdeaHowItWork() {
  return (
    <>
      {/* Operational Flow */}
      <section
        className="bg-[#05070a] text-white py-24 px-[22px]"
        id="HowItWorks"
      >
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-center mb-4">
            Operational Flow
          </h2>
          <p className="text-[#9ca3af] text-center mb-16 max-w-[600px] mx-auto leading-relaxed">
            Witness the seamless transition from visual input to robotic
            execution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0b1019] rounded-2xl p-8 border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#22d3ee]/30 group relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#22d3ee]/5 rounded-full transition-transform group-hover:scale-150" />
              <span
                className="text-[3rem] font-bold block mb-4 opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: "#22d3ee" }}
              >
                01
              </span>
              <h3 className="text-xl font-bold mb-3">Scanning</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Advanced sensors scan barcodes and visual geometry.
              </p>
            </div>

            <div className="bg-[#0b1019] rounded-2xl p-8 border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#a855f7]/30 group relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#a855f7]/5 rounded-full transition-transform group-hover:scale-150" />
              <span
                className="text-[3rem] font-bold block mb-4 opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: "#a855f7" }}
              >
                02
              </span>
              <h3 className="text-xl font-bold mb-3">Detection & Mapping</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                AI engine locates items in 3D space.
              </p>
            </div>

            <div className="bg-[#0f172a]/80 rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 group relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full transition-transform group-hover:scale-150" />
              <span
                className="text-[3rem] font-bold block mb-4 opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: "#9ca3af" }}
              >
                03
              </span>
              <h3 className="text-xl font-bold mb-3">Structured Storage</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Data stored securely in cloud.
              </p>
            </div>

            <div className="bg-linear-to-br from-[#00e5ff] to-[#3fd1ff] rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden text-[#08101b]">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full transition-transform group-hover:scale-150" />
              <span className="text-[3rem] font-bold block mb-4 opacity-30 group-hover:opacity-60 transition-opacity">
                04
              </span>
              <h3 className="text-xl font-bold mb-3">Robotic Action</h3>
              <p className="opacity-80 text-sm leading-relaxed font-medium">
                Automated robotic arms execute actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="bg-[#0b0f19] text-white py-24 px-[22px]">
        <div className="container mx-auto max-w-[1200px] flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
              Core Capabilities.
            </h2>
            <p className="text-[#9ca3af] text-lg leading-relaxed mb-8">
              The engine powering the next generation of logistics.
            </p>
            <div className="w-20 h-1 bg-linear-to-r from-[#00e5ff] to-[#a855f7] rounded-full" />
          </div>

          <div className="flex-2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="bg-[#121826]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-[#4FD1C5]/30 transition-all group">
              <div className="bg-[#4FD1C5]/10 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L17 11H7L12 3Z" fill="#4FD1C5" />
                  <circle cx="17.5" cy="16.5" r="2.5" fill="#4FD1C5" />
                  <circle cx="6.5" cy="16.5" r="2.5" fill="#4FD1C5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Product Detection</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                AI models trained for high accuracy.
              </p>
            </div>

            <div className="bg-[#121826]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-[#F687B3]/30 transition-all group">
              <div className="bg-[#F687B3]/10 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="5"
                    width="8"
                    height="6"
                    rx="1"
                    fill="#F687B3"
                  />
                  <rect
                    x="13"
                    y="5"
                    width="8"
                    height="6"
                    rx="1"
                    fill="#F687B3"
                    fillOpacity="0.6"
                  />
                  <rect
                    x="3"
                    y="13"
                    width="8"
                    height="6"
                    rx="1"
                    fill="#F687B3"
                    fillOpacity="0.6"
                  />
                  <rect
                    x="13"
                    y="13"
                    width="8"
                    height="6"
                    rx="1"
                    fill="#F687B3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Shelf Segmentation</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Automated grid generation.
              </p>
            </div>

            <div className="bg-[#121826]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-[#F687B3]/30 transition-all group">
              <div className="bg-[#F687B3]/10 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 9H20M20 9L17 6M20 9L17 12"
                    stroke="#F687B3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 15H4M4 15L7 12M4 15L7 18"
                    stroke="#F687B3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Updates</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Sync across all platforms.
              </p>
            </div>

            <div className="bg-[#121826]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-[#db3113]/30 transition-all group">
              <div className="bg-[#db3113]/10 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="18"
                    width="16"
                    height="2"
                    rx="1"
                    fill="#db3113"
                  />
                  <path
                    d="M6 18L8 10L14 8L18 12"
                    stroke="#db3113"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="18" cy="12" r="2" fill="#db3113" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Arm Automation</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Integration with robotic arms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
