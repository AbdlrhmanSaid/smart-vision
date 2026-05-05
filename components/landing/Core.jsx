import React from 'react';
import { Brain, Camera, Cpu } from 'lucide-react';

const Core = () => {
  return (
    <section className="py-[100px] px-0 bg-[#0b101f]/50">
      <div className="container mx-auto px-[22px] max-w-[1200px]">
        <div className="text-center mb-8">
          <h2 className="text-[clamp(2.4rem,3vw,3rem)] text-white font-bold">The Core of Smart Vision</h2>
        </div>
        <p className="text-[#97aed1] max-w-[700px] mx-auto mb-12 text-center leading-[1.8] text-lg">
          Leveraging next-generation neural architectures to solve the world's
          most complex visual challenges.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0a101f]/94 border border-white/10 rounded-[28px] p-[34px_28px] transition-all duration-350 hover:-translate-y-2 hover:border-[#00e5ff]/22 group">
            <div className="w-[62px] h-[62px] rounded-[20px] grid place-items-center bg-[#00e5ff]/12 text-[#00e5ff] mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Brain size={32} />
            </div>
            <h3 className="text-white mb-3.5 text-[1.35rem] font-bold">Neural AI</h3>
            <p className="text-[#a8bad5] leading-[1.8]">
              Advanced deep learning models designed for real-time edge
              processing and high-fidelity pattern recognition.
            </p>
          </div>
          <div className="bg-[#0a101f]/94 border border-white/10 rounded-[28px] p-[34px_28px] transition-all duration-350 hover:-translate-y-2 hover:border-[#00e5ff]/22 group">
            <div className="w-[62px] h-[62px] rounded-[20px] grid place-items-center bg-[#00e5ff]/12 text-[#00e5ff] mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Camera size={32} />
            </div>
            <h3 className="text-white mb-3.5 text-[1.35rem] font-bold">Computer Vision</h3>
            <p className="text-[#a8bad5] leading-[1.8]">
              State-of-the-art optical recognition pipelines that enable
              machines to interpret and act on visual data with 99.9%
              accuracy.
            </p>
          </div>
          <div className="bg-[#0a101f]/94 border border-white/10 rounded-[28px] p-[34px_28px] transition-all duration-350 hover:-translate-y-2 hover:border-[#00e5ff]/22 group">
            <div className="w-[62px] h-[62px] rounded-[20px] grid place-items-center bg-[#00e5ff]/12 text-[#00e5ff] mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Cpu size={32} />
            </div>
            <h3 className="text-white mb-3.5 text-[1.35rem] font-bold">Smart Solutions</h3>
            <p className="text-[#a8bad5] leading-[1.8]">
              Tailored ecosystems that integrate vision AI into existing
              hardware for seamless digital transformation of industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Core;
