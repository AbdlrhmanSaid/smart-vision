import React from "react";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import IdeaAbout from "../../components/landing/project/projectAbout";
import IdeaFeatures from "../../components/landing/project/projectFeatures";
import IdeaHowItWork from "../../components/landing/project/projectHowItWork";
import IdeaTeam from "../../components/landing/project/projectTeam";
import IdeaDashboard from "../../components/landing/project/projectDashboard";
import IdeaGetStart from "../../components/landing/project/projectGetStart";

export default function IdeaPage() {
  return (
    <div className="min-h-screen bg-[#040712] text-[#e8f1ff] font-['Cairo',sans-serif] overflow-x-hidden" dir="ltr">
      <Header isIdeaPage={true} />
      <main className="pt-16">
        <IdeaAbout />
        <IdeaFeatures />
        <IdeaHowItWork />
        <IdeaDashboard />
        <IdeaTeam />
        <IdeaGetStart />
      </main>
      <Footer />
    </div>
  );
}
