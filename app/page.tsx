import React from "react";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Team from "../components/landing/Team";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-[#040712] text-[#e8f1ff] font-['Cairo',sans-serif] overflow-x-hidden selection:bg-[#00e5ff]/30 selection:text-white"
      dir="ltr"
    >
      <Header isIdeaPage={false} />
      <main>
        <Hero />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
