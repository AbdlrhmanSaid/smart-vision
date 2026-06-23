import React from "react";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import Portfolio from "../../components/landing/Portfolio";

export default function IdeaPage() {
  return (
    <div className="min-h-screen bg-[#040712] text-[#e8f1ff] font-['Cairo',sans-serif] overflow-x-hidden" dir="ltr">
      <Header isIdeaPage={true} />
      <main className="pt-16">
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
