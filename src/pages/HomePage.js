import React from "react";
import FeaturedCarousel from "./home/FeaturedCarousel";
import ContactSection from "./home/ContactSection";

import "./HomePage.css";

const HomePage = () => (
  <>
    <div className="container">
      <FeaturedCarousel />
      <div className="row home-content home-statement">
        A visual exhibit of selected items from the International Archive of
        Women in Architecture, a joint partnership between the College of
        Architecture and Urban Studies and the University Libraries at Virginia
        Tech
      </div>
      <ContactSection />
    </div>
  </>
);

export default HomePage;
