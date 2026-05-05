import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import IdeaAbout from "./projectAbout";
import IdeaFeatures from "./projectFeatures";
import IdeaHowItWork from "./projectHowItWork";
import IdeaTeam from "./projectTeam";
import IdeaDashboard from "./projectDashboard";
import IdeaGetStart from "./projectGetStart";
import "./project.css";

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
