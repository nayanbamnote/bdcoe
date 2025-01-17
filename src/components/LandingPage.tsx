/* Om connection with backend */
"use client";
import React from "react";
import Footer from "./LandingPageComponent/Footer";
import Banner from "./LandingPageComponent/Banner";
import Callouts from "./LandingPageComponent/Callouts";
import About from "./LandingPageComponent/About";
import Team from "./LandingPageComponent/Team";
import Satisfied from "./LandingPageComponent/Satisfied";
import Testimonials from "./LandingPageComponent/Testimonials";
import Course from "./LandingPageComponent/Course";



const LandingPage = () => {

  return (
    <section>
      <Banner /> {/* nayan */}
      <Callouts /> {/* nayan: callouts, om: callbox */}
      <About /> {/* nayan */}
      <Team /> {/* om */}
      <Satisfied /> {/* om */}
      <Testimonials /> {/* om */}
      <Course /> {/* nayan */}
      <Footer />
    </section>
  );
};

export default LandingPage;
