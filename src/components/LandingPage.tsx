"use client";
import React from "react";
import "@/css/animate.css";
import "@/css/bootstrap.min.css";
import "@/css/font-awesome.min.css";
import "@/css/meanmenu.css";
import "@/css/one.css";
import "@/css/style.css";
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
      <Banner />
      <Callouts />
      <About />
      <Team />
      <Satisfied />
      <Testimonials />
      <Course />
      <Footer />
    </section>
  );
};

export default LandingPage;
