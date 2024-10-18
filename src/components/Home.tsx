import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Welcome to Our Club</h1>
          <p className="hero-subtitle lead">
            Empowering the next generation of IT professionals
          </p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary btn-lg">About</Link>
          </div>
        </div>
        <div className="hero-image-placeholder"></div>
      </div>
    </div>
  );
}

export default Home;