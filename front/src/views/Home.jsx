import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="white-rectangle">
        <p className="text">HOUSE</p>
        <p className="text2">OF DEV.</p>
        <p className="text3">Tu nueva vivienda está aqui.</p>
      </div>
      <div className="image-container">
        <img
          src="https://planner5d.com/blog/content/images/size/w2000/2023/05/dise-os-y-planos-de-casas-de-dos-pisos.jpg"
          alt="Imagen"
          className="background-image"
        />
      </div>
    </div>
  );
};

export default Home;
