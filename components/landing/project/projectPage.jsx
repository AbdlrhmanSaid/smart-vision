import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import IdeaAbout from "./portfolioAbout";
import IdeaFeatures from "./portfolioFeatures";
import IdeaHowItWork from "./portfolioHowItWork";
import IdeaTeam from "./portfolioTeam";
import IdeaDashboard from "./portfolioDashboard";
import IdeaGetStart from "./portfolioGetStart";
import "./portfolio.css";

const IdeaPage = () => {
  return (
    <div>
      <Header isIdeaPage={true} />
      <main style={{ paddingTop: "64px" }}>
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
};

export default IdeaPage;
