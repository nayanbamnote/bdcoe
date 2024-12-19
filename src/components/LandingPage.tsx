"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import MaxWidthWrapper from "./MaxWidthWrapper";
import "@/css/animate.css";
import "@/css/bootstrap.min.css";
import "@/css/font-awesome.min.css";
import "@/css/meanmenu.css";
import "@/css/one.css";
import "@/css/style.css";
import Header from "./LandingPageComponent/Header";
import Footer from "./LandingPageComponent/Footer";
import VisionMission from "./LandingPageComponent/VisionMission";
import { Clapperboard, Handshake, MonitorCog } from "lucide-react";

const stats = [
  { number: 10, label: "Teachers" },
  { number: 3, label: "Courses" },
  { number: 350, label: "Students" },
  { number: 361, label: "Recruited" },
];

const LandingPage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the animation triggers only once
    threshold: 1, // Start the animation when 50% of the component is visible
  });
  return (
    <section>
      {/* <!-- Pre Loader --> */}
      {/* <div id="dvLoading"></div> */}

      {/* <!-- Banner Wrapper Start --> */}

      <div className="banner-wrapper">
        <div
          className="carousel fade-carousel slide"
          data-ride="carousel"
          data-interval="4000"
          id="bs-carousel"
        >
          {/* <!-- Overlay --> */}
          <div className="overlay"></div>
          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner">
            <div className="item slides active">
              <div className="slide-1 max-h-[650px] ">
                <img
                  src="images/bdcoe_i.jpeg"
                  alt=""
                  className="object-cover object-top"
                />
              </div>
              <div className="hero">
                <h1 className="animated1 whitespace-nowrap">
                  Computer Department{" "}
                </h1>
                <h3 className="animated2">
                  Excellence, Innovation, and Success
                </h3>
              </div>
            </div>
          </div>
          <a
            className="left carousel-control"
            href="#bs-carousel"
            data-slide="prev"
          >
            <span className="transition3s glyphicon glyphicon-chevron-left fa fa-angle-left"></span>
          </a>{" "}
          <a
            className="right carousel-control"
            href="#bs-carousel"
            data-slide="next"
          >
            <span className="transition3s glyphicon glyphicon-chevron-right fa fa-angle-right"></span>
          </a>{" "}
        </div>
      </div>

      {/* <!-- Banner Wrapper End -->  */}

      {/* <!-- Callouts Wrapper Start --> */}

      <div className="callouts-wrapper">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>
                Welcome to <span>BDCOE Computer Department</span>
              </h2>
              <p>
                Empowering innovation, fostering brilliance, and shaping
                tomorrow's tech-driven future.
              </p>
            </div>

          < VisionMission />
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-book"></i>
                  </div>
                  <div className="box-header">
                    <h3>Awesome Courses</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      The Computer Department offers{" "}
                      <span className="text-blue-400">B.Tech, M.Tech,</span> and{" "}
                      <span className="text-blue-400">MBA</span> programs,
                      blending innovation, technical expertise, creative
                      problem-solving, and managerial skills for future leaders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-users " aria-hidden="true"></i>
                  </div>
                  <div className="box-header">
                    <h3>Qualified Teachers</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      The Computer Department boasts qualified teachers,
                      fostering innovation, technical expertise, and leadership
                      excellence in B.Tech, M.Tech, and MBA programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div
                    className="icon-box"
                    style={{ width: "30px", height: "30px", color: "#3eb2ce" }}
                  >
                    <MonitorCog style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div className="box-header">
                    <h3>Computer Labs </h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      The Computer Department is equipped with state-of-the-art,
                      cutting-edge labs that foster creativity, enhance
                      technical expertise, and cultivate leadership, innovation,
                      and problem-solving skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div
                    className="icon-box"
                    style={{ width: "30px", height: "30px", color: "#3eb2ce" }}
                  >
                    <Handshake style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div className="box-header">
                    <h3>Training & Placements</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      Our college offers dynamic training and placement programs
                      to enhance students' overall personality, interview
                      skills, professional growth, confidence, and career
                      prospects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div
                    className="icon-box"
                    style={{ width: "30px", height: "30px", color: "#3eb2ce" }}
                  >
                    <Clapperboard style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div className="box-header">
                    <h3>Events & Fest</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      Our college organizes vibrant events like ARAMBH, LAMHE,
                      COLOURS Dance, Wheelspeen, Hackathon, Robo Race, and
                      traditional festivals like Ganapati Pratishthan and
                      Shivjayanti.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-users" aria-hidden="true"></i>
                  </div>
                  <div className="box-header">
                    <h3>Personal Mentor </h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      The college provides personal mentors to guide students in
                      solving academic challenges and addressing personal issues
                      for overall growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Callouts Wrapper End -->  */}

      {/* <!-- About us wrapper start --> */}

      <div className="about-wrapper">
        <div className="about-wrapper-inner">
          <div className="container">
            <div className="aboutus-box">
              <div className="col-sm-4 aboutus-box-image">
                <img
                  src="images/default.png"
                  className="img-responsive max-h-[326px]"
                  alt=""
                />
              </div>
              <div className="col-sm-8 aboutus-box-body">
                <div className="aboutus-box-body-content">
                  <h3>About Us</h3>
                  <p>
                    Our college envisions fostering innovation, excellence, and
                    leadership. Its mission is to empower students through
                    quality education and technical skills, guided by core
                    values of integrity, collaboration, and lifelong learning.
                  </p>
                  <div className="special-text">
                    {" "}
                    <cite>- Dr. S.W. Mohod,</cite>
                    <small>HOD of Computer Engineering</small>{" "}
                  </div>
                </div>
                <div className="about-btn">
                  {" "}
                  <a href="#" className="btn">
                    Register
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: "url('/images/home-1.jpg')" }}
          className="about-bg bg-image"
        ></div>
      </div>

      {/* <!-- About us wrapper End -->  */}

      {/* <!-- Team Wrapper Start --> */}

      <div className="team-wrapper team">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>
                Expert <span>Faculty</span>
              </h2>
              <p>
                Our faculty combines expertise and passion to inspire young
                minds.
              </p>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="team-wrap">
                <div className="thumbnail thumbnail-model">
                  <figure className="thumbnail-image">
                    <img src="images/harshal.jpg" alt="" />{" "}
                  </figure>
                  <div className="thumbnail-inner">
                    <div className="link-group">
                      <i className="fa fa-phone"></i>
                      <a href="#" className="link-white">
                        +91 8623094369
                      </a>
                    </div>
                    <div className="link-group">
                      <i className="fa fa-envelope"></i>
                      <a href="#" className="link-white">
                        contactsvraut@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="thumbnail-caption">
                    <p className="text-header">
                      <a href="#">Prof S.V. Raut</a>
                    </p>
                    <div className="divider divider-md bg-teak"></div>
                    <p className="text-caption">Java Faculty</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="team-wrap">
                <div className="thumbnail thumbnail-model">
                  <figure className="thumbnail-image">
                    <img src="images/harshal.jpg" alt="" />{" "}
                  </figure>
                  <div className="thumbnail-inner">
                    <div className="link-group">
                      <i className="fa fa-phone"></i>
                      <a href="#" className="link-white">
                        +91 8087736725
                      </a>
                    </div>
                    <div className="link-group">
                      <i className="fa fa-envelope"></i>
                      <a href="#" className="link-white">
                        contactroshanc@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="thumbnail-caption">
                    <p className="text-header">
                      <a href="#">Prof R. Chaudhari</a>
                    </p>
                    <div className="divider divider-md bg-teak"></div>
                    <p className="text-caption">AI/ML Expert</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 space">
              <div className="team-wrap">
                <div className="thumbnail thumbnail-model">
                  <figure className="thumbnail-image">
                    <img src="images/harshal.jpg" alt="" />{" "}
                  </figure>
                  <div className="thumbnail-inner">
                    <div className="link-group">
                      <i className="fa fa-phone"></i>
                      <a href="#" className="link-white">
                        +91 9503141798
                      </a>
                    </div>
                    <div className="link-group">
                      <i className="fa fa-envelope"></i>
                      <a href="#" className="link-white">
                        contactrmpatil@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="thumbnail-caption">
                    <p className="text-header">
                      <a href="#">Prof R. M. Patil</a>
                    </p>
                    <div className="divider divider-md bg-teak"></div>
                    <p className="text-caption">Computer Graphics</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="team-wrap">
                <div className="thumbnail thumbnail-model">
                  <figure className="thumbnail-image">
                    <img src="images/harshal.jpg" alt="" />{" "}
                  </figure>
                  <div className="thumbnail-inner">
                    <div className="link-group">
                      <i className="fa fa-phone"></i>
                      <a href="#" className="link-white">
                        +91 7517697478
                      </a>
                    </div>
                    <div className="link-group">
                      <i className="fa fa-envelope"></i>
                      <a href="#" className="link-white">
                        contactsveer@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="thumbnail-caption">
                    <p className="text-header">
                      <a href="#">Prof S. Veer</a>
                    </p>
                    <div className="divider divider-md bg-teak"></div>
                    <p className="text-caption"> Computer Networking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Team Wrapper End -->  */}

      {/* <!-- Satisfied Wrapper start --> */}

      <div
        ref={ref}
        className="satisfied-wrapper bg-gray-50 py-12 flex justify-center items-center"
      >
        <div className="container mx-auto flex flex-wrap justify-evenly gap-14 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="counter flex flex-col justify-center items-center text-center w-40"
            >
              <div className="number text-4xl font-bold text-primary">
                {inView ? (
                  <CountUp start={0} end={stat.number} duration={2.5} />
                ) : (
                  0
                )}
              </div>
              <p className="text-lg font-medium text-gray-600 !mt-[16px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* <!-- Satisfied Wrapper end  --> */}

      {/* <!-- Testimonials Wrapper Start --> */}

      <div className="testimonials-wrapper">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>
                CDOS <span className="!text-[#3eb2ce]">Testimonials</span>
              </h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
            </div>
            <div
              id="myCarousel1"
              className="carousel slide"
              data-ride="carousel"
            >
              {/* <!-- Testimonials Indicators --> */}

      

              {/* <!-- Testimonials slides --> */}

              <div className="carousel-inner" role="listbox">
                <div className="item active">
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/harshal.jpg" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Abhishekh Chaware </h3>
                      <h4>CDOS President</h4>
                    </blockquote>
                  </div>
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/harshal.jpg" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Ridhhi Watkar</h3>
                      <h4>CDOS Vice-President</h4>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimon.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials1.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials2.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials3.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Testimonials Wrapper End -->  */}

      {/* <!-- Courses styles Start--> */}

      <div className="course-wrapper">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>
                Popular <span>Courses</span>
              </h2>
              <p>
                Empowering futures with cutting-edge B.Tech, M.Tech, and MBA
                programs.
              </p>
            </div>
          </div>
          <div className="row offset-top-40">
            <div className="col-sm-6 col-md-4">
              <div className="single-item">
                <div className="single-item-image overlay-effect">
                  {" "}
                  <a href="#">
                    <img src="images/courses-img1.jpg" alt="" />
                  </a>{" "}
                </div>
                <div className="single-item-text">
                  <h4>
                    <a href="#">B.Tech</a>
                  </h4>
                  <div className="single-item-text-info"> </div>
                  <p>
                    B.Tech course provides in-depth knowledge in engineering,
                    combining theory and practical skills to prepare students
                    for the tech industry.
                  </p>
                  <div className="single-item-content">
                    <div className="single-item-comment-view"> </div>
                    <div className="single-item-rating"> </div>
                  </div>
                </div>
                <div className="button-bottom">
                  {" "}
                  <a href="#" className="btn button-default">
                    Learn Now
                  </a>{" "}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="single-item">
                <div className="single-item-image overlay-effect">
                  {" "}
                  <a href="#">
                    <img src="images/courses-img2.jpg" alt="" />
                  </a>{" "}
                </div>
                <div className="single-item-text">
                  <h4>
                    <a href="#">M.Tech</a>
                  </h4>
                  <div className="single-item-text-info"> </div>
                  <p>
                    MTech course offers advanced knowledge in engineering,
                    focusing on research, innovation, and specialized skills to
                    excel in technology fields.
                  </p>
                  <div className="single-item-content">
                    <div className="single-item-comment-view"> </div>
                  </div>
                </div>
                <div className="button-bottom">
                  {" "}
                  <a href="#" className="btn button-default">
                    Learn Now
                  </a>{" "}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="single-item">
                <div className="single-item-image overlay-effect">
                  {" "}
                  <a href="#">
                    <img src="images/courses-img3.jpg" alt="" />
                  </a>{" "}
                </div>
                <div className="single-item-text">
                  <h4>
                    <a href="#">MBA</a>
                  </h4>
                  <div className="single-item-text-info"> </div>
                  <p>
                    MBA course provides comprehensive management education,
                    focusing on leadership, strategy, and business skills to
                    excel in the corporate world
                  </p>
                  <div className="single-item-content">
                    <div className="single-item-comment-view"> </div>
                  </div>
                </div>
                <div className="button-bottom">
                  {" "}
                  <a href="#" className="btn button-default">
                    Learn Now
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Courses styles End-->  */}

      {/* <!-- Footer styles Start--> */}
      <Footer />
    </section>
  );
};

export default LandingPage;
